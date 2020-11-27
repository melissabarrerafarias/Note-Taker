const express = require('express');
const path = require("path");
const app = express();
const notes = require('./db/db.json');
app.use(express.static('public'));

// route to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// route to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// reads the db.json file and returns all saved notes as JSON
app.get('/api/notes', (req, res) => {
    res.json(notes);
}); 

// route that accepts data to be used/stored server-side

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});


// GET /notes should return the notes.html file. ( done )

// GET / should return the index.html file. ( done )

// GET /api/notes should read the db.json file and return all saved notes as JSON. ( done )

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note
// a unique id when it's saved (look into npm packages that could do this for you).

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note 
// with the given id property, and then rewrite the notes to the db.json file.