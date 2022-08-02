var express = require("express");
var router = express.Router();
var executeQuery = require("../config/psql").executeQuery;

router.get("/all-students", async function (req, res, next) {
  let query = "SELECT * FROM students";
  let data = await executeQuery(query);
  res.send(data.rows);
});

router.get("/student/:id", async function (req, res, next) {
  let id = req.params.id;
  let query = `SELECT * FROM students WHERE id = ${id}`;
  let data = await executeQuery(query);
  res.send(data.rows);
});



router.get("/average", async function (req, res, next) {
  let query =
    "SELECT  m.id, m.student_id, s.name, s.mobile, \
      e.exam_type, e.exam_date, m.m1, m.m2, m.m3, \
      (m.m1 + m.m2 + m.m3) AS total, \
      ROUND((m.m1 + m.m2 + m.m3) / 3, 2) AS average FROM marks m \
      LEFT JOIN exams e ON e.id = m.exam_id \
      LEFT JOIN students s ON s.id = m.student_id";
  let data = await executeQuery(query);
  res.send(data.rows);
});

module.exports = router;
