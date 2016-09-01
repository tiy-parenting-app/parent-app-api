'use strict';

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');

Route.any('/', function * (request, response) {
  response.json({
    jsonapi: {
      version: '1.0',
    },
    data: {
    },
    meta: {
      uptime: process.uptime(),
    },
  });
});

Route.post('/users', 'UserController.store');

Route.post('/token', 'SessionController.store');

Route.get('/users/current', 'UserController.current').middleware('auth');

Route.resource('/profiles', 'ProfileController')
  .except(['create', 'edit', 'update'])
  .middleware('auth');
Route.resource('/profiles', 'ProfileController')
  .only(['update'])
  .middleware('auth');

Route.resource('/children', 'ChildController').except(['create', 'edit']).middleware('auth');

Route.resource('/users', 'UserController')
  .except(['create', 'edit']).middleware('auth');

Route.resource('/conversations', 'ConversationController')
  .except(['create', 'edit']).middleware('auth');

Route.resource('/participants', 'ParticipantController')
  .except(['create', 'edit']).middleware('auth');

Route.resource('/messages', 'MessageController')
  .except(['create', 'edit']).middleware('auth');

Route.resource('/ratings', 'RatingController')
  .except(['create', 'edit']).middleware('auth');

Route.resource('/likes', 'LikeController')
  .except(['create', 'edit']).middleware('auth');
