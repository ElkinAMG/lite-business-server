import { Model, DataTypes } from "sequelize";

class User extends Model {}

export default function UserModel(sequelize) {
  return User.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,
        },
      },
    },
    { sequelize, tableName: "users", timestamps: false }
  );
}
