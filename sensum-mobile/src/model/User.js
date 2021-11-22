'use strict';

import SensumApi from '../api/SensumApi';

const User = { id: null };

User.tryRegisterPushNotificationId = async function(deviceInfo) {
  // ex: { "pushToken": null, "userId": "679ab17f-e96f-4546-a4f6-f1a6c7616528" }
  console.debug('[User.registerPushNotificationId] OneSignal device info:', JSON.stringify(deviceInfo));
  User.id = deviceInfo.userId;
  try {
    await SensumApi.user.registerPushNotificationId(User.id);
    return true;
  } catch (error) {
    console.debug('[User.setPushNotificationId] Warning: Push notificaion id cannot be saved', error);
    return false;
  }
};

User.tryGatherAcolytes = async function(){
  try{
    console.debug('[User.gatherAcolytes] Retrieving number of electrons');
    return await SensumApi.user.gatherAcolytes();
  } catch (error){
    console.debug('[User.gatherAcolytes] Warning: Could not reach endpoint or server error.', error);
    return '';
  }
};

export default User;
