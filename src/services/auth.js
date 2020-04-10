import { auth } from './firebase';
import { notification } from 'antd';


// both return promises
export function logIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}

export function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
}

export function sendPasswordReset(email) {
    return auth.sendPasswordResetEmail(email);
}

export function showNotification(type, message, description, duration) {
    notification[type]({
      message,
      description,
      duration
    });
  
}