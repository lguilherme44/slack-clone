import firebase from './firebase'
import md5 from 'md5'
class FirebaseService {
  constructor() {
    this.channelsRef = firebase.database().ref('channels')
    this.messagesRef = firebase.database().ref('messages')
    this.storageRef = firebase.storage().ref()
    this.usersRef = firebase.database().ref('users')
  }

  async addChannel(key, newChannel) {
    await this.channelsRef.child(key).update(newChannel)
  }

  async createUser(email, password, username) {
    const createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    await createdUser.user.updateProfile({
      displayName: username,
      photoURL: `http://gravatar.com/avatar/${md5(
        createdUser.user.email
      )}?d=identicon`,
    })
    await this.saveUser(createdUser)
    console.log('user saved')
  }

  createMessage(currentUser, message, fileURL = null) {
    const newMessage = {
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    }
    if (fileURL !== null) {
      newMessage['image'] = fileURL
    } else {
      newMessage['content'] = message
    }
    return newMessage
  }

  getTimeStamp() {
    return firebase.database.ServerValue.TIMESTAMP
  }

  async saveUser(createdUser) {
    await this.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    })
  }

  async sendMessage(currentChannel, currentUser, message) {
    await this.messagesRef
      .child(currentChannel.id)
      .push()
      .set(this.createMessage(currentUser, message))
  }

  async signIn(email, password) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
  }

  async signOut() {
    await firebase.auth().signOut()
  }
}
export default new FirebaseService()
