import Route from '@ioc:Adonis/Core/Route'

Route.post('note','NotesController.newNote')

//this route must be GET
Route.get('/notes/:id','NotesController.allNotes')
