import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner'; // <-- Import Sonner
const GOOGLE_CLIENT_ID = "963643131341-ln0ahe7eeaecejppckd7ko0stn34dldd.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
      {/* Add Toaster configured for bottom-right */}
      <Toaster position="bottom-right" richColors theme="system" /> 
    </GoogleOAuthProvider>
  </React.StrictMode>,
)