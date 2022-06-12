import Route from '@ioc:Adonis/Core/Route'



Route.post('/signup','UsersController.signup')

Route.post('/login','UsersController.login');
