const API_BASE = import.meta.env.VITE_API_BASE || "/api";

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

export function fetchContent() {
  return request("content/get");
}

export function fetchBlogs() {
  return request("blogs/get");
}

export function fetchBlog(id) {
  return request(`blogs/detail/${id}`);
}

export function fetchGallery() {
  return request("gallery/get");
}

export function submitContact(data) {
  return request("contact/submit", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function fetchSafari() {
  return request("safari/get");
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

