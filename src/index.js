import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Firebase, { FirebaseContext } from './Firebase';

const fireBaseInstance = new Firebase();
let app = null;

fireBaseInstance.auth.onAuthStateChanged(() => {
    if (!app) {
        app = ReactDOM.render(
            <React.StrictMode>
                <FirebaseContext.Provider value={fireBaseInstance}>
                    <App />
                </FirebaseContext.Provider>
            </React.StrictMode>,
            document.getElementById('root')
        );
    }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
