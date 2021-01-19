function loginFacebook() {
  // Criar um nova instancia do provedor de login do Facebook
  var provider = new firebase.auth.FacebookAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((response) => {
      console.log(`Usuario ${response.user}`);
      console.log("Token => ", response.credential.accessToken);
    })
    .catch((err) => {
      console.log("Erro =>", err);
    });
}
