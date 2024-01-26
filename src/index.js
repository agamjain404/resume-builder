import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers/rootReducer';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBcCFVfte2BCy-3aZbFLGDI5IllkKQ_Fs8",
  authDomain: "resume-builder-27c5d.firebaseapp.com",
  projectId: "resume-builder-27c5d",
  storageBucket: "resume-builder-27c5d.appspot.com",
  messagingSenderId: "196439589306",
  appId: "1:196439589306:web:7bb340f4435c189f149d83"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();

// This is done to integrate thunk and redux store with firebase
// Can read through documentation and apply
const reduxStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})), reduxFirestore(firebase)));

ReactDOM.render(
  <BrowserRouter>
      <Provider store={reduxStore}>
        <ReactReduxFirebaseProvider
        firebase={firebase}
        config={firebaseConfig}
        dispatch={reduxStore.dispatch}
        createFirestoreInstance={createFirestoreInstance}>
          <App/>
        </ReactReduxFirebaseProvider>
      </Provider>
    </BrowserRouter>
,
  document.getElementById('root')
);