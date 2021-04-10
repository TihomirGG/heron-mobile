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
        return this.auth.createUserWithEmailAndPassword(email, password).then(x => {
            const userData = {
                email: x.user.email,
                uid: x.user.uid,
                adress: '',
                orders: 0,
                type: 'user',
                password,
            };
            this.db
                .collection('users')
                .doc(x.user.uid)
                .set(userData)
                .then(c => {
                    console.log('success');
                });
        });
    };

    loginUser = (email, password) => {
        return new Promise((resolve, reject) =>
            this.auth
                .signInWithEmailAndPassword(email, password)
                .then(resolve)
                .catch(e => {
                    return 'Email or password is wrong';
                })
        );
    };

    logOutUser = () => {
        return new Promise((resolve, reject) => this.auth.signOut().then(resolve).catch(reject));
    };

    getCurrentUserInfo = () => {
        const uid = this.auth.currentUser.uid;
        return this.db
            .collection('users')
            .doc(uid)
            .get()
            .then(user => {
                return user.data();
            })
            .then(x => {
                return x;
            })
            .catch(x => {
                return 'NO USER';
            });
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
        const id = keyGenerator();
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
                                .doc(id)
                                .set({ color, url, title, price, quantity, type, phone, description, itemType, id })
                                .then(resolve)
                                .catch(reject);
                        });
                }
            )
        );
    };

    changePassword = async (currentPassword, newPassword) => {
        const email = this.auth.currentUser.email;
        const id = this.auth.currentUser.uid;
        console.log(email);
        const cred = firebase.auth.EmailAuthProvider.credential(email, currentPassword);
        console.log(cred);
        return this.auth.currentUser
            .reauthenticateWithCredential(cred)
            .then(x => {
                return this.auth.currentUser.updatePassword(newPassword);
            })
            .then(c => {
                this.db.collection('users').doc(id).update({ password: newPassword });
                return 'Password successfuly updated';
            })
            .catch(console.log);
    };

    getCurrentPassword = () => {
        const id = this.auth.currentUser.uid;
        return this.db
            .collection('users')
            .doc(id)
            .get()
            .then(x => {
                const { password } = x.data();
                return password;
            })
            .catch(console.log);
    };

    getSpecificItem = async id => {
        try {
            const res = await this.db.collection('items').doc(id).get();
            const data = await res.data();

            return data;
        } catch (error) {
            console.error(error);
        }
    };

    getProducts = itemType => {
        return this.db
            .collection('items')
            .where('itemType', '==', itemType)
            .get()
            .then(x => {
                if (x.empty) {
                    return [];
                }
                const items = [];
                x.forEach(item => {
                    const data = item.data();
                    items.push(data);
                });
                return items;
            })
            .catch(console.log);
    };

    getPhones = () => {
        const arr = [];
        return this.db
            .collection('phones')
            .get()
            .then(x => {
                x.forEach(item => {
                    const phone = item.data();
                    arr.push(phone);
                });
                return arr;
            })
            .catch(console.log);
    };

    getCables = () => {
        const arr = [];
        return this.db
            .collection('cables')
            .get()
            .then(x => {
                x.forEach(item => {
                    const phone = item.data();
                    arr.push(phone);
                });
                return arr;
            })
            .catch(console.log);
    };

    getProtectors = () => {
        const arr = [];
        return this.db
            .collection('protectors')
            .get()
            .then(x => {
                x.forEach(item => {
                    const phone = item.data();
                    arr.push(phone);
                });
                return arr;
            })
            .catch(console.log);
    };

    filterItems = (itemType, price, model) => {
        const arr = [];
        if (price === 'none' && model === 'none') {
            return this.getProducts(itemType);
        } else if (price !== 'none' && model === 'none') {
            return this.db
                .collection('items')
                .where('itemType', '==', itemType)
                .orderBy('price', price)
                .get()
                .then(x => {
                    x.forEach(item => {
                        const temp = item.data();
                        arr.push(temp);
                    });
                    console.log(arr);
                    return arr;
                })
                .catch(console.log);
        } else if (price == 'none' && model != 'none') {
            return this.db
                .collection('items')
                .where('itemType', '==', itemType)
                .where('model', '==', model)
                .get()
                .then(x => {
                    x.forEach(item => {
                        const temp = item.data();
                        arr.push(temp);
                    });
                    return arr;
                })
                .catch(console.log);
        } else {
            return this.db
                .collection('items')
                .where('itemType', '==', itemType)
                .orderBy('price', price)
                .where('model', '==', model)
                .get()
                .then(x => {
                    x.forEach(item => {
                        const temp = item.data();
                        arr.push(temp);
                    });
                    return arr;
                })
                .catch(console.log);
        }
    };

    addOrderItems = (userId, itemId) => {
        return this.db
            .collection('activeOrders')
            .doc()
            .set({ userId, itemId })
            .then(x => {
                return 'Successfuly added to the cart';
            })
            .catch(console.log);
    };

    cartSub = () => {
        const userId = this.auth.currentUser.uid;
        return this.db.collection('activeOrders').where('userId', '==', userId);
    };

    takeCartItemIds = () => {
        const userId = this.auth.currentUser.uid;
        return this.db
            .collection('activeOrders')
            .where('userId', '==', userId)
            .get()
            .then(items => {
                if (items.empty) return;
                const arr = [];
                items.forEach(item => {
                    const { itemId } = item.data();
                    arr.push(itemId);
                });
                return arr;
            })
            .catch(console.log);
    };

    getItemsForCart = async () => {
        try {
            const ids = await this.takeCartItemIds();
            const items = [];
            if (ids.length) {
                ids.forEach(x => {
                    const temp = this.db
                        .collection('items')
                        .doc(x)
                        .get()
                        .then(x => x.data());
                    items.push(temp);
                });

                return Promise.all([...items]).then(x => x);
            }
        } catch (err) {
            console.log(err);
        }
    };

    removeItemFromCart = async itemId => {
        const userId = this.auth.currentUser.uid;
        await this.db
            .collection('activeOrders')
            .where('userId', '==', userId)
            .where('itemId', '==', itemId)
            .limit(1)
            .get()
            .then(x => {
                x.forEach(item => {
                    this.db.collection('activeOrders').doc(item.id).delete();
                });
            });

        return await this.getItemsForCart();
    };

    updateUserAdress = adress => {
        const id = this.auth.currentUser.uid;
        this.db.collection('users').doc(id).update({ adress: adress });
    };

    buy = () => {
        const id = this.auth.currentUser.uid;
        this.db
            .collection('users')
            .doc(id)
            .get()
            .then(x => {
                const { orders } = x.data();
                const updated = Number(orders) + 1;
                this.db.collection('users').doc(id).update({ orders: updated });
            })
            .catch(console.log);
        debugger;
        console.log(id);
        return this.db
            .collection('activeOrders')
            .where('userId', '==', id)
            .get()
            .then(x => {
                x.forEach(item => {
                    this.db.collection('activeOrders').doc(item.id).delete();
                });
            });
    };
}

export default Firebase;
