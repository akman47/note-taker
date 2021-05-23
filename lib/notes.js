const fs = require("fs");
const path = require("path");

function readNote() {
    const { notes } = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"),"utf-8"));
    //console.log(notes);
    return notes;
}

function getNoteById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify( { notes: notesArray }, null, 2)
    );

    return note;
}

function validateNote(note) {
    if (!note.title) {
        return false;
    }
    if (!note.text) {
        return false;
    }
    if (!note.id) {
        return false;
    }
    return true;
}

function deleteNote(noteId, notesArray) {
    const updatedNotesArray = notesArray.filter(note => note.id !== noteId);

    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify( { notes: updatedNotesArray }, null, 2)
    );

    return updatedNotesArray;
}

module.exports = {
    readNote,
    getNoteById,
    createNewNote,
    validateNote,
    deleteNote
};