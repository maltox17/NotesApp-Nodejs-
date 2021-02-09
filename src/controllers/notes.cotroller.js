const notesCtrl = {};
const Note = require("../models/Notes");

notesCtrl.renderNoteForm = (req, res) => {
    res.render('./notes/new-note');
}

notesCtrl.createNewNote = async (req, res) =>{
    const {title, description} = req.body;
    const newNote = new Note({title, description});
    //console.log(newNote);
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('sucess_msg', 'Note Added successfully');

    res.redirect('/notes/');
}

notesCtrl.renderNotes = async (req, res) =>{
    const notes =  await Note.find({user: req.user.id}).lean().sort({createdAt: -1});
    res.render('notes/all-notes', {notes });
}

notesCtrl.renderEditForm = async (req, res) => {
    if(note.user != req.user.id){
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/notes');
    }
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', { note });
}

notesCtrl.updateNote = async (req, res) => {
  const {title, description}= req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg', 'Note updated Successfully');
  res.redirect("/notes");

}

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note delete Successfully');
    res.redirect('/notes');
}

module.exports = notesCtrl;