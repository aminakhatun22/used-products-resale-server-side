const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const categoriesCollection = client.db('furnob').collection('Categories');
        const categoriesProductCollection = client.db('furnob').collection('categoriesProduct');
        const ordersCollection = client.db('furnob').collection('orders');


        app.get('/Categories', async (req, res) => {
            const query = {};
            const options = await categoriesCollection.find(query).toArray();
            res.send(options);
        })

        app.get('/categoriesProduct', async (req, res) => {
            // const id = req.params.id
            // const test = id === _id;
            // console.log(id);

            // // const query = { _id: ObjectId(id) }
            // const query = { test }
            const query = {}
            console.log(query);

            const options = await categoriesProductCollection.find(query).toArray();
            res.send(options);
        })

        // orders api
        app.post('/orders', async (req, res) => {
            const order = req.body
            console.log(order);
            const result = await ordersCollection.insertOne(order);
            res.send(result);
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


// export the express api
module.export = app;