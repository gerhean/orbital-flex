
/*
// brings all the modules we need
const algoliasearch = require('algoliasearch')
const dotenv = require('dotenv')
const firebase = require('firebase');
const firestore = require('firebase/firestore');

// load values from the .env file in this directory into process.env
dotenv.config();
// initializes the firebase database.
firebase.initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL
})
const db = firebase.firestore();
// configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

var docRef = db.collection(process.env.ALGOLIA_INDEX_NAME);
const records = [];

db.collection(process.env.ALGOLIA_INDEX_NAME).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            // get the key and data from the snapshot
            const childKey = doc.id;
            const childData = doc.data();
            // We set the Algolia objectID as the Firebase .key
            childData.objectID = childKey;
            // Add object for indexing
            records.push(childData);
            console.log(doc.id, '=>', doc.data());
        });
        // Add or update new objects
        index.saveObjects(records).then(() => {
            console.log('Documents imported into Algolia');
            process.exit(0);
        })
        .catch(error => {
            console.error('Error when importing documents into Algolia', error);
            process.exit(1);
        });
    })
    .catch((err) => {
        console.error('Error getting documents', error);
    });

*/