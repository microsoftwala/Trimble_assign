export const extractUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return { username: "", role: "" };
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      username: payload.username || payload.name || "",
      role: payload.role || ""
    };
  } catch {
    return { username: "", role: "" };
  }
};