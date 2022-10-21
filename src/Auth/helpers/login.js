import comparePassword from "./comparePasswords";

/**
 * It dispatch process for loggin an user.
 * @param {any} eventBody it is the lambda event containin user information
 * @param {Model} User It is the user model from instance
 * @returns the comparition between given password and database stored.
 */

export default async function login(eventBody, User) {
  try {
    const user = await User.findOne({
      where: {
        email: eventBody.email,
      },
      raw: true,
    });

    if (!user) throw "User with that email does not exist.";

    return comparePassword(eventBody.password, user.password, user.id).then(
      (token) => ({ auth: true, token: token })
    );
  } catch (err) {
    throw err;
  }
}
