var express = require("express");
var router = express.Router();
var executeQuery = require("../config/psql").executeQuery;

router.get("/exam", async function (req, res, next) {
  let query = `SELECT * FROM exams`;
  let data = await executeQuery(query);
  res.send(data.rows);
});

router.get("/exam/:exam_type", async function (req, res, next) {
  let examType = req.params.exam_type;
  let query = `SELECT * FROM exams WHERE exam_type = '${examType}'`;
  let data = await executeQuery(query);
  res.send(data.rows);
});

module.exports = router;
