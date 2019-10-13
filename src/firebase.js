import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: 'AIzaSyApvSPBsUId8lhk54RowE-E_wnnx7lOiFk',
  authDomain: 'slack-slone.firebaseapp.com',
  databaseURL: 'https://slack-slone.firebaseio.com',
  projectId: 'slack-slone',
  storageBucket: 'slack-slone.appspot.com',
  messagingSenderId: '727328735492',
  appId: '1:727328735492:web:cdb4ba80a0d6eaa19a5051',
  measurementId: 'G-5H0M7PSDCT',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase
