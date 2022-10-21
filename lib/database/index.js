import * as pg from "pg";
import { Sequelize } from "sequelize";

import UserModel from "./models/user";
import EnterpriseModel from "./models/enterprise";
import InventoryModel from "./models/inventory";

/**
 * Creates a connection to database and defines models.
 */

export default async function loadSequelize() {
  const sequelize = new Sequelize(
    process.env.DB_USERNAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "postgres",
      dialectModule: pg,
      pool: {
        max: 2,
        min: 0,
        idle: 0,
        acquire: 3000,
        //   evict: CURRENT_LAMBDA_FUNCTION_TIMEOUT,
      },
    }
  );

  await sequelize.authenticate();

  const User = UserModel(sequelize);
  const Enterprise = EnterpriseModel(sequelize);
  const Inventory = InventoryModel(sequelize);

  return {
    sequelize,
    User,
    Enterprise,
    Inventory,
  };
}
