function logout() {
    // faz logout do meu usuário
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert("Usuário deslogou");
    });
}
