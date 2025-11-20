import { useState } from "react";
import { loginUser } from "../services/authService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const response = await loginUser(email, password);

    if (response.message) {
      setMessage(response.message); // error
    } else {
      setMessage("Login successful! Token saved.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Log In
      </h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-red-600">{message}</p>
      )}
    </div>
  );
}

export default LoginPage;
