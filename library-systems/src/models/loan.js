import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Loan = sequelize.define("Loan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  memberCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  borrowDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  returned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  penalty: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  penaltyDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default Loan;

// (async () => {
//     await sequelize.sync();
//   })();
