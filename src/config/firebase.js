const admin = require('firebase-admin');
require("dotenv").config();  
const serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
//   storageBucket: `${serviceAccount.project_id}.appspot.com`,
  storageBucket: "gs://bookkeepingservice-007.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = bucket;
