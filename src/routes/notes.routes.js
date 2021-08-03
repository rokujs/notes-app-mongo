const { Router } = require('express')
const router = Router()

const {
  renderNoteForm,
  createNewNote,
  renderAllNotes,
  renderEditForm,
  updateNote,
  deleteNote
} = require('../controllers/notes.controller')
const {isAuthenticated} = require('../helpers/auth')

// New Note
router.get('/notes/add',isAuthenticated, renderNoteForm)
router.post('/notes/add',isAuthenticated, createNewNote)

// All Notes
router.get('/notes',isAuthenticated, renderAllNotes)

// Update Note
router.get('/notes/edit/:id',isAuthenticated, renderEditForm)
router.put('/notes/edit/:id',isAuthenticated, updateNote)

// Delete Note
router.delete('/notes/delete/:id',isAuthenticated, deleteNote)

module.exports = router