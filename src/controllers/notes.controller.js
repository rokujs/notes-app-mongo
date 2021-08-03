const Note = require('../models/Note')

const indexCtrl = {}

indexCtrl.renderNoteForm = (req, res) => {
  res.render('notes/newNotes')
}

indexCtrl.createNewNote = (req, res) => {
  const { title, description } = req.body

  const newNote = new Note({ title, description, user: req.user.id })

  newNote.save().then(() => {
    req.flash('success_msg', 'Note added successfully')
    res.redirect('/notes')
  })
}

indexCtrl.renderAllNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: 'desc' }).lean()
  res.render('notes/allNotes', { notes })
}

indexCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean()

  if (note.user !== req.user.id) {
    req.flash('error', "This note is not yours")
    return res.redirect('/notes')
  }
  
  res.render('notes/editNote', { note })
}

indexCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body
  await Note.findByIdAndUpdate(req.params.id, { title, description })
  req.flash('success_msg', 'Note updated successfully')

  res.redirect('/notes')
}

indexCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  req.flash('success_msg', 'Note deleted successfully')
  res.redirect('/notes')
}

module.exports = indexCtrl