const Knex = require("knex");
const knex = require("../database/connection")

class Telefone {
 
async createFone(TELEFONE,FK_IDINFO){
  
  try{
    
      await knex.insert({TELEFONE:TELEFONE,FK_IDINFO:FK_IDINFO}).table('telefones')

      
     
  }catch(err){
    return { err:err} 
  } 
}

  async create(TELEFONE ){
    
    try{
    
      let getRow = await knex.select('ID').from('telefones').where({FK_IDINFO:ID})
      
      let getID  =  getRow[0] 
      let FK_IDINFO = Object.values(getID) 

        await knex.insert({TELEFONE:TELEFONE,FK_IDINFO:FK_IDINFO}).table('telefones')
    
    }catch(err){
      return { err:err}
    }
  }
  
  async findAll() {
    try {

      var result = await knex.select('*')
      .from('telefones') 
        
      return result 
       
    } catch (err) {
      return { err:err}
    }
  }
 
  async findById(ID) {
    try {
      var result = await knex.select(['*'])
      .from('telefones ') 
      .where({ID:ID});
      

      if (result.length > 0) {
        return result[0]
      } else {
        return undefined
      }
    } catch (err) {
      return { err:err}
    }
  }

  
  async findByPhone(TELEFONE) {
    try {
      var result = await knex.select('*')
      .from('telefones ') 
      .where({TELEFONE:TELEFONE});
       
      if (result.length > 0) {
        return{ status : true}
      } else {
        return { status :false}
      }
    } catch (err) {
      return { err:err}
    }
  }
  
  async updateFone(ID, TELEFONE) {

    let id = await this.findById(ID)

    if (id != undefined) {


      let edit = {};
        if (TELEFONE != undefined && TELEFONE != '') {
        if (TELEFONE != Telefone.TELEFONE) {
          edit.TELEFONE = TELEFONE
        }
      }
      
      try {

        await knex.update(edit).where({ ID: ID }).table('telefones')

        return { stats: true }

      } catch (err) { 
        return { stats: false, err: err }
      }

    } else {
      return { stats: false, err: "Numero não encontrado" }
    }

  }

 async update(ID,TELEFONE){
   
  let getRow = await knex.select('ID').from('telefones').where({FK_IDINFO:ID})
      
  let getID  =  getRow[0] 
  let FK_IDINFO = Object.values(getID)

  let id = await this.findById(FK_IDINFO) 

  if(id != undefined){
    
   let edit = {};

    if(TELEFONE != undefined && TELEFONE != ''){
      
      
          edit.TELEFONE = TELEFONE 
      
    } 
    try{ 

      await knex.update(edit).where({ID:FK2}).table('telefones')
      
      return{status:true}
    
    }catch(err){
      return{status:false, err:err}
    }

  }else{
    return {status:false, err:"Contato não encontrado"}
  }

 }

 async deleteAll(ID){
 
    try{ 

      await knex.delete().where({FK_IDINFO:ID}).table('telefones')
      return{ status:true }

    }catch(err){

      return { status: false, err: err }

    }

  }
 
 
 async delete(ID){

  var idIsTrue = await this.findById(ID)

  if(idIsTrue != undefined){
    try{
      await knex.delete().where({ID:ID}).table("telefones")
      return {stats: true,msg:"Contato excluido com sucesso"}
    }catch(err){
      return {stats:false, err:err}
    }
  }


}


}

module.exports = new Telefone()
