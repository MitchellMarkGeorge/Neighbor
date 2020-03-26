import { auth } from './firebase';

// both return promises
export function logIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}

export function signUp (email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
}