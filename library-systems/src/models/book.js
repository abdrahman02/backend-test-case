import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Book = sequelize.define("Book", {
  code: { type: DataTypes.STRING, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
});

export default Book;
