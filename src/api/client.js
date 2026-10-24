const rawBase =
  import.meta.env.VITE_API_BASE ||
  import.meta.env.VITE_BASE_URL_API ||
  import.meta.env.VITE_API_URL ||
  "https://backend-hbkg.onrender.com/api";
const API_BASE = rawBase.replace(/\/+$/, "");

async function request(endpoint, options = {}) {
  const url = `${API_BASE}/${endpoint}`;
  const config = {
    headers: { "Content-Type": "application/json" },
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
function once(key, endpoint) {
  if (!shared[key]) {
    shared[key] = request(endpoint).catch((error) => {
      delete shared[key]; // let the next caller retry
      throw error;
    });
  }
  return shared[key];
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
export function countPageView(path) {
  if (typeof window === "undefined" || path === lastCounted) return;
  lastCounted = path;
  // The previous page on this site is not a referrer worth counting.
  const referrer = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
  const body = JSON.stringify({ path, referrer });
  const url = `${API_BASE}/visits`;
  try {
    const blob = new Blob([body], { type: "text/plain" });
    if (navigator.sendBeacon && navigator.sendBeacon(url, blob)) return;
    fetch(url, { method: "POST", body, headers: { "Content-Type": "text/plain" }, keepalive: true }).catch(() => {});
  } catch {
    // Counting must never break the page.
  }
}
