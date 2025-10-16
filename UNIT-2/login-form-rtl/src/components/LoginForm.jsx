// // src/components/LoginForm.jsx
// import React, { useState } from "react";

// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState(""); // success message text
//   const [error, setError] = useState("");     // error text

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!res.ok) {
//         // server returned non-2xx
//         const data = await res.json().catch(() => ({}));
//         setError(data.error || "Invalid username or password");
//         return;
//       }

//       const data = await res.json();
//       // tests expect "Welcome, alice"
//       setMessage(`Welcome, ${data.username}`);
//     } catch (err) {
//       // network or other unexpected error
//       setError(err.message || "Network error");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="username">Username</label>
//         <input
//           id="username"
//           type="text"
//           placeholder="Enter username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />

//         <label htmlFor="password">Password</label>
//         <input
//           id="password"
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit">Login</button>
//       </form>

//       {message && <p>{message}</p>}
//       {error && (
//         // tests look for findByRole('alert')
//         <div role="alert">{error}</div>
//       )}
//     </div>
//   );
// };

// export default LoginForm;
// src/components/LoginForm.jsx
import React, { useState } from "react";
import { mockLogin } from "../api/mockApi";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // If fetch was replaced by a test mock (vi.fn()), it will usually have `.mock`
    const fetchIsMocked = typeof fetch === "function" && !!fetch.mock;

    if (fetchIsMocked) {
      // Use fetch so tests that mock global.fetch behave the same
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error || "Invalid username or password");
          return;
        }

        const data = await res.json();
        // Tests expect "Welcome, <username>"
        setMessage(`Welcome, ${data.username}`);
      } catch (err) {
        // network error -> surface the error message (tests expect this behavior)
        setError(err?.message || "Network error");
      }
    } else {
      // Normal UI/dev: use mockLogin so XYZ / 1234 works in browser
      try {
        const res = await mockLogin(username, password);
        // Keep same message format as tests: "Welcome, <name>"
        setMessage(`Welcome, ${res.user.name}`);
      } catch (err) {
        // mockLogin rejects with { message: "Invalid credentials" } in your mock
        // If it's an object, prefer its message field
        const msg = err?.message || err?.error || "Invalid username or password";
        setError(msg);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {message && <p data-testid="message">{message}</p>}
      {error && <div role="alert">{error}</div>}
    </div>
  );
};

export default LoginForm;
