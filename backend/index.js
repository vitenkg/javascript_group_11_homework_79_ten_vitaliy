const express = require('express');
const cors = require('cors');
const mysqlDb = require('./mysqlDb');
const inventory = require('./app/inventory');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const port = 8000;

app.use('/inventory', inventory);

mysqlDb.connect().catch(e => console.log(e));

app. listen(port, () => {
    console.log('Server was started on port: ', port);
})