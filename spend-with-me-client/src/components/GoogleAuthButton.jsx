import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';

export default function GoogleAuthButton() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    setErrorMsg("");
    try {
      // The credential is the ID token expected by your backend client.verifyIdToken()
      const response = await apiClient.post("/auth/google-signup", {
        token: credentialResponse.credential 
      });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        navigate('/dashboard'); 
      }
    } catch (error) {
      console.error("Google Auth Failed", error);
      setErrorMsg(error.response?.data?.message || "Google Authentication failed.");
    }
  };

  return (
    <div className="mt-6 w-full">
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 py-1 rounded-full bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 shadow-sm">
            Or continue with
          </span>
        </div>
      </div>

      {errorMsg && (
        <p className="text-red-500 dark:text-red-400 text-sm font-medium text-center mb-4 bg-red-50 dark:bg-red-900/20 py-2 rounded-lg border border-red-100 dark:border-red-800/50">
          {errorMsg}
        </p>
      )}
      
      <div className="flex justify-center w-full shadow-[0_4px_14px_0_rgb(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] transition-shadow duration-200 rounded-full">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            setErrorMsg("Google connection was closed or failed.");
          }}
          useOneTap
          theme="outline"
          shape="pill"
          width="100%"
          text="continue_with"
        />
      </div>
    </div>
  );
}