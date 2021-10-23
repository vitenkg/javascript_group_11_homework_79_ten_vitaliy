const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const {nanoid} = require('nanoid');
const router = express.Router();
const mysql = require('../mysqlDb');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    const [inventory] = await mysql.getConnection().query('SELECT * FROM items');
    res.send(inventory);
});

router.get('/:id', async (req, res) => {
    const [inventory] = await mysql.getConnection().query(
        'SELECT * FROM items where id = ?',
        [req.params.id]);
    res.send(inventory);
});

router.put ('/:id', upload.single('image'), async (req, res) => {
    const editItem = {
        category_id: req.body.category,
        location_id: req.body.location,
        name: req.body.name,
        description: req.body.description,
    };

    if (req.file) {
        editItem.image = req.file.filename;
    }

    const updateItem = await mysql.getConnection().query(
        'UPDATE ?? SET ? where = ?',
        ['items', {...editItem}, req.params.id]
    );
    res.send({message: "Updated"});
});

router.post('/', upload.single('image'), async (req, res) => {
    if (!req.body.name || !req.body.location || !req.body.category || !req.body.description) {
        return res.status(400).send({error: 'Data not valid'});
    }

    let location = null;
    let category = null;

    switch (req.body.location) {
        case 'Office':
            location = 2;
            break;
        case 'Head office':
            location = 1;
            break;
        case 'Back office':
            location = 3
            break;
        default:
            break;
    };

    switch (req.body.category) {
        case 'Furniture':
            category = 1;
            break;
        case 'Office equipment':
            category = 2;
            break;
        case 'Other':
            category = 3
            break;
        default:
            break;
    };

    const item  = {
        category_id: category,
        location_id: location,
        name: req.body.name,
        description: req.body.description,
    };

    if (req.file) {
        item.image = req.file.filename;
    }

    const newItem = await mysql.getConnection().query(
        'INSERT INTO ?? (category_id, location_id, name, description, photo) values (?, ?, ?, ?, ?)',
        ['items', item.category_id, item.location_id, item.name, item.description, item.image]
    );

    res.send({
        ...item,
        id: newItem.insertId
    });
});

module.exports = router;