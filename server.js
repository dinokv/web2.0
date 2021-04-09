const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {save_user_information} = require('./models/server_db');
const path = require('path');
const publicPath = path.join(__dirname, './public');
const paypal = require('paypal-rest-sdk');

// handling all the parsing */
app.use(bodyParser.json());
app.use(express.static(publicPath));

// paypal configuration //
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AdLLYUYKz8MF7i8oQcA83FldmMByjSgtzn_1yvhvosSa0jXfdBvx1FAPrBYA34Ysfjk_1Nm7QRm6sdX9',
  'client_secret': 'EB7mqKS1PmiVuwrIuOT5whgv29_q5wDfP2-l4cjzAssUNSgQC4M2FW_F8PS3_qyLkMSqCtyGRsTn-wHO'
});

app.post('/post_info', async (req,res)=>{
  var email = req.body.email;
  var amount = req.body.amount;

  if(amount <= 1){
    return_info = {};
    return_info.error = true;
    return_info.message = "The amount should be greater than 1";
    return res.send(return_info);
  }
  var result = await save_user_information({"amount" : amount, "email" : email});
  res.send(result);
});

app.get('/get_total_amount', async (req,res)=>{
  var result = await get_total_amount();
  res.send(result);
});

app.listen(3000,()=>{
  console.log('server is running on port 3000');
});
