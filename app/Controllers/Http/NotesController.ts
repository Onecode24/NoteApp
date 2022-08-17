// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Note from "App/Models/Note";
import NoteValidator from "App/Validators/NoteValidator";
import session from "Config/session";
import { DateTime } from "luxon";

export default class NotesController {

  async newNote({request,response,session}){
    try {
      //console.log(session.get('user'));
      // request.original().user = session.get('user').id;
      // console.log(session.get('user').id,request.original());

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


  async allNotes({response,session}){
    try {

      const userid = session.get('user').id;

      const allNote = await Note.findBy('user',userid)

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

      const note = await Note.find(id)

      response.send(note)
    } catch (error) {
      response.status(400).json({
        error : console.error(error)
      })
    }
  }

  async updateNote({request,params,response}){
    try {

      const note = await Note.findOrFail(params.id)
      // note.title = request.body().title;
      // note.description = request.body().description;
      await note.merge(request.body());

      if(await note.save()){
        console.log(note.updatedAt);

      }

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
    const note = await Note.find(params.id)

    response.send(note);

    } catch (error) {
      response.status(404).json({
        error : "Note "+params.id+" not found"
      })
    }
  }

  async deleteNote({params,response}){
    try {

      const note = await Note.find(params.id)
      await note?.delete();

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

