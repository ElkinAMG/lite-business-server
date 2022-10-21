import bcrypt from "bcryptjs";

import signToken from "./signToken";

/**
 * It dispatch process for sign up an user.
 * @param {any} eventBody it is the lambda event containin user information
 * @param {any} User It is the user model from instance
 * @returns the comparition between given password and database stored.
 */

export default async function signUp(eventBody, User) {
  try {
    const user = await User.findOne({
      where: {
        email: eventBody.email,
      },
      raw: true,
    });

    console.log(user);

    if (user) throw "User with that email already exist.";

    const hashedPassword = await bcrypt.hash(eventBody.password, 8);

    return User.create(
      { email: eventBody.email, password: hashedPassword },
      { raw: true }
    ).then((user) => ({
      auth: true,
      token: signToken(user.id),
    }));
  } catch (err) {
    throw err;
  }
}
