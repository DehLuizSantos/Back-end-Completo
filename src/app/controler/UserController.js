import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';


class UserController {
  async store(req, res){

    const schema = Yup.object().shape({ //requerimentos pela yup
      name: Yup.string() //name
          .required(),

      email: Yup.string()//e-mail
          .required(),

      password: Yup.string()//password
          .required()
          .min(6)
    });

    if(!(await schema.isValid(req.body))){//caso não sejam dados validos
      return res.status(400).json({
        error:true,
        code: 103,
        message: "Erro, dados invalidos!"
      });
    }

    const emailExiste = await User.findOne({email: req.body.email});
    if(emailExiste){//caso o e-mail já exista
      return res.status(400).json({
        error:true,
        code: 102,
        message: "Erro, este email já está cadastrado!"
      });
    }

    var dados = req.body;//criptografando o passoword
    dados.password = await bcrypt.hash(dados.password, 7); //nivel de criptografia
    

  
    const user = await User.create(dados, (err)=>{ //caso já tenha algo errado
      if(err) return res.status(400).json({
        error:true,
        code: 101,
        message: "Erro, usuário não cadastrado com sucesso!"
      });
      return res.status(200).json({//caso esteja certo
        error:false,
        message: "Usuario cadastrado com sucesso", 
        dados: user
      })
    });
    
  }
}

export default new UserController();