import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data as soon as the dashboard loads
    const fetchDashboardData = async () => {
      try {
        // Because of the Axios interceptor we created earlier, 
        // the JWT token from localStorage will be automatically encrypted and attached!
        const response = await apiClient.get("/transaction"); // Or whichever route returns user summary
        
        console.log("Decrypted Dashboard Data:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        if (error.response?.status === 401) {
            handleLogout();
        }
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {data ? (
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500">Loading your financial data...</p>
          )}
        </div>
      </div>
    </div>
  );
}