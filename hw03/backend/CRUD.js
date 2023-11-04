const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:43129108ta@cluster0.vpqmifc.mongodb.net/hw03?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schoolSchema = new mongoose.Schema({
  name: String,
  content: String,
  website: String,
});

const UserModel = mongoose.model("example", schoolSchema, "example");

app.post("/create", (req, res) => {
  const schoolData = req.body;
  UserModel.create(schoolData)
    .then((newschool) => {
      console.log("User Created with ID: " + newschool._id);
      res.status(200).send("User created successfully");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error creating user");
    });
  });


app.get("/school", (req, res) => {
  UserModel.find({})
    .then((example) => {
      res.send(example);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching users");
    });
});

app.put("/update", (req, res) => {
  const id = req.body.schoolID;
  const updateData = req.body;

  UserModel.findByIdAndUpdate(id, updateData, { new: true })
    .then((updatedschool) => {
      if (!updatedschool) {
        return res.status(404).send("school not found");
      }
      res.send(updatedschool);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating school");
    });
});


app.delete("/delete/:schoolID", async (req, res) => {
  const id = req.params.schoolID;
  try {
    const isValidObjectId = ObjectId.isValid(id);

    if (!isValidObjectId) {
      return res.status(400).send("Invalid school ID");
    }

    const result = await UserModel.findByIdAndRemove(id);
    if (!result) {
      res.status(404).send("school not found");
    } else {
      res.send("school deleted successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting school");
  }
});

app.get("/search", (req, res) => {
  const searchName = req.query.name; 
  UserModel.find({ name: { $regex: searchName, $options: "i" } }) 
    .then((example) => {
      res.send(example);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error searching for users by name");
    });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});