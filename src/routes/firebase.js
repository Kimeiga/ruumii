import {
	initializeApp
} from 'firebase/app';
import {
	getFirestore
} from 'firebase/firestore';
import {
	getAuth
} from 'firebase/auth';

const firebaseConfig = {
	// Insert Firebase Credentials here
	apiKey: 'AIzaSyBKhsmYSTVL64oXto5Q8PLLO8KDvKMPg7Y',
	authDomain: 'ruumii.firebaseapp.com',
	projectId: 'ruumii',
	storageBucket: 'ruumii.appspot.com',
	messagingSenderId: '961633016174',
	appId: '1:961633016174:web:efa6dc89aca35a1674897f',
	measurementId: 'G-559GB9CGNV'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);