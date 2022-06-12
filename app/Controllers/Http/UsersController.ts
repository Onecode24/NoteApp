// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import UserValidator from "App/Validators/UserValidator";

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

  async login({request,auth}){
    try {

      const {uiid,password} = request.only(['uiid','password'])

      await auth.attempt(uiid,password);

    } catch (error) {
      console.log(error);

    }
  }

}
