import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
	apiKey: "AIzaSyB8AXo6D4Vq4MKetOc5s4psrHwjF87F15A",
	authDomain: "hellbilling1.firebaseapp.com",
	databaseURL: "https://hellbilling1-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "hellbilling1",
	storageBucket: "hellbilling1.appspot.com",
	messagingSenderId: "76635219533",
	appId: "1:76635219533:web:dc0d0f6efa9278424d1e04"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const auth = getAuth(app);
export const functionsFB = getFunctions(app);

// kontrola stavu prihlasenia
onAuthStateChanged(auth, (user) => {
	if (user) {
		// const uid = user.uid;
		//alert('User is signed in');
	} else {
		//alert('User is signed out');
	}
});