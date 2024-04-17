import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';
// import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: "hellbilling3.firebaseapp.com",
	projectId: "hellbilling3",
	storageBucket: "hellbilling3.appspot.com",
	messagingSenderId: "929544538371",
	appId: "1:929544538371:web:6f17ef132fb3a0cf3d4136"
	// databaseURL: "https://hellbilling1-default-rtdb.europe-west1.firebasedatabase.app", toto nie je vygenerovane
};

const app = initializeApp(firebaseConfig);
// export const db = getDatabase();
export const auth = getAuth(app);
// export const functionsFB = getFunctions(app);

// kontrola stavu prihlasenia
onAuthStateChanged(auth, (user) => {
	if (user) {
		// const uid = user.uid;
		alert('User is signed in');
	} else {
		alert('User is signed out');
	}
});