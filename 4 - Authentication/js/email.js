/**
 * Função para cadastro com email e senha
 */
function createLogin() {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  // Crio usuário com e-mail e senha
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, senha)
    .then((user) => {
      console.log("Usuario => ", user);
      alert("Usuário criado e logado");
    })
    .catch((err) => {
      alert("Erro ao logar verifique console!");
      console.log("Erro ao logar => ", err);
    });
}

/**
 * Função para login
 */
function loginEmail() {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  // autentico usuário com email e senha
  firebase
    .auth()
    .signInWithEmailAndPassword(email, senha)
    .then((user) => {
      alert("Usuario logado!");
    })
    .catch((err) => {
      alert(`Code: ${err.code} \n\n message: ${err.message}`);
      console.log("Erro ao logar => ", err);
    });
}

/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {});
