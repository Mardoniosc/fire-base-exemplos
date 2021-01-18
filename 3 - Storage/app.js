/**
 * Variáveis com referencias dos inputs
 */
var fileInput = document.getElementById("file-input");
var stringInput = document.getElementById("string-input");

/**
 * Referencia para o storage do firebase criando uma pasta com o nome de arquivos
 */
var ref = firebase.storage().ref("arquivos");
/**
 * Metodo que observa mudanças no input de arquivo
 */
fileInput.onchange = function (event) {
  var arquivo = event.target.files[0];

  /**
   * .child(nome) : Acessar o caminhjo para inserir o arquivo
   * .put(arquivo) : Vai inserir o arquivo
   */
  ref
    .child("arquivo")
    .put(arquivo)
    .then((snapshot) => {
      console.log("Snapshot => ", snapshot);

      /**
       * .getDownloadURL() - Retorna a url para dowload/apresentação desse arquivo enviado
       */
      ref
        .child("arquivo")
        .getDownloadURL()
        .then((url) => {
          console.log('Download URL String => ', url);
        });
    });
};

/**
 * Metodo que observa mudanças no input de string
 */
stringInput.onchange = function (event) {};
