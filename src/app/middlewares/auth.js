import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import configAuth from '../../config/auth';

export default async(req, res, next) =>{ //valida para saber se o usuário 
  const authHeader = req.headers.authorization;//tem ou não acesso a requisição

  if(!authHeader){
    return res.status(401).json({ //caso o token esteja errado
      error: true,
      code: 130,
      message: "Erro: token não encontrado!"
    })
  }

  const [, token] = authHeader.split(' '); //explita o bearer, e só apresenta o token

  try{
    const decoded = await promisify(jwt.verify)(token, configAuth.secret); //valida o token    

    req.userId = decoded.id;

    return next();
 
  }catch(err){  //caso o token seja invalido
    return res.status(401).json({
      error: true,
      code: 130,
      message: "token inválido!"
    })
  }  
}