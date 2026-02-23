import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // apiClient will automatically encrypt this payload before sending
      const response = await apiClient.post("/auth/signup", {
        name,
        email,
        password,
      });
      
      console.log("Signup Response:", response.data);
      alert("Signup successful! Please log in.");
      navigate("/login");
      
    } catch (error) {
      console.error("Signup failed", error);
      alert("Error during signup.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-6 text-center font-bold">Create an Account</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded mb-3">
          Sign Up
        </button>
        <div className="text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
        </div>
      </form>
    </div>
  );
}