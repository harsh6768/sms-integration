const Router=require('express').Router();

const twilioController=require('../controllers/twilio-controller');
const msg91Controller=require('../controllers/msg91-controller');

//twilio
Router.route('/get_twilio_keys').get(twilioController.getTwilioKeys);
Router.route('/send_sms_by_twilio').post(twilioController.sendSmsByTwilio);

//msg91
Router.route('/get_msg91_keys').get(msg91Controller.getMsg91Keys);
Router.route('/send_otp_by_msg91').post(msg91Controller.sendOtpByMSG91);
Router.route('/retry_send_otp_by_msg91').post(msg91Controller.retrySendOtpByMsg91);
Router.route('/verify_otp_by_msg91').post(msg91Controller.verifyOtpByMsg91);


module.exports=Router;