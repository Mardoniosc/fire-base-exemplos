function logout() {
  // faz logout do meu usuário
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert("Usuário deslogou");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  // nova instancia do firebaseui
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  // configurações do firebaseUI
  var config = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        console.log("authResult => ", authResult);
        return false;
      },
    },
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],

    signInFlow: "popup",
  };

  // inicializa o firebaseUI
  ui.start("#firebaseui-auth", config);
});
