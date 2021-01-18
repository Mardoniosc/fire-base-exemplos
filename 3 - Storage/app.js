/**
 * Variáveis com referencias dos inputs
 */
var fileInput = document.getElementById("file-input");
var stringInput = document.getElementById("string-input");

/**
 * Referencia para o storage do firebase criando uma pasta com o nome de arquivos
 */
var ref = firebase.storage().ref("arquivos");
var tarefaDeUpload;
/**
 * Metodo que observa mudanças no input de arquivo
 */
fileInput.onchange = function (event) {
  var arquivo = event.target.files[0];

  /**
   * Criar um id unico sem inserir nada no firebase realtime
   */
  var uid = firebase.database().ref().push().key;

  /**
   * .child(nome) : Acessar o caminhjo para inserir o arquivo
   * .put(arquivo) : Vai inserir o arquivo
   */
  // ref
  //   .child(uid)
  //   .put(arquivo, { customMetadata: { nome: "Curriculo" } })
  //   .then((snapshot) => {
  //     console.log("Snapshot => ", snapshot);

  //     /**
  //      * .getDownloadURL() - Retorna a url para dowload/apresentação desse arquivo enviado
  //      */
  //     ref
  //       .child(uid)
  //       .getDownloadURL()
  //       .then((url) => {
  //         console.log("Download URL String => ", url);
  //       });

  //     ref
  //       .child(uid)
  //       .getMetadata()
  //       .then((metadata) => {
  //         console.log("Metadados => ", metadata);
  //       });
  //   });

  /**
   * .getMetada() : Retorna os metadados do arquivo inserido.
   */

  // ref
  //   .child("arquivo")
  //   .getMetadata()
  //   .then((metadata) => {
  //     console.log(metadata);
  //   });


  // atribui a tarefa de uploa a variavel de tarefaDeUpload e executa essa tarefa ao dar put()
  tarefaDeUpload = ref.child(uid).put(arquivo);
  tarefaDeUpload.then(snapshot => {
    console.log('Snapshot => ', snapshot)
  }).catch(err => {

    // pEga o erro de cancelamento da tarefa
    console.error(err)
  })
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

/**
 * Pausa a tarefa de upload
 */
pausar = function () {
  tarefaDeUpload.pause();
  console.log("Pausou tarefa");
};

// continuar a tarefa de upload pausada
continuar = function () {
  tarefaDeUpload.resume();
  console.log("continuou tarefa");
};

// cancela a tarefa de upload
cancelar = function () {
  tarefaDeUpload.cancel();
  console.log("cancelou tarefa");
};
