var express = require("express")
var app = express();
var router = express.Router();
var InfosController = require("../controllers/infosController");
var TelefonesController = require("../controllers/TelefoneController")

router.get('/contato',InfosController.index);
router.get('/contato/nome',InfosController.indexName); 
router.get('/contato/email',InfosController.indexEmail);
router.post('/contato',InfosController.create);
router.put('/contato',InfosController.update);
router.delete('/contato',InfosController.delete);


router.get('/telefone',TelefonesController.index);
router.post('/telefone',TelefonesController.createFone);
router.put('/telefone',TelefonesController.updateFone);
router.delete('/telefone',TelefonesController.delete);
  

module.exports = router;