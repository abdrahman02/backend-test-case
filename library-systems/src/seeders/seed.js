import sequelize from "../configs/database.js";
import Book from "../models/book.js";
import Member from "../models/member.js";
import dotenv from "dotenv";

dotenv.config();

const seed = async () => {
  await sequelize.sync({ force: true });

  await Book.bulkCreate([
    { code: "JK-45", title: "Harry Potter", author: "J.K Rowling", stock: 1 },
    {
      code: "SHR-1",
      title: "A Study in Scarlet",
      author: "Arthur Conan Doyle",
      stock: 1,
    },
    { code: "TW-11", title: "Twilight", author: "Stephenie Meyer", stock: 1 },
    {
      code: "HOB-83",
      title: "The Hobbit, or There and Back Again",
      author: "J.R.R. Tolkien",
      stock: 1,
    },
    {
      code: "NRN-7",
      title: "The Lion, the Witch and the Wardrobe",
      author: "C.S. Lewis",
      stock: 1,
    },
  ]);

  await Member.bulkCreate([
    { code: "M001", name: "Angga" },
    { code: "M002", name: "Ferry" },
    { code: "M003", name: "Putri" },
  ]);

  console.log("Data has been seeded");
};

seed();
