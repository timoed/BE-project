// In development, it is empty '' (so it uses the proxy in vite.config.js).
// In production (Replit), we will set VITE_API_URL in the environment.

const API_URL = import.meta.env.VITE_API_URL || '';

export default API_URL;
