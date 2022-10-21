import { Model, DataTypes } from "sequelize";

class Enterprise extends Model {}

export default function EnterpriseModel(sequelize) {
  return Enterprise.init(
    {
      NIT: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, tableName: "enterprise", timestamps: false }
  );
}
