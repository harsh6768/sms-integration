const Router=require('express').Router();

const twilioController=require('../controllers/twilio-controller');

Router.route('/get_twilio_keys').get(twilioController.getTwilioKeys);
Router.route('/send_sms_by_twilio').post(twilioController.sendSmsByTwilio);


module.exports=Router;