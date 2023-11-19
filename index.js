const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 7000;

// middleware

app.use(cors());
app.use(express.json());

// thierrybishop12

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// mongodb configuration

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://thierrybishop:thierrybishop12@inventory.g2axku3.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // connect a collection of documents

    const bookCollections = client.db("BookInventory").collection("books");

    // insert a book to the db: post method 

    app.post("/upload-book", async(req, res)=>{
      const data = req.body;
      const result = await bookCollections.insertOne(data);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

module.exports = app;