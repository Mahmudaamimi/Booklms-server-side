const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Lms:iUNrqDHUFiJ02mQg@cluster0.8wqrrau.mongodb.net/?retryWrites=true&w=majority";

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
const bookCollection = client.db('bookDB').collection('addbook');

app.post('/addbooks', async (req, res) => {
    const newbooks = req.body;
    const result = await bookCollection.insertOne(newbooks)
    res.send(result)
  })


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})