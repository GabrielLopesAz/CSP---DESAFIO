const knex = require('./connection')

knex.schema.hasTable('informacoes').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('informacoes', function(t) {
      t.increments('ID').primary();
      t.string('PRIMEIRONOME', 20);
      t.string('ULTIMONOME', 20);
      t.unique('EMAIL',50);
    });
  }
});

knex.schema.hasTable('telefones').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('telefones', function(t) {
      t.increments('ID').primary();
      t.string('TELEFONE', 20);
      t.foreign('FK_IDINFO', 20).references('informacoes.ID').deferrable('deferred') 
    });
  }
});

module.exports= knex;