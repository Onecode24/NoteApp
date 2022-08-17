import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.post('note','NotesController.newNote')
  Route.get('/notes','NotesController.allNotes')
  Route.get('note/:id','NotesController.onenote')
  Route.put('updatenote/:id','NotesController.updateNote')
  Route.delete('deletenote/:id','NotesController.deleteNote')

}).prefix('/api/v1/notes')
