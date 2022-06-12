const bcrypt = require('bcrypt');
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'



export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({serializeAs: null})
  public password: string

  @beforeSave()
  public static async hashPassword(user: User){
    if(user.$dirty.password) {
      user.password = await bcrypt.hash(user.password,10);
    }
  }
}
