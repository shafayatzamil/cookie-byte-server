const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// const user=cookie-byte
// const password= EF6EJ6sgmkovsXRV

const uri =
  "mongodb+srv://cookie-byte:EF6EJ6sgmkovsXRV@cluster0.cruea6x.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.use(cors());
app.use(express.json());

async function run() {
  try {
    const userCollection = client.db("cookie-byte").collection("users");

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      if (result.insertedId) {
        res.send({
          success: true,
          message: `Successfully created the  with id ${result.insertedId}`,
        });
      } else {
        res.send({
          success: false,
          error: "Couldn't create the user",
        });
      }
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is ronning on the port");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
