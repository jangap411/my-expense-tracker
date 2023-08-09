const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Auth users
const createTransaction = async (req, res) => {
  try {
    const transaction = req.body;

    const newTransaction = new Transaction({
      ...transaction,
    });

    await newTransaction.save();

    res.status(201).json(newTransaction);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({ data: err });
    }
  }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Auth users
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: `Transaction ${id} Removed Successfully`,
    });
  } catch (err) {
    res.status(500).json({ data: err, error: true });
  }
};

// @desc    GET transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Auth users
const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    return res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ data: err, error: true });
  }
};

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Auth users
const getTransactions = async (req, res) => {
  try {
    const allTransactions = await Transaction.find({}).sort({ _id: -1 });
    res.status(200).json(allTransactions);
  } catch (err) {
    res.status(500).json({ data: err, error: true });
  }
};

module.exports = {
  createTransaction,
  deleteTransaction,
  getTransactions,
  getTransaction,
};
