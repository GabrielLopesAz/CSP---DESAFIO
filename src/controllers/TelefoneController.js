const knex = require("../database/connection")
const Telefones = require("../models/Telefone")

class TelefonesController {

  async index(req, res) {
    var info = await Telefones.findAll()
    res.json(info)
  }

  async create(req, res) {
    var { TELEFONE, FK_IDINFO } = req.body;
    console.log(TELEFONE, FK_IDINFO)

    if (TELEFONE == undefined || TELEFONE == "" || TELEFONE == " ") {
      res.status(400).json({ err: "Informações invalidas" })
    } else if (FK_IDINFO == undefined || FK_IDINFO == "" || FK_IDINFO == " ") {
      res.status(400).json({ err: "Informações invalidas" })
    }
    await Telefones.create(TELEFONE, FK_IDINFO)

    res.status(200).json({ res: "Dados Inserido com sucesso" })

  }


  async createFone(req, res) {
    var { TELEFONE, FK_IDINFO } = req.body;
    console.log(TELEFONE, FK_IDINFO)
    let fieldValidation = false
    if (TELEFONE == undefined || TELEFONE == "" || TELEFONE == " ") {
      res.status(400).json({ err: "Informações invalidas" })
    } else if (FK_IDINFO == undefined || FK_IDINFO == "" || FK_IDINFO == " ") {
      res.status(400).json({ err: "Informações invalidas" })
    } else {
      var result = await Telefones.findByPhone(TELEFONE)
       
      if(result.status){ 
        res.status(400).json({ err: "Contato ja cadastrado" })
       
    }else{
      fieldValidation = true
     }
    }

    if (fieldValidation) {

       await Telefones.createFone(TELEFONE, FK_IDINFO)

        res.status(200).json({ res: "Dados Inserido com sucesso" })

    }
  }




  async update(req, res) {

    var { ID, TELEFONE, FK_IDINFO } = req.body;

    if (ID != undefined && ID > 0) {

      
      var result = await Telefones.update(ID, TELEFONE, FK_IDINFO)

      console.log(result)

      if (result.stats) {

        res.status(200).json({ msg: "Dados atualizados com sucesso" });

      } else {
        res.status(406).json({ err: err })
      }

    } else {
      res.status(406).json({ err: "Erro ao editar" })
    }

  }


  async updateFone(req, res) {

    var { ID, TELEFONE, FK_IDINFO } = req.body;

    if (ID != undefined && ID > 0) {

      var exists =  await Telefones.findByPhone(TELEFONE)
      if(exists.status){ 
        res.status(400).json({ err: "Contato ja cadastrado" })
       
    }else{

      var result = await Telefones.updateFone(ID, TELEFONE, FK_IDINFO)

      console.log(result)

      if (result.stats) {

        res.status(200).json({ msg: "Dados atualizados com sucesso" });

      } else {
        res.status(406).json({ err: err })
      }
    }
    } else {
      res.status(406).json({ err: "Erro ao editar" })
    }
  
  }

  async delete(req, res) {

    var ID = req.body.ID;

    console.log("Controller: ", ID)

    var result = await Telefones.delete(ID)

    if (result.stats) {
      res.status(200).json({ msg: "Dados excluidos com sucesso" })

    } else {
      res.status(406).json({ msg: err })
    }

  }
  

}

module.exports = new TelefonesController()