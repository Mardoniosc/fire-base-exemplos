function loginGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((response) => {
      console.log("Usuario", response.user);
      console.log("Token => ", response.credential.accessToken);
    })
    .catch((err) => {
      console.log("Erro =>", err);
    });
}
