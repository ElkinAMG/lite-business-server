import { Model, DataTypes } from "sequelize";

class Inventory extends Model {}

export default function InventoryModel(sequelize) {
  return Inventory.init(
    {
      SKU: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      additional_data: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      enterprise_id: {
        type: DataTypes.STRING,
        references: {
          model: "enterprise",
          key: "NIT",
        },
      },
    },
    { sequelize, timestamps: false, tableName: "inventory" }
  );
}
