const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;



const app = express();


//  middleware 
app.use(cors()); 0
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a3goieg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const categoriesCollection = client.db('furnob').collection('Categories')

        app.get('/Categories', async (req, res) => {
            const query = {};
            const options = await categoriesCollection.find(query).toArray();
            res.send(options);
        })
    }
    finally {

    }
}
run().catch(console.log);





app.get('/', async (req, res) => {
    res.send('furnob server is running');
})

app.listen(port, () => console.log(`Furnob server is running on ${port}`));