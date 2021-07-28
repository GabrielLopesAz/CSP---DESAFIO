const knex = require("../database/connection")
const Informacoes = require("../models/Informacoes")
const Telefones = require("../models/Telefone")

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
   
    let fieldValidation = false

    if (PRIMEIRONOME == undefined || PRIMEIRONOME == "" || PRIMEIRONOME == " ") {
      res.status(400).json({ err: "Primeiro nome não inserido" })
    } else if (ULTIMONOME == undefined || ULTIMONOME == "" || ULTIMONOME == " ") {
      res.status(400).json({ err: "Ultimo nome não inserido" })
    } else if (EMAIL == undefined || EMAIL == "" || EMAIL == " ") {
      res.status(400).json({ err: "Email não inserido" })
    } else if (TELEFONE == undefined || TELEFONE == "" || TELEFONE == " ") {
      res.status(400).json({ err: "Telefone não inserido" })
    } else {

      var result = await Telefones.findByPhone(TELEFONE)

      if (result.status) {
        res.status(400).json({ err: "Telefone já cadastrado" })

      } else {
        fieldValidation = true
      }
    }

    if (fieldValidation) {

      await Informacoes.create(PRIMEIRONOME, ULTIMONOME, EMAIL)

      await Telefones.create(TELEFONE)

      res.status(200).json({ res: "Dados Inserido com sucesso" })

    }


  }



  async update(req, res) {

    var { ID, PRIMEIRONOME, ULTIMONOME, EMAIL, TELEFONE } = req.body;
 
    if (ID != undefined && ID > 0) {

      var resultPhone = await Telefones.update(ID, TELEFONE)

      var resultInfos = await Informacoes.update(ID, PRIMEIRONOME, ULTIMONOME, EMAIL, TELEFONE)

       if (resultInfos.stats && resultPhone.status) {

        res.status(200).json({ msg: "Dados atualizados com sucesso" });

      } else if (resultPhone.status == false) {
        res.status(406).json({ err: 'Informações invalidas para atualizar' })
      } else {
        res.status(406).json({ err: 'Telefone invalido para atualizar' })
      }
      
    } else {
      res.status(406).json({ err: "Erro ao editar" })
    }

  }
 
  async delete(req, res) {

    var ID = req.body.ID; 

    var resultInfos = await Informacoes.delete(ID)
   
    var resultPhone = await Telefones.deleteAll(ID)


    if (resultInfos.stats && results.status) {
      res.status(200).json({ msg: "Dados excluidos com sucesso" })
    } else if (resultPhone.status === false) {
      res.status(406).json({ msg: err })
    } else {
      res.status(406).json({ msg: err })
    }

  }

}

module.exports = new InfosController()
