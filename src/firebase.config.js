import { getApp, getApps, initializeApp} from 'firebase/app'
import { getFirestore} from 'firebase/firestore'
import { getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAb0QvrjtYZJgQmrn6z2ZWsW6ch1QaPYJU",
  authDomain: "food-60b3b.firebaseapp.com",
  databaseURL: "https://food-60b3b-default-rtdb.firebaseio.com",
  projectId: "food-60b3b",
  storageBucket: "food-60b3b.appspot.com",
  messagingSenderId: "766372111364",
  appId: "1:766372111364:web:8fa728c12d1f178c6e8151",
};

const app = getApps.length > 0? getApp : initializeApp(firebaseConfig);
const firestore =getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage}