const fs = require("fs");
const path = require("path");
const generateUniqueId = require("generate-unique-id");
const { notes } = require("../db/db.json");
const { deleteNote, createNewNote, validateNote } = require("../lib/notes");

jest.mock("fs");

test("creates new note and adds it to notes array", () => {
    const notesArray = notes;
    
    const note = createNewNote(
        {title: "New Title", text: "new text", id: "356"}, notesArray
    );

    expect(note.title).toBe("New Title");
    expect(note.text).toBe("new text");
    expect(note.id).toBe("356");
});

test("validates note input to ensure title and text are included", () => {
    const validNote = {
        title: "New Title",
        text: "new text",
        id: "134"
    };

    const invalidNote = {
        title: "New Title"
    };

    expect(validateNote(validNote)).toBeTruthy();
    expect(validateNote(invalidNote)).toBeFalsy();
});

test("deletes selected note by id from json file", () => {
    const noteId = "123";
    const notesArray = notes;

    const newNote = {
        title: "New Title",
        text: "new text",
        id: noteId
    }

    createNewNote(newNote, notesArray);

    const expectedResults = notesArray.filter(note => note.id !== noteId);

    let updatedArray = deleteNote(noteId, notesArray);
    expect(updatedArray).toMatchObject(expectedResults);
});