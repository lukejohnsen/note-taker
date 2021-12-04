const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            res.json(err);
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

router.post('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            res.json(err);
        }
        const currentNotes = JSON.parse(data);
        const newNote = {...req.body, id: uuidv4() }
        currentNotes.push(newNote);
        fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(currentNotes), (err, data) => {
            if (err) {
                res.json(err);
            }
            res.json(newNote);
        });
    });
});

module.exports = router;