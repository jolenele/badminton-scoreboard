const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { default: Match } = require("./models/Match");

const app = express();
const port = 10000;

app.use(cors());
app.use(express.json());

// MongoDB Atlas URI
const uri = "mongodb+srv://bonvoaye:hsblztOVOlAc@badminton.qxkycgg.mongodb.net/?retryWrites=true&w=majority&appName=Badminton";

// Create MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB and define routes
async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("Badminton");
    const matches = db.collection("matches");

    app.post("/api/matches", async (req, res) => {

      if ('_id' in req.body) {
        delete req.body._id;
      }
      const match = new Match(req.body);

   
      try {
        const result = await matches.insertOne(match);
        res.status(201).json({ message: "Match saved", id: result.insertedId });
      } catch (error) {
        res.status(500).json({ message: "Error saving match", error });
      }
    });

    app.get("/api/matches", async (req, res) => {
      try {
        const allMatches = await matches.find({}).toArray();
        res.json(allMatches);
      } catch (error) {
        res.status(500).json({ message: "Error fetching matches", error });
      }
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

run();
