console.log('Starting notes.js');

const fs = require('fs');
const _ = require('lodash');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
}

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}
var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  console.log('Getting all notes');
};

var getNote = (title) => {
  console.log('Getting note', title);
  var notes = fetchNotes();
  var searchNote = notes.filter((note) => note.title === title);
  return searchNote[0];
};

var removeNote = (title) => {
  console.log('Removing note', title);
  var notes = fetchNotes();
  var notesSize = _.size(notes);

   notes =  _.remove(notes, (result) =>{
      return result.title != title;
    });

  // notes = notes.filter((note => note.title !== title));
  
  if(notesSize != _.size(notes)){
    saveNotes(notes);
    return title;
  }
};

var logNote = (note) => {
  console.log(`The title is ${note.title}`);
  console.log(`The body is ${note.body}`);
  
}
module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
