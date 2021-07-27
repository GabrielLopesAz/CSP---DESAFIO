const Knex = require("knex");
const knex = require("../database/connection")

class Telefone {
// 
async createFone(TELEFONE,FK_IDINFO){
  
  try{
    
      await knex.insert({TELEFONE:TELEFONE,FK_IDINFO:FK_IDINFO}).table('telefones')

      
     
  }catch(err){
    console.log(err)
    // return{ stats:false, err:err}
  } 
}

  async create(TELEFONE,EMAIL){
    
    try{
    
      var FK_IDINFO = await knex.select('ID').from('informacoes').where({EMAIL:EMAIL})
     let FK  =  FK_IDINFO[0]
      // let fk3 = FK.TextRow.ID
      let FK2 = Object.values(FK)
      // knex.select('ID').from('informacoes').where({EMAIL:EMAIL})
       
      console.log(TELEFONE,FK2,FK )
        await knex.insert({TELEFONE:TELEFONE,FK_IDINFO:FK2}).table('telefones')

      
    
    }catch(err){
      console.log(err)
    }
  }
  
  async findAll() {
    try {
      var result = await knex.select('*')
      .from('telefones') 
        
      return result 
       
    } catch (err) {
      console.log(err)
    }
  }
 
  async findById(ID) {
    try {
      var result = await knex.select(['*'])
      .from('telefones ') 
      .where({ID:ID});
      
      console.log('FindById:', result)

      if (result.length > 0) {
        return result[0]
      } else {
        return undefined
      }
    } catch (err) {
      console.log(err)
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
      console.log(err)
    }
  }
  
  async updateFone(ID, TELEFONE) {

    let id = await this.findById(ID)

    if (id != undefined) {


      let edit = {};
      // console.log("UPDATE INFOS :",ID, PRIMEIRONOME, ULTIMONOME, EMAIL,Informacoes.ID, Informacoes.PRIMEIRONOME, Informacoes.ULTIMONOME, Informacoes.EMAIL)
      if (TELEFONE != undefined && TELEFONE != '') {
        if (TELEFONE != Telefone.TELEFONE) {
          edit.TELEFONE = TELEFONE
        }
      }
      
      try {

        await knex.update(edit).where({ ID: ID }).table('telefones')

        return { stats: true }

      } catch (err) {
        console.log(err)
        return { stats: false, err: err }
      }

    } else {
      return { stats: false, err: "Numero não encontrado" }
    }

  }

 async update(ID,TELEFONE){
   
  var FK_IDINFO = await knex.select('ID').from('telefones').where({FK_IDINFO:ID})
      
  let FK  =  FK_IDINFO[0] 
  let FK2 = Object.values(FK)

  let id = await this.findById(FK2) 

  if(id != undefined){
    
   let edit = {};

    if(TELEFONE != undefined && TELEFONE != ''){
      
      
          edit.TELEFONE = TELEFONE 
      
    } 
    try{

      console.log("TEL MODEL:",FK2,TELEFONE)
      await knex.update(edit).where({ID:FK2}).table('telefones')
      
      return{status:true}
    
    }catch(err){
      return{status:false, err2:err}
    }

  }else{
    return {status:false, err:"Contato não encontrado"}
  }

 }

 async deleteAll(ID){
 
    try{
      console.log("HI")
      await knex.delete().where({FK_IDINFO:ID}).table('telefones')
      return{ status:true }

    }catch(err){

      return { status: false, err2: err }

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