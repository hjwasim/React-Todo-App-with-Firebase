This project was bootstrapped with ReactJs and Firbase Realtime Database.

In the project directory, you can run:
First You have to Install Firebase Dependency by typing this command

### `npm i firebase`


### Connect Your Own Firebase API to this project.

Go to Firebase and Get your API

Create a Js file named -- fireb.js

and Put Your API or Paste like below!
## import firebase from "firebase";

 var firebaseConfig = {
   apiKey: "######################",
  authDomain: "#######################",
  databaseURL: "########################",
  projectId: "#################",
  storageBucket: "#######################",
  messagingSenderId: "###################",
  appId: "############################",
  measurementId: "###########",
};
const fireb = firebase.initializeApp(firebaseConfig);


## export default fireb;


### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

ENJOY <3