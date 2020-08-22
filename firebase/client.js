import * as firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyD8ikT-X1Yx8TA88PNNzDIkiMyzSvQekv0",
  authDomain: "devter-nextjs.firebaseapp.com",
  databaseURL: "https://devter-nextjs.firebaseio.com",
  projectId: "devter-nextjs",
  storageBucket: "devter-nextjs.appspot.com",
  messagingSenderId: "509632375041",
  appId: "1:509632375041:web:920e2ddb3c538391539300",
  measurementId: "G-B23QNMSN15",
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user)
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}
