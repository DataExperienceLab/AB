var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
 MotorAddress  = MotorLedgerInstance.MotorList("0x1eea5236ea7c0b1bff65e9e1eea1ebd9f89485f49d04cf2e5984027a0d0a60c5")
console.log(MotorAddress)


//web3.net.peerCount //verify that the node is connnected to at least 1 peer, if not: panic
//web3.eth.syncing // if result = "false" we are good to go; if not: you can still make the calls but the blockchain won't be up to date

  res.render('home.ejs',  {title: MotorAddress});
});
/*
app.get('/etage/:etagenum/chambre', function(req, res) {
    res.render('chambre.ejs', {etage: req.params.etagenum});
});
*/
module.exports = router;
