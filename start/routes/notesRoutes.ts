import Route from '@ioc:Adonis/Core/Route'

Route.post('note','NotesController.newNote')

Route.get('/notes/:userID','NotesController.allNotes')

Route.get('note/:id','NotesController.onenote')

Route.put('updatenote/:id','NotesController.updateNote')

Route.delete('deletenote/:id','NotesController.deleteNote')
