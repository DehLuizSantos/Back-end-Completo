/* const { Router } = require("express"); */
import { Router} from 'express';
import mongoose from 'mongoose';
import User from './app/models/User'; //conexão do mongo DB (com a pasta USER)

import UserController from './app/controler/UserController';
import LoginController from './app/controler/LoginController';

const routes = new Router();


routes.post('/user', UserController.store);
routes.post('/login', LoginController.store)


routes.get('/contatos',  (req, res)=>{
  res.send('Cesar, Kelly')
})

/* module.exports = routes; */
export default routes;