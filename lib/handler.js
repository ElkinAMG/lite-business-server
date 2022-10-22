import loadSequelize from "./database";
import * as Eta from "eta";
import path from "path";

let sequelize = null;

// Tells Eta where look for templates
Eta.configure({
  views: path.join(__dirname, "..", "views"),
});

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
    let body, statusCode, headers, contentType, isBase64Encoded;

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
      contentType = body?.contentType || "application/json";
      headers = body?.headers || {};
      isBase64Encoded = body?.isBase64Encoded || false;
    } catch (err) {
      body = { name: err.name, message: err.message };
      statusCode = 500;
    } finally {
      // close any opened connections during the invocation
      // this will wait for any in-progress queries to finish before closing the connections
      await sequelize.sequelize.connectionManager.close();
    }

    delete body?.statusCode;
    delete body?.contentType;
    delete body?.headers;
    delete body?.isBase64Encoded;

    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        ...headers,
      },
      isBase64Encoded,
    };
  };
}
