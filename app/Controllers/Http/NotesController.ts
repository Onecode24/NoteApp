// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Note from "App/Models/Note";
import NoteValidator from "App/Validators/NoteValidator";

export default class NotesController {

  async newNote({request,response}){
    try {
      const newNote = await request.validate(NoteValidator);
      console.log(newNote);

      await Note.create(newNote);
      response.send({
        message : newNote
      })

    } catch (error) {
      console.log(error);
      response.status(400).json({
        message : error
      })
    }
  }


  async allNotes({request,response,params}){
    try {

      const id = params.id;

      const allNote = await Database
      .from('notes')
      .select('*')
      .where('user',id)

      response.send(allNote);

    } catch (error) {
      console.log(error);
      response.status(400).json({
        error : error
      })
    }
  }

}
