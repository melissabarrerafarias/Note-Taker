const fs = require('fs');
const path = require("path");
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true })); // parse string or array data 
app.use(express.json()); // parse JSON data
const { notes } = require('./Develop/db/db.json');
app.use(express.static('./Develop/public'));


function newNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), 
    JSON.stringify({ notes: notesArray }, null, 2)
    );

    return body;
}
 

// route to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});


// route to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});


// reads the db.json file and returns all saved notes as JSON
app.get('/api/notes', (req, res) => {
    res.json(notes);
}); 


// route that accepts data to be used/stored server-side
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    
    const note = newNote(req.body, notes);

    res.json(note);
});

// deletes note
app.delete('/api/notes/:id', (req, res) => {
    // code to delete note goes here
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
 

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note 
// with the given id property, and then rewrite the notes to the db.json file.