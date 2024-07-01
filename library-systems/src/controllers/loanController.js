import Book from "../models/book.js";
import Loan from "../models/loan.js";
import { Op } from "sequelize";

const borrowBookHandler = async (req, res) => {
  const { memberCode, bookCode } = req.body;

  try {
    const currentBorrowedBooks = await Loan.count({
      where: {
        memberCode: memberCode,
        returned: false,
      },
    });
    if (currentBorrowedBooks >= 2)
      return res.status(400).json({
        msg: "Member has borrowed the maximum number of books.",
        success: false,
      });

    // Check apakah stock buku masih ada
    const book = await Book.findOne({
      where: {
        code: bookCode,
        stock: {
          [Op.gt]: 0,
        },
      },
    });

    if (!book)
      return res.status(400).json({
        msg: "Book is not available for borrowing.",
        success: false,
      });

    // Buat peminjaman
    const loan = await Loan.create({
      memberCode: memberCode,
      bookCode: bookCode,
      borrowDate: new Date(),
      returned: false,
      penalty: false,
    });

    // Kurangi stock buku
    await book.update({
      stock: book.stock - 1,
    });

    return res
      .status(201)
      .json({ msg: "Book borrowed successfully", success: true, data: loan });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

const returnBookHandler = async (req, res) => {
  const { memberCode, bookCode } = req.params;

  try {
    // Check data peminjaman
    const loan = await Loan.findOne({ where: { memberCode, bookCode } });

    if (!loan)
      return res.status(404).json({
        msg: "Loan not found.",
        success: false,
      });

    if (loan.returned)
      return res.status(400).json({
        msg: "Book has already been returned.",
        success: false,
      });

    // Check apakah member akan terkena penalti
    const borrowDate = new Date(loan.borrowDate);
    const returnDate = new Date();
    const diffDays = Math.ceil(
      (returnDate - borrowDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays > 7) {
      await loan.update({
        returned: true,
        returnDate: returnDate,
        penalty: true,
        penaltyDate: returnDate,
      });

      // Kembalikan stock buku
      const book = await Book.findOne({
        where: {
          code: loan.bookCode,
        },
      });

      await book.update({
        stock: book.stock + 1,
      });

      return res.status(200).json({
        msg: "Book returned with penalty applied.",
        success: true,
        data: loan,
      });
    } else {
      await loan.update({
        returned: true,
        returnDate: returnDate,
      });

      // Kembalikan stock buku
      const book = await Book.findOne({
        where: {
          code: loan.bookCode,
        },
      });

      await book.update({
        stock: book.stock + 1,
      });

      return res.status(200).json({
        msg: "Book returned successfully.",
        success: true,
        data: loan,
      });
    }

  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

const checkBooksHandler = async (req, res) => {
  try {
    const books = await Book.findAll({ where: { stock: { [Op.gt]: 0 } } });
    return res
      .status(200)
      .json({ msg: "Books fetched successfully.", success: true, data: books });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export { borrowBookHandler, returnBookHandler, checkBooksHandler };
