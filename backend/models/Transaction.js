const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  type: {
    type: String,
    required: [true, "Transaction type is required"],
  },
  category: {
    type: String,
  },
  date: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
