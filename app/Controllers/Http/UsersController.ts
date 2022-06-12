// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";
import UserValidator from "App/Validators/UserValidator";
import bcrypt = require('bcrypt')

export default class UsersController {

  async signup({request,response}){
    try {
      const newUser =await request.validate(UserValidator);
      console.log(newUser);

      await User.create(newUser);
      response.send(newUser);
    } catch (error) {
      response.send(error)
      console.log(error);

    }
  }

  async login({request,response}){
    try {

      const {uiid,password} = request.only(['uiid','password'])
      //
      const data = (await Database.table('users')).values()
      let user,hashPass;
      while(user = data.next().value){
        if(user.email == uiid || user.username == uiid){
          hashPass = user.password;
          break;
        }
      }

      if(user!=undefined){

        const match = await bcrypt.compare(password,hashPass);
        if(match){
          console.log("connected");
          response.send({
            messge: "User connected"
          })
        }else{
          response.status(404).json({
            message: 'paswword incorrect'
          })
        }

      }else{
        response.status(404).json({
          message: "username, email not found"
        })
      }


    } catch (error) {
      console.log(error);
      response.status(400).json({
        error : error
      })

    }
  }

}
