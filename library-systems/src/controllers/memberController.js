import Member from "../models/member.js";
import Loan from "../models/loan.js";

const checkMembersHandler = async (req, res) => {
  try {
    const members = await Member.findAll({
      attributes: ["code", "name"],
    });

    const membersWithBorrowedBooks = await Promise.all(
      members.map(async (member) => {
        const borrowedBooksCount = await Loan.count({
          where: {
            memberCode: member.code,
            returned: false,
          },
        });
        return { ...member.toJSON(), borrowedBooksCount: borrowedBooksCount };
      })
    );
    return res.status(200).json({
      msg: "Members fetched successfully.",
      success: true,
      data: membersWithBorrowedBooks,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export { checkMembersHandler };
