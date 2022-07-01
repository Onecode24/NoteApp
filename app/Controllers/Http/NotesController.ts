// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Note from "App/Models/Note";
import NoteValidator from "App/Validators/NoteValidator";

export default class NotesController {

  async newNote({request,response}){
    try {
      const newNote = await request.validate(NoteValidator);

      await Note.create(newNote);
      response.send({
        message : newNote
      })

    } catch (error) {
      response.status(400).json({
        message : error
      })
    }
  }


  async allNotes({response,params}){
    try {

      const userid = params.userID;

      const allNote = await Database
      .from('notes')
      .select('*')
      .where('user',userid)

      response.send(allNote);

    } catch (error) {
      response.status(400).json({
        error : console.error(error)
      })
    }
  }

  async note({params,response}){
    try {
      const id = params.id;

      const note = await Database
      .from('notes')
      .select('*')
      .where('id',id)

      response.send(note)
    } catch (error) {
      response.status(400).json({
        error : console.error(error)
      })
    }
  }

  async updateNote({request,params,response}){
    try {
      await Database
      .from('notes')
      .where('id',params.id)
      .update(request.body())

      response.send({
        message : "Notes is already update"
      })

    } catch (error) {
      response.status(404).json({
        message :" Request body invalid"
      })
    }
  }

  async onenote({params,response}){
    try {
    const note = await Database
    .from('notes')
    .select('*')
    .where('id',params.id)

    response.send(note);
    } catch (error) {
      response.status(404).json({
        error : "Note "+params.id+" not found"
      })
    }
  }

  async deleteNote({params,response}){
    try {
      await Database
      .from('notes')
      .where('id',params.id)
      .delete()

      response.send({
        message : "note already delete"
      })

    } catch (error) {
      response.status(404).json({
        message : " Request Invalid"
      })
    }
  }

}

