import CryptoJS from "crypto-js";

// Hardcoded based on your backend .env configuration
const CRYPTO_SECRET_KEY = CryptoJS.enc.Utf8.parse("mlpokijuytgfdrefcvxdsawerfgbhnmj");
const IV = CryptoJS.enc.Hex.parse("00112233445566778899aabbccddeeff");

// Encrypt payload before sending to backend
export const encryptPayload = (data) => {
  try {
    const plainData = JSON.stringify(data);
    const cipherData = CryptoJS.AES.encrypt(plainData, CRYPTO_SECRET_KEY, {
      iv: IV,
    }).toString();
    return { data: cipherData }; // Backend expects { data: "encrypted_string" }
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

// Decrypt payload received from backend
export const decryptPayload = (encryptedString) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedString, CRYPTO_SECRET_KEY, {
      iv: IV,
    });
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

// Encrypt Auth token (backend decodes the bearer token)
export const encryptToken = (token) => {
  try {
    return CryptoJS.AES.encrypt(token, CRYPTO_SECRET_KEY, {
      iv: IV,
    }).toString();
  } catch (error) {
    return token;
  }
};