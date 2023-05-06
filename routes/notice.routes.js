const express = require("express");

const { NoticeModel } = require("../models/notice.model");

const noticeRouter = express.Router();

noticeRouter.get("/getnotice", async (req, res) => {
  const notices = await NoticeModel.find();
  res.send(notices);
});

noticeRouter.post("/postnotice", async (req, res) => {
  const payload = req.body;
  try {
    const notice = new NoticeModel(payload);
    await notice.save();
    res.send({ message: "Notice posted" });
  } catch (error) {
    res.send({ message: "Error while posting" });
  }
});
noticeRouter.patch("/updatenotice/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const notice = await NoticeModel.findOne({ _id: id });
  if (notice) {
    await NoticeModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ message: "Notice Updated" });
  } else {
    res.send({ message: "Notice not found" });
  }
});
noticeRouter.delete("/deletenotice/:id", async (req, res) => {
  const id = req.params.id;
  const notice = await NoticeModel.findOne({ _id: id });
  if (notice) {
    await NoticeModel.findByIdAndRemove({ _id: id });
    res.send({ message: "Notice Deleted" });
  } else {
    res.send({ message: "Notice not found" });
  }
});

module.exports = { noticeRouter };
