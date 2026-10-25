const rawBase =
  import.meta.env.VITE_API_BASE ||
  import.meta.env.VITE_BASE_URL_API ||
  import.meta.env.VITE_API_URL ||
  "https://backend-hbkg.onrender.com/api";
const API_BASE = rawBase.replace(/\/+$/, "");

async function request(endpoint, options = {}) {
  const url = `${API_BASE}/${endpoint}`;
  // Only requests with a body declare JSON: a GET with that header costs the
  // browser an extra cross-origin pre-check before the real request.
  const config = {
    ...(options.body ? { headers: { "Content-Type": "application/json" } } : {}),
    ...options,
  };

  const res = await fetch(url, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }

  return data;
}

// Site content and the blog list are fetched once per page load and shared by
// every component, so moving between pages needs no new request.
const shared = {};

// The build saves the CMS responses as one cached file and names it in each page
// (scripts/seo-build.mjs), so the first screen renders without waiting for the API,
// which can take close to a minute to wake. The live response loads after the page.
const snapshotUrl =
  typeof document !== "undefined" && document.querySelector('meta[name="cms-snapshot"]')?.content;
const snapshotFile = snapshotUrl
  ? fetch(snapshotUrl).then((res) => (res.ok ? res.json() : {})).catch(() => ({}))
  : Promise.resolve({});

// Success callbacks that saw the build-time copy, called again once with the live
// response if it differs, so pages show admin edits made since the last build.
const waiting = {};

// The content document carries `updatedAt`; comparing it avoids serialising the whole thing.
const isNewer = (fresh, built) =>
  fresh?.data?.updatedAt && built?.data?.updatedAt
    ? fresh.data.updatedAt !== built.data.updatedAt
    : JSON.stringify(fresh) !== JSON.stringify(built);

function refreshAfterLoad(key, endpoint, built) {
  const refresh = () =>
    request(endpoint)
      .then((fresh) => {
        shared[key] = Promise.resolve(fresh);
        const callbacks = waiting[key];
        delete waiting[key];
        if (isNewer(fresh, built)) {
          callbacks.forEach((callback) => {
            try { callback(fresh); } catch { /* a page's own handler failed; others still update */ }
          });
        }
      })
      .catch(() => { delete waiting[key]; }); // keep showing the build-time copy
  // Wait for the page to finish loading so the check doesn't compete with first paint.
  if (document.readyState === "complete") refresh();
  else window.addEventListener("load", refresh, { once: true });
}

function once(key, endpoint) {
  if (!shared[key]) {
    waiting[key] = new Set();
    shared[key] = snapshotFile.then((snapshot) => {
      const built = snapshot?.[key];
      if (built) {
        refreshAfterLoad(key, endpoint, built);
        return built;
      }
      delete waiting[key];
      return request(endpoint);
    });
    shared[key].catch(() => {
      delete shared[key]; // let the next caller retry
    });
  }

  // Behaves like the shared promise; `.then(onSuccess)` also queues onSuccess for
  // the live update while one is pending.
  const promise = shared[key];
  return {
    then(onSuccess, onError) {
      if (onSuccess && waiting[key]) waiting[key].add(onSuccess);
      return promise.then(onSuccess, onError);
    },
    catch: (onError) => promise.catch(onError),
    finally: (onFinally) => promise.finally(onFinally),
  };
}

export function fetchContent() {
  return once("content", "content/get");
}

export function fetchBlogs() {
  return once("blogs", "blogs/get");
}

export function fetchBlog(id) {
  return request(`blogs/detail/${id}`);
}

export function submitContact(data) {
  return request("contact/submit", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function fetchFeedback() {
  return request("feedback/get");
}

export function submitFeedback(data) {
  return request("feedback/submit", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function submitBooking(data) {
  return request("booking/submit", {
    method: "POST",
    body: JSON.stringify(data),
  });
}


/**
 * Counts a page view for the admin dashboard. Sent as text/plain so the browser
 * needs no CORS preflight, and with sendBeacon so it never delays navigation.
 * No cookies and no personal data are sent.
 */
let lastCounted = "";

/**
 * True only on a browser's first page view ever on this site. The browser keeps
 * the date of its first visit; nothing identifying is sent, just this yes/no.
 * Browsers that block storage are never marked new (so new visitors are not overcounted).
 */
function isFirstVisit() {
  try {
    if (localStorage.getItem("rnp_first_visit")) return false;
    localStorage.setItem("rnp_first_visit", new Date().toISOString().slice(0, 10));
    return localStorage.getItem("rnp_first_visit") !== null;
  } catch {
    return false;
  }
}

export function countPageView(path) {
  if (typeof window === "undefined" || path === lastCounted) return;
  lastCounted = path;
  // The previous page on this site is not a referrer worth counting.
  const referrer = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
  const body = JSON.stringify({ path, referrer, firstVisit: isFirstVisit() });
  const url = `${API_BASE}/visits`;
  try {
    const blob = new Blob([body], { type: "text/plain" });
    if (navigator.sendBeacon && navigator.sendBeacon(url, blob)) return;
    fetch(url, { method: "POST", body, headers: { "Content-Type": "text/plain" }, keepalive: true }).catch(() => {});
  } catch {
    // Counting must never break the page.
  }
}
