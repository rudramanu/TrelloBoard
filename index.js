const express = require("express");
const { connection } = require("./configs/db");
const { noticeRouter } = require("./routes/notice.routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/home", (req, res) => {
  res.send("getting data of home page");
});
app.use("/", noticeRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error while connecting to DB");
  }
  console.log(`Server is running at port ${process.env.port}`);
});
//done with backend
