import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBWabCfHAeE2Oed6dTjjWwRVe4TC18m_aU",
    authDomain: "slacker-1b8c9.firebaseapp.com",
    databaseURL: "https://slacker-1b8c9.firebaseio.com",
    projectId: "slacker-1b8c9",
    storageBucket: "slacker-1b8c9.appspot.com",
    messagingSenderId: "560142945744"
  };
firebase.initializeApp(config);
var database = firebase.database();

const ReservedRefNameChars = /[\.#\$\[\]]/g

const escapeKey = (name) =>
  name.replace(ReservedRefNameChars, '_')

const escapeValue = (rawValue) => {
  const value = (rawValue && typeof rawValue.toJSON === 'function')
    ? rawValue.toJSON()
    : rawValue

  if (value == null)
    return null // Remove undefined values

  if (Array.isArray(value))
    return value.map(escapeValue)

  if (typeof value === 'object') {
    return Object.keys(value).reduce((memo, key) => {
      memo[escapeKey(key)] = escapeValue(value[key])
      return memo
    }, {})
  }

  return value
}

// const BaseRef = new Firebase('https://slacker-1b8c9.firebaseio.com')
const MessagesRef = database.ref('messages')

let serverTimeOffset = 0
database.ref('.info/serverTimeOffset').on('value', function (snapshot) {
  serverTimeOffset = snapshot.val()
})

const saveAuth = (auth) =>
  database.ref('users/' + auth.uid).set(escapeValue(auth))

var provider = new firebase.auth.GithubAuthProvider();


export const login = (callback) => {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      saveAuth(user);
      callback(null, user);
      // ...
    } else {
      firebase.auth().signInWithPopup(provider)
        .then(function(auth) {
          console.log(auth);
          if (auth)
            saveAuth(auth.user)
            callback(null, auth.user)
        }).catch(function(error) {
          console.log(error);
          callback(error, null)
        });
    }
  });
}

export const sendMessage = (uid, username, avatarURL, text) => {
  MessagesRef.push({
    uid,
    timestamp: Date.now() + serverTimeOffset,
    username,
    avatarURL,
    text
  })
}

export const subscribeToMessages = (callback) => {
  function handleValue(snapshot) {
    const messages = []

    snapshot.forEach(function (s) {
      const message = s.val()
      message._key = s.key
      messages.push(message)
    })

    callback(messages)
  }

  MessagesRef.on('value', handleValue)

  return function () {
    MessagesRef.off('value', handleValue)
  }
}
