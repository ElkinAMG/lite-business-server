import loadSequelize from "./database";

let sequelize = null;

/**
 * It's a function that returns a promise with resulting information
 * @callback lambda
 * @param {loadSequelize} Models - It's a promise contanining all database models
 * @param {any} event - It's an object containing all event information
 * @param {any} context - It's an object containing all context information
 */

/**
 * It executes a lambda function using connection to sequelize.
 * @param {lambda} lambda it's the lambda function to be executed
 * @returns HTTP response
 */

export default function handler(lambda) {
  return async (event, context) => {
    let body, statusCode;

    // re-use the sequelize instance across invocations to improve performance
    if (!sequelize) {
      sequelize = await loadSequelize();
    } else {
      // restart connection pool to ensure connections are not re-used across invocations
      sequelize.sequelize.connectionManager.initPools();

      // restore `getConnection()` if it has been overwritten by `close()`
      if (
        sequelize.sequelize.connectionManager.hasOwnProperty("getConnection")
      ) {
        delete sequelize.sequelize.connectionManager.getConnection;
      }
    }

    try {
      // Calls lambda with sequelize models and lambda objects
      body = await lambda(sequelize, event, context);
      statusCode = body?.statusCode || 200;
    } catch (err) {
      body = { name: err.name, message: err.message };
      statusCode = 500;
    } finally {
      // close any opened connections during the invocation
      // this will wait for any in-progress queries to finish before closing the connections
      await sequelize.sequelize.connectionManager.close();
    }

    delete body?.statusCode;

    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  };
}
