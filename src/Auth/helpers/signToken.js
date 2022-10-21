import jwt from "jsonwebtoken";

/**
 * It creates a new token expiring in 24 hours for login identification.
 * @param {string} id is the unique identificator for user in database.
 * @returns the new token for login identification.
 */

export default function signToken(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
}
