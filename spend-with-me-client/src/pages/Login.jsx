// src/pages/Login.jsx
import { useState } from "react";
import apiClient from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // The apiClient will AUTOMATICALLY encrypt { email, password }
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });
      
      // The apiClient will AUTOMATICALLY decrypt the response
      console.log("Decrypted Login Data:", response.data);
      
      // Save token to localStorage (assuming response.data contains it)
      if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          alert("Login Successful!");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center font-bold">Spend With Me</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Log In
        </button>
      </form>
    </div>
  );
}