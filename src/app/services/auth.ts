export function invalidUser() {
  const user_id = JSON.parse(localStorage.getItem("user_id") || "[]");

  if (user_id.length <= 0) {
    return true;
  }

  return false;
}
