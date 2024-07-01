/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Retrieve all members with borrowed books count (Memuat Semua Anggota Dengan Jumlah Buku Pinjaman)
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: List of members with borrowed books count
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
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                       name:
 *                         type: string
 *                       borrowedBooksCount:
 *                         type: number
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
import { checkMembersHandler } from "../controllers/memberController.js";

const router = express.Router();

router.get("/", checkMembersHandler);

export default router;
