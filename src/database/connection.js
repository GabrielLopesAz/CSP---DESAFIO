var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '1234',
      database:'cps'
    }
  });   

  knex.schema.hasTable('informacoes').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('cps.informacoes', function(t) {
        t.increments('ID').primary();
        t.string('PRIMEIRONOME', 20);
        t.string('ULTIMONOME', 20);
        t.string('EMAIL', 50);
        t.unique('EMAIL');
      });
    }
  });
  
  knex.schema.hasTable('telefones').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('cps.telefones', function(t) {
        t.increments('ID').primary();
        t.string('TELEFONE', 20);
        t.integer('FK_IDINFO', 10).unsigned() 
        t.foreign('FK_IDINFO').references('informacoes.ID')  
      });
    }
  }); 


module.exports = knex