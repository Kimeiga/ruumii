import {
	initializeApp
} from 'firebase/app';
import {
	getFirestore
} from 'firebase/firestore';
import {
	getAuth,
	GoogleAuthProvider,
	EmailAuthProvider,
	PhoneAuthProvider
} from 'firebase/auth';

// Initialize Firebase
const app = initializeApp({
	apiKey: 'AIzaSyBKhsmYSTVL64oXto5Q8PLLO8KDvKMPg7Y',
	authDomain: 'ruumii.firebaseapp.com',
	projectId: 'ruumii',
	storageBucket: 'ruumii.appspot.com',
	messagingSenderId: '961633016174',
	appId: '1:961633016174:web:efa6dc89aca35a1674897f',
	measurementId: 'G-559GB9CGNV'
});
export const firestore = getFirestore(app);
export const auth = getAuth(app);

export const firebaseConfig = {
	apiKey: 'AIzaSyBKhsmYSTVL64oXto5Q8PLLO8KDvKMPg7Y',
	authDomain: 'ruumii.firebaseapp.com',
	projectId: 'ruumii',
	storageBucket: 'ruumii.appspot.com',
	messagingSenderId: '961633016174',
	appId: '1:961633016174:web:efa6dc89aca35a1674897f',
	measurementId: 'G-559GB9CGNV'
};