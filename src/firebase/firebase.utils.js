import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const _0x5153 = [
  "1:241163609783:web:b17eee746948b9f6e24f32",
  "chattie-3eb7b",
  "AIzaSyBn4ZfO2hjiVTf4xg18dzWHwtIQYaDtKn8",
  "chattie-3eb7b.appspot.com",
  "https://chattie-3eb7b.firebaseio.com",
  "chattie-3eb7b.firebaseapp.com",
  "241163609783",
];
(function (_0x78e027, _0x51531a) {
  const _0x451d64 = function (_0x386fd8) {
    while (--_0x386fd8) {
      _0x78e027["push"](_0x78e027["shift"]());
    }
  };
  _0x451d64(++_0x51531a);
})(_0x5153, 0x83);
const _0x451d = function (_0x78e027, _0x51531a) {
  _0x78e027 = _0x78e027 - 0x0;
  let _0x451d64 = _0x5153[_0x78e027];
  return _0x451d64;
};
const firebaseConfig = {
  apiKey: _0x451d("0x4"),
  authDomain: _0x451d("0x0"),
  databaseURL: _0x451d("0x6"),
  projectId: _0x451d("0x3"),
  storageBucket: _0x451d("0x5"),
  messagingSenderId: _0x451d("0x1"),
  appId: _0x451d("0x2"),
  measurementId: "G-CYEEQR3P3H",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email, uid } = userAuth;
    const joined = new Date();
    try {
      await userRef.set({
        id: uid,
        verified: false,
        displayName,
        email,
        joined,
        friends: [],
        posts: [],
        profile_pic: "",
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user");
    }
  }
  return userRef;
};

export const getMemberProfiles = async () => {
  const membersRef = firestore.collection("users");
  membersRef.onSnapshot(async (snapshot) => {
    const membersArr = [];
    snapshot.docs.forEach((doc) => {
      console.log(doc);
      membersArr.push(doc);
    });

    return membersArr;
  });
};

export const updateProfile = async (userId, incomingData) => {
  const { fullName, bio, website, profile_pic } = incomingData;
  const userRef = firestore.doc(`users/${userId}`);
  const snapShot = await userRef.get();
  if (snapShot.exists) {
    try {
      await userRef.update({
        displayName: fullName,
        bio,
        website,
        profile_pic,
      });
      return userRef;
    } catch (error) {
      console.log("error updating profile", error.message);
    }
  }
};

export default firebase;
