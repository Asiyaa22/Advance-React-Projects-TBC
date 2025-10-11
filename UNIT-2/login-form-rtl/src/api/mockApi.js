export const mockLogin = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "XYZ" && password === "1234") {
        resolve({ token: "fake-jwt-token", user: { name: "XYZ" } });
      } else {
        reject({ message: "Invalid credentials" });
      }
    }, 700);
  });
};
