const express = require("express");
const router = express.Router();

const {
  createTransaction,
  deleteTransaction,
  getTransactions,
  getTransaction,
} = require("../controllers/transaction");

router.route("/").get(getTransactions).post(createTransaction);
router.route("/:id").delete(deleteTransaction).get(getTransaction);

module.exports = router;
