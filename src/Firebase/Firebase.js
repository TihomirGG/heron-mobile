import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { keyGenerator } from '../Utils';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
};

class Firebase {
    constructor() {
        this.firebase = firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.storage = firebase.storage();
    }

    createUser = (email, password) => {
        this.auth
            .createUserWithEmailAndPassword(email, password)
            .then(x => {
                const userData = { email: x.user.email, uid: x.user.uid, adress: '', orders: 0, type: 'user' };
                console.log(userData);
                this.db
                    .collection('users')
                    .doc(x.user.uid)
                    .set(userData)
                    .then(c => {
                        console.log('success');
                    });
            })
            .catch(console.log);
    };

    loginUser = (email, password) => {
        return new Promise((resolve, reject) =>
            this.auth.signInWithEmailAndPassword(email, password).then(resolve).catch(reject)
        );
    };

    logOutUser = () => {
        return new Promise((resolve, reject) => this.auth.signOut().then(resolve).catch(reject));
    };

    takeCategoryTypes = category => {
        return this.db
            .collection('categories')
            .where('name', '==', category)
            .get()
            .then(x => {
                if (x.empty) throw new Error('Something went wrong');
                const arr = [];

                x.forEach(doc => {
                    arr.push(doc.data());
                });
                return arr[0];
            })
            .catch(console.log);
    };

    uploadItem = data => {
        const { color, image, title, price, quantity, type, phone, description, itemType } = data;

        const uploadTask = this.storage.ref(`images/${image.name}`).put(image);
        return new Promise((resolve, reject) =>
            uploadTask.on(
                'state_changed',
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    this.storage
                        .ref('images')
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            this.db
                                .collection('items')
                                .doc(keyGenerator())
                                .set({ color, url, title, price, quantity, type, phone, description, itemType })
                                .then(resolve)
                                .catch(reject);
                        });
                }
            )
        );
    };
}

export default Firebase;
