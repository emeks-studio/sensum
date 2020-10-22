'use strict';

/* Config */
const config = {};
config.serverRoute  = 'https://sensum-server.herokuapp.com/api';
//config.serverRoute = 'http://192.168.0.202:3000/api';

/* Auxiliar methods */
const parseResponse = function(response) {
  return response.json();
};

const handleApiErrors = function(responseJson) {
  if (responseJson && responseJson.error) {
    console.debug('[API] Error', responseJson.error.name, responseJson.error.params);
    throw new Error(responseJson.error.name);
  }
  return Promise.resolve(responseJson);
};

const parseAndHandle = response => parseResponse(response).then(handleApiErrors);

/* API methods */
const user = {};

user.registerPushNotificationId = (pushNotificationId) => {
  return fetch(`${config.serverRoute}/users/registerUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'pushNotificationId': pushNotificationId
    })
  }).then(parseAndHandle);
};

user.gatherAcolytes = () => {
  return fetch(`${config.serverRoute}/users/gatherAcolytes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(parseAndHandle);
};

const sensations = {};

sensations.praiseTheSun = () => {
  return fetch(`${config.serverRoute}/sensations/praiseTheSun`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(parseAndHandle);
};

sensations.newSensation = ({ message, author, totem }) => {
  return fetch(`${config.serverRoute}/sensations/newSensation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      author,
      totem
    })
  }).then(parseAndHandle);
};

sensations.getSensations = ({offset, limit}) => {
  return fetch(`${config.serverRoute}/sensations/letThemFLow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      offset,
      limit
    })
  }).then(parseAndHandle);
};

sensations.chargeSensation = ({pushNotificationId, sensationId, vote}) => {
  return fetch(`${config.serverRoute}/sensations/chargeSensation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pushNotificationId,
      sensationId,
      vote,
    })
  }).then(parseAndHandle);
};

const oracle = {};

oracle.rightInTheFeels = () => {
  return fetch(`${config.serverRoute}/oracle/rightInTheFeels`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(parseAndHandle);
};

oracle.lorewalker = ({chapter}) => {
  return fetch(`${config.serverRoute}/oracle/lorewalker`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chapter,
    })
  }).then(parseAndHandle);
}

const SensumApi = {
  config,
  user,
  sensations,
  oracle
};

export default SensumApi;
