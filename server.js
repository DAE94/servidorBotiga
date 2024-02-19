const express = require('express');
const cors=require('cors');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
var jp = require('jsonpath');


const serviceAccount = require('./botigaonline-dam-firebase-adminsdk-fkr0g-fda07391af.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const app = express();

app.use(express.json());
app.use(cors());

port = 3080;

app.listen(port, ()=> {
    console.log(`server escoltant el port : ${port}`);
});

// app.get('/exemple', (req,res) => {
//     const client = { name: "david", email:"david.alcaraz@institutvidreres.cat"}
//     res.json(client);
//     console.log('Nom: '+client.name+' || Email: '+client.email);
// });

// app.get('/exemple', async (req, res) => {
//     const starwarsRef = db.collection('test').doc('gettest');
//     const doc = await starwarsRef.get();
//     if (!doc.exists) {
//         console.log('No such document!');
//     } else {
//         console.log('Document data:', doc.data());
//         res.json(doc.data())
//     }
// });


// app.post('/exemple',  (req, res) => {
//     const jedi = {name: req.body.nom, lastname: req.body.cognom, isJedi: req.body.esJedi};
//     res =  db.collection('test').doc('jedis').set(jedi);
//     const jediRef = db.collection('test').doc('jedis3');
//
//     res =  jediRef.set(
//         {name: req.body.nom,
//         lastname: req.body.cognom,
//         isJedi: req.body.esJedi},
//         {merge:true});
//     console.log(jedi);
// });

// app.put('/exemple',  (req, res) => {
//     const jediRef = db.collection('test').doc('jedis');
//
//     res =  jediRef.set(
//         {name: req.body.nom,
//         isJedi: req.body.esjedi,
//         lastname: req.body.cognom},
//         {merge:true});
//
//     console.log(jediRef);
// });

// app.get('/exemple', async (req, res) => {
//     const testRef = db.collection('test');
//     const snapshot = await testRef.where('isJedi', '==', true).get();
//     if (snapshot.empty) {
//         console.log('No matching documents.');
//         return;
//     }
//     res.json(snapshot.docs);
//     snapshot.forEach(doc => {
//         console.log(doc.id, '=>', doc.data());
//
//     });
//
// });


app.get('/exemple', async (req,res) =>{
    const collectionRef = await db.collection('DAE-starwars').doc('articles').get();
    //const doc = await collectionRef.get();
    console.log(collectionRef);
    console.log(collectionRef.data());

    let categories = jp.query(collectionRef.data(), '$.articles[*]..categoria');

    console.log(categories);
    res.json(categories)


    // console.log('data: ', doc.data())

    // res.json(doc.data())

});