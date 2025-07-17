// utils/passwordGenerator.js

/**
 * Generates a secure, human-readable password.
 * Avoids ambiguous characters (I, l, 1, 0, O) and special symbols
 * to prevent copy-paste and readability issues.
 * @param {number} length The desired length of the password.
 * @returns {string} The generated password.
 */
export const generateSecurePassword = (length = 10) => {
  const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};