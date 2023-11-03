const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "43129108ta",
  database: "fyp",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const content = req.body.content;
  const website = req.body.website;

  db.query(
    "INSERT INTO school (name, content, website) VALUES (?,?,?)",
    [name, content, website],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/search", (req, res) => {
  const name = req.body.name;

  db.query(
    "SELECT * from school where name like ?",
    [`%${name}%`],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/school", (req, res) => {
  db.query("SELECT * from school", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const schoolID = req.body.schoolID;
  const name = req.body.name;
  const content = req.body.content;
  const website = req.body.website;
  db.query(
    "UPDATE school SET name = ?, content = ?, website = ? WHERE schoolID = ?",
    [name, content, website, schoolID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:schoolID", (req, res) => {
  const schoolID = req.params.schoolID;
  db.query("DELETE FROM school WHERE schoolID = ?", schoolID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
