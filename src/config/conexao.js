import mongoose from 'mongoose'

class DataBase {
  constructor() {
    this.mongoDataBase();
  }
  mongoDataBase() {
    mongoose.connect('mongodb://localhost/my_database', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('Conexão com o MongoDB realizada com sucesso!')
    }).catch((erro) => {
      console.log('conexão com o MongoDB não foi realizada com sucesso: ' + erro);
    });
  }
}

export default new DataBase();