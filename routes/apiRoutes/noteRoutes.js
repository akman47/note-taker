const router = require("express").Router();
//const { notes } = require("../../db/db");
const { createNewNote, validateNote, getNoteById, deleteNote, readNote } = require("../../lib/notes");
const generateUniqueId = require("generate-unique-id");

router.get('/notes', (req, res) => {
    const notes = readNote();
    console.log(notes);
    res.json(notes);
});

// router.get('/notes/:id', (req, res) => {
//     const result = getNoteById(req.params.id, notes);
    
//     if (result) {
//         res.json(result);
//     }
//     else {
//         res.send(404);
//     }
// });

router.post('/notes', (req, res) => {
    // set unique id to each note
    req.body.id = generateUniqueId({
        length: 3,
        useLetters: false
    });
    console.log(req.body);

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send("The note is missing a title or message.")
    }
    else {
        let notes = readNote();
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete("/notes/:id", (req, res) => {
    let notes = readNote();
    const result = deleteNote(req.params.id, notes);

    //console.log(result);
    res.json(result);
});

module.exports = router;