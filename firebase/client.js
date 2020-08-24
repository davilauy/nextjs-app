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

const database = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    email,
    uid,
    username: displayName,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(googleProvider)
}

export const addDevit = ({ avatar, content, userId, userName }) => {
  return database.collection("devits").add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = () => {
  return database
    .collection("devits")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}
