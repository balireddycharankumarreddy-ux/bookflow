// Backend API base URL
// Set VITE_API_URL in Vercel environment variables to the Render backend URL
// Falls back to localhost for local development
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8081";

export default API_BASE;
