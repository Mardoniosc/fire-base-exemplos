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
          console.log("Download URL String => ", url);
        });
    });
};

/**
 * Metodo que observa mudanças no input de string
 */
stringInput.onchange = function (event) {
  var arquivo = event.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(arquivo);
  reader.onload = function () {
    const base64 = reader.result.split("base64,")[1];
    console.log(base64);

    ref
      .child("imagem")
      .putString(base64, "base64", { contentType: "image/png" })
      .then((snapshot) => {

        /**
         * .putString(string, formato, metadados) : Slava uma string no firebase e eu posso colocar um formato de
         * imagem para que ele automaticamente converta para um png
         */
        ref
          .child("imagem")
          .getDownloadURL()
          .then((url) => {
            console.log("Download URL String => ", url);
          });
      });
  };
};
