import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebaseConfig';

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const githubProvider = new firebase.auth.GithubAuthProvider();
