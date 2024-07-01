import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Member = sequelize.define("Member", {
  code: { type: DataTypes.STRING, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

export default Member;
