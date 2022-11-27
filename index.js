const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
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
        const wishListCollection = client.db('furnob').collection('wishList');


        app.get('/Categories', async (req, res) => {
            const query = {};
            const options = await categoriesCollection.find(query).toArray();
            res.send(options);
        })



        // app.get('/ct', async (req, res) => {

        //     const params = req.params.id;
        //     console.log(params);
        //     const query = { id: params }


        //     const options = await categoriesProductCollection.find(query).toArray();
        //     res.send(options);
        // })

        // -----------------

        // all seller
        app.get('/allseller', async (req, res) => {
            const seller = { role: "seller" }
            const result = await usersCollection.find(seller).toArray();
            res.send(result);
        });

        app.get('/allbyers', async (req, res) => {
            const byer = { role: "user" }
            const result = await usersCollection.find(byer).toArray();
            res.send(result);
        });




        app.get('/ct/:id', async (req, res) => {
            const params = req.params.id;
            console.log(params);
            const query = { id: params }


            const options = await categoriesProductCollection.find(query).toArray();
            res.send(options);

        })
        // get orders api
        app.get('/pro', async (req, res) => {
            const email = req.query.email;
            // console.log(email);
            const query = { email: email };
            const orders = await ordersCollection.find(query).toArray();
            res.send(orders);
        });
        // wishlist posst
        app.post('/wishList', async (req, res) => {
            const wishlist = req.body;
            // console.log(wishlist);
            const result = await wishListCollection.insertOne(wishlist);
            res.send(result);

        });

        // orders api
        app.post('/orders', async (req, res) => {
            const order = req.body
            // console.log(order);
            const result = await ordersCollection.insertOne(order);
            res.send(result);
        });
        // get users api
        app.get('/users', async (req, res) => {
            // const users = req.query.role;
            // const query = { role: users };
            // const result = await usersCollection.find(query).toArray();
            // res.send(users)
            const query = {}
            const users = await usersCollection.find(query).toArray();
            res.send(users);


        })

        // users registered api
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });


        // make admin
        app.put('/users/admin/:email', async (req, res) => {
            const email = req.params.email;

            const filter = { email: email }

            const options = { upsert: true }; updatedDoc = {
                $set: {
                    category: 'admin'
                }
            }
            const result = await usersCollection.updateOne(filter, options, updatedDoc)
            res.send(result);

        })

        // get admin 

        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query)
            console.log(user);
            res.send({ isAdmin: user?.role === 'admin' });
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