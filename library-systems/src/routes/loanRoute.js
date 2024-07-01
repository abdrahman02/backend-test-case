/**
 * @swagger
 * /api/books/borrow:
 *   post:
 *     summary: Borrow a book (Peminjaman Buku)
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *             required:
 *               - memberCode
 *               - bookCode
 *     responses:
 *       201:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 success:
 *                   type: boolean
 *
 *       400:
 *         description: Unable to borrow the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 success:
 *                   type: boolean
 */

/**
 * @swagger
 * /api/books/return/{memberCode}/{bookCode}:
 *   put:
 *     summary: Return a borrowed book (Pengembalian Buku)
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: memberCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Member's code
 *       - in: path
 *         name: bookCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Book's code
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Unable to return the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 success:
 *                   type: boolean
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve all available books (Pengambilan Buku Yang Tersedia)
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: List of available books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 success:
 *                   type: boolean
 */

import express from "express";
import {
  borrowBookHandler,
  returnBookHandler,
  checkBooksHandler,
} from "../controllers/loanController.js";

const router = express.Router();

router.post("/borrow", borrowBookHandler);
router.put("/return/:memberCode/:bookCode", returnBookHandler);
router.get("/", checkBooksHandler);

export default router;
