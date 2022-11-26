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
        const usersCollection = client.db('furnob').collection('users');


        app.get('/Categories', async (req, res) => {
            const query = {};
            const options = await categoriesCollection.find(query).toArray();
            res.send(options);
        })

        app.get('/categoriesProduct', async (req, res) => {
            // const id = req.params.id

            // console.log(id);

            // // const query = { _id: ObjectId(id) }

            const query = {}
            console.log(query);

            const options = await categoriesProductCollection.find(query).toArray();
            res.send(options);
        })
        // get orders api
        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            console.log(email);
            const query = { email: email };
            const orders = await ordersCollection.find(query).toArray();
            res.send(orders);
        })

        // orders api
        app.post('/orders', async (req, res) => {
            const order = req.body
            console.log(order);
            const result = await ordersCollection.insertOne(order);
            res.send(result);
        });


        // users registered api
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
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