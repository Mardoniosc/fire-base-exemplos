function loginGithub() {
  var provider = new firebase.auth.GithubAuthProvider();


    
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