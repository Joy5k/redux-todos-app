/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 5000;

app.use(express.json());
app.use(cors());

const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    client.connect();
    const db = await client.db("taskmaster");
    const tasksCollection = db.collection("tasks");

    console.log("Successfully connected to MongoDB!");

    app.get("/", (req, res) => {
      res.send("Task Master Server Running");
    });

    app.get("/tasks", async (req, res) => {
      try {
        const query = {}
        if (req.query.priority) {
          query.priority = req.query.priority
        }
        console.log(query);
        const tasks = await tasksCollection.find(query).toArray();
        res.json(tasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.post("/task", async (req, res) => {
      const newTask = req.body;
      try {
        const result = await tasksCollection.insertOne(newTask);
        res.status(201).json(result);
      } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.delete("/task/:id", async (req, res) => {
      const taskId = req.params.id;
console.log(taskId);
      try {
        const result = await tasksCollection.deleteOne({
          _id: new ObjectId(taskId),
        });
        if (result.deletedCount === 0) {
          res.status(404).json({ error: "Task not found" });
        } else {
          res.json({ message: "Task deleted successfully" });
        }
      } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.put("/task/:id", async (req, res) => {
      const taskId = req.params.id;
      const updatedTaskData = req.body;
      console.log(taskId,updatedTaskData);
      try {
        const result = await tasksCollection.updateOne(
          { _id: new ObjectId(taskId) },
          { $set: updatedTaskData }
        );

        if (result.matchedCount === 0) {
          res.status(404).json({ error: "Task not found" });
        } else {
          res.json({ message: "Task updated successfully" });
        }
      } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error(error);
  }
})();

app.listen(port, () => {
  console.log(`Task master server is running on port ${port}`);
});
