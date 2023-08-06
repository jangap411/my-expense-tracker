const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");

//routes
const transactions = require("./routes/transaction");

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

//routes middleware
app.use("/api/v1/transactions", [transactions]);

//create server
const server = http.createServer(app);

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    server.listen(PORT, () =>
      console.log(`\nDB connected..\nServer listening on PORT:${PORT}\n`)
    )
  )
  .catch((err) => console.error(err.message));

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
