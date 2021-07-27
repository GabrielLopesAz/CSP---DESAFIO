const knex = require("../database/connection")
const Informacoes = require("../models/Informacoes")
const Telefone = require("../models/Telefone")

class InfosController {

  async index(req, res) {
    var infos = await Informacoes.findAll()
    res.json(infos)
  }

  async indexName(req, res) {
    var NAME = req.body.NOME;
    var nameOne = await Informacoes.findByName(NAME)
 
    if (nameOne == undefined) {
      res.status(404).json({})
    } else {
      res.json(nameOne)
    }
  }

  async indexEmail(req, res) {
    var EMAIL = req.body.EMAIL;
    var emailOne = await Informacoes.findByEmail(EMAIL)
    if (emailOne == undefined) {
      res.status(404).json({})
    } else {
      res.json(emailOne)
    }
  }


  async create(req, res) {
    var { PRIMEIRONOME, ULTIMONOME, TELEFONE, EMAIL } = req.body;
    console.log(  PRIMEIRONOME, ULTIMONOME, TELEFONE, EMAIL  )
    
    let fieldValidation = false

    if (PRIMEIRONOME == undefined || PRIMEIRONOME == "" || PRIMEIRONOME == " ") {
      res.status(400).json({ err: "Informações invalidas" })
    }else if (ULTIMONOME == undefined || ULTIMONOME == "" || ULTIMONOME == " ") {
      res.status(400).json({ err: "Informações invalidas" })
       }   else if (EMAIL == undefined || EMAIL == "" || EMAIL == " ") {
        res.status(400).json({ err: "Informações invalidas"})
         }  else  if (TELEFONE == undefined || TELEFONE == "" || TELEFONE == " ") {
            res.status(400).json({ err: "Informações invalidas" })
          }else{
            fieldValidation = true
          }
        
          if(fieldValidation){
            await Informacoes.create(PRIMEIRONOME, ULTIMONOME, EMAIL)

            await Telefone.create(TELEFONE,EMAIL)
      
            res.status(200).json({ res: "Dados Inserido com sucesso" })
      
          }

    
    }



    async update(req, res){

      var { ID, PRIMEIRONOME, ULTIMONOME, EMAIL ,TELEFONE} = req.body;
      
      console.log( ID, PRIMEIRONOME, ULTIMONOME, EMAIL ,TELEFONE)
      if (ID != undefined && ID > 0) {

        var results = await Telefone.update(ID,TELEFONE)

        var result = await Informacoes.update(ID, PRIMEIRONOME, ULTIMONOME, EMAIL,TELEFONE)

        console.log(result,results)

        if (result.stats && results.status) {

          res.status(200).json({ msg: "Dados atualizados com sucesso" });
          
        } else if (results.status === false){
          res.status(406).json({ err2: err })
        }else{
          res.status(406).json({ err: err })
        }

      } else {
        res.status(406).json({ err: "Erro ao editar" })
      }

    }

    async delete (req, res){

      var ID = req.body.ID;
      console.log("Controller: ", ID)

      var result = await Informacoes.delete(ID)
      var results = await Telefone.deleteAll(ID)


      if (result.stats && results.status) {
        res.status(200).json({ msg: "Dados excluidos com sucesso" })
      } else if(results.status === false) {
        res.status(406).json({ msg: err2 })
      }else{
        res.status(406).json({ msg: err })
      }

    }

  }

module.exports = new InfosController()