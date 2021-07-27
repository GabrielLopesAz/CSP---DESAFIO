const Knex = require("knex");
const knex = require("../database/connection");
const Telefones = require("./Telefone");

class Informacoes {

  async create(PRIMEIRONOME, ULTIMONOME, EMAIL) {

    try {

      await knex.insert({ PRIMEIRONOME, ULTIMONOME, EMAIL })
                .table('informacoes')



    } catch (err) {
      return{err:err}
    }
  }

  async findAll() {
    try {
      var result = await knex.raw(`
      SELECT  a.PRIMEIRONOME as 'Primeiro Nome',  
              a.ULTIMONOME as 'Ultimo Nome', 
              a.EMAIL as Email,
              t.TELEFONE as Telefone
       FROM informacoes a
       LEFT JOIN telefones t on t.FK_IDINFO = a.ID
        `)
 
      return result[0]

    } catch (err) {
      return {err: err}
    }
  }

  async findById(id) {
    try {
      var result = await knex.select('*')
        .from('informacoes')
        .where({ ID: id });

        
      if (result.length > 0) {
        return result[0]
      } else {
        return undefined
      }
    } catch (err) {
      return {err: err}
    }
  }

  async findByName(NAME) {

    try {

      var result = await knex.raw(`
      SELECT  a.PRIMEIRONOME as 'Primeiro Nome', 
              a.ULTIMONOME as 'Ultimo Nome', 
              a.EMAIL as Email,
              t.TELEFONE as Telefone 
        FROM informacoes a 
        LEFT JOIN telefones t on t.FK_IDINFO = a.ID 
        where (a.PRIMEIRONOME LIKE '${NAME}') OR (a.ULTIMONOME LIKE '${NAME}')`)    

      if (result.length > 0) {
        return result[0]
      } else {
        return false
      }

    } catch (err) {
       return {err: err}
    }

  }

  async findByEmail(EMAIL) {
    try {
      var result = await knex.raw(`
      SELECT  a.PRIMEIRONOME as 'Primeiro Nome',  
      a.ULTIMONOME 'Primeiro Nome', 
      a.EMAIL as Email,
      t.TELEFONE as Telefone
    FROM informacoes a 
    LEFT JOIN telefones t on t.FK_IDINFO = a.ID 
    where (a.EMAIL LIKE '${EMAIL}')`)

      if (result.length > 0) {
        return result[0]
      } else {
        return false
      }

    } catch (err) {
      return {err: err}
    }

  }
  async update(ID, PRIMEIRONOME, ULTIMONOME, EMAIL) {

    let id = await this.findById(ID)

    if (id != undefined) {


      let edit = {};
      // console.log("UPDATE INFOS :",ID, PRIMEIRONOME, ULTIMONOME, EMAIL,Informacoes.ID, Informacoes.PRIMEIRONOME, Informacoes.ULTIMONOME, Informacoes.EMAIL)
      if (PRIMEIRONOME != undefined && PRIMEIRONOME != '') {
        if (PRIMEIRONOME != Informacoes.PRIMEIRONOME) {
          edit.PRIMEIRONOME = PRIMEIRONOME
        }
      }
      if (ULTIMONOME != undefined && ULTIMONOME != '') {
        if (ULTIMONOME != Informacoes.ULTIMONOME) {
          edit.ULTIMONOME = ULTIMONOME
        }
      }
      if (EMAIL != undefined && EMAIL != '') {
        if (EMAIL != Informacoes.EMAIL) {
          edit.EMAIL = EMAIL
        }
      }

      try {

        await knex.update(edit).where({ ID: ID }).table('informacoes')

        return { stats: true }

      } catch (err) {
        console.log(err)
        return { stats: false, err: err }
      }

    } else {
      return { stats: false, err: "Contato não encontrado" }
    }

  }
  async delete(ID) {

    let idISTrue = await this.findById(ID)

    if (idISTrue != undefined) {
      try {

        await knex.delete().where({ ID: ID }).table('informacoes')
        return { stats: true }

      } catch (err) {

        return { status: false, err: err }

      }

    }

  }

}

module.exports = new Informacoes()