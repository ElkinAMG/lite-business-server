import bcrypt from "bcryptjs";

import signToken from "./signToken";

export default async function comparePassword(
  eventPassword,
  userPassword,
  userId
) {
  return bcrypt
    .compare(eventPassword, userPassword)
    .then((passwordIsValid) =>
      !passwordIsValid
        ? Promise.reject(new Error("The credentials do not match."))
        : signToken(userId)
    );
}
