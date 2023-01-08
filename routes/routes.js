const express = require("express");
const router = express.Router();
const Model = require("../model/model");

router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const options = { new: true };

  try {
    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedData = await Model.findByIdAndRemove(id);
    res.send(`Document of name ${deletedData.name} is deleted successfully`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
