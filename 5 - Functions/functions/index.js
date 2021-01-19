const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp({
    apiKey: "AIzaSyAVZ3tJyT6j3wNzRA2WhTeeDer1SGuIOAU",
    authDomain: "curso-firebase-app-85b96.firebaseapp.com",
    projectId: "curso-firebase-app-85b96",
    databaseURL: "https://curso-firebase-app-85b96-default-rtdb.firebaseio.com",
    storageBucket: "curso-firebase-app-85b96.appspot.com",
    messagingSenderId: "865939655633",
    appId: "1:865939655633:web:292a3ce71512cfcca56ef0",
    measurementId: "G-N5RSQ498RQ"
});

exports.addCard = functions.https.onRequest((request, response) => {
    let card = JSON.parse(request.body);

    admin.database().ref('card').push(card).then(() => {
        response.status(200).send('Gravação realizada com sucesso');
    }, error => {
        response.status(500).send(error);
    });
});

/**
 * .onCreate = ao criar um novo dado no nó
 * .onUpdate = ao atualizar um dado em um nó
 * .onDelete = ao excluir um dado em um nó
 * .onWrite = ao executar qualquer uma das funções anteriores
 */
exports.updateCount = functions.database.ref('/card/{pushId}').onCreate((snapshot, context) => {
    // .onceCreate((snapshot, context)): snapshot é o dado atual / contexto da chamada.
    admin.database().ref('card').once('value').then(snap => {
        admin.database().ref('contagem').set(snap.numChildren()).then(() => {
            // é preciso retornar um dado ou uma promessa
            return snap.numChildren();
        })
    });
});

exports.updateName = functions.firestore.document('/cards/{userId}').onCreate((snapshot, context) => {
    let nome = snapshot.data().nome;
    nome = nome.toUpperCase();

    admin.firestore().collection('cards').doc(snapshot.id).update({nome}).then(() => {
        return nome;
    });
})