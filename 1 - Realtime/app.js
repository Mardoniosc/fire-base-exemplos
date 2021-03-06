/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName("card-container")[0];
var NOMES = [
  "Anderson",
  "Beatriz",
  "Caio",
  "Daniela",
  "Everton",
  "Fabiana",
  "Gabriel",
  "Hortencia",
  "Igor",
  "Joana",
];
var ref = firebase.database().ref("card");

/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
  var card = {
    nome: NOMES[Math.floor(Math.random() * NOMES.length - 1)],
    idade: Math.floor(Math.random() * 22 + 18),
    curtidas: 0,
  };

  /**
   * Firebase: objeto global
   * database(): metodo para acesso realtime database
   * ref url em string para referenciado do caminho do banco
   * set() : metodo que cria dados na url passada
   */
  // ref.child(card.nome).set(card).then(() => {
  //   adicionaCardATela(card)
  // })

  /**
   * push() : Cria um id unico e insere os dados dentro desse uid
   */
  // firebase: ref.push(card).then((snapshot) => {
  //   // adicionaCardATela(card, snapshot.key)
  // });

  /**
   * USANDO O FETCH PARA ADICIONAR O CARD
   */
  fetch(
    "https://curso-firebase-app-85b96-default-rtdb.firebaseio.com/card.json",
    {
      body: JSON.stringify(card),
      method: "POST",
      mode: "no-cors",
    }
  ).catch((err) => console.log("Erro ao adicionar => ", err));
}

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
  var card = document.getElementById(id);

  /**
   * .remove(): Remove o no em que o metodo é utilizado
   * remove também todos os nos dentro desse nó removido
   */
  ref
    .child(id)
    .remove()
    .then(() => {
      card.remove();
    });

  /**
   * .set(null) : Ao setar um no em nulo exclui esse no do firebase
   */
  // ref.child(id).set(null).then(() => {
  //   card.remove();
  // });
}

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {
  var card = document.getElementById(id);
  var count = card.getElementsByClassName("count-number")[0];
  var countNumber = +count.innerText;
  countNumber = countNumber + 1;

  /**
   * .set(): Pode ser acessado diretamente o objeto que quer atualizar
   * e passar o valor atualizado ou pode-ser passar o objeto completo e
   * atualiza-lo com os novos valores nos campos correspondentes
   */
  ref
    .child(id + "/curtidas")
    .set(countNumber)
    .then(
      () => {
        count.innerText = countNumber;
      },
      (err) => console.error(err)
    );
}

/**
 * Decrementa o numero de curtidas
 * @param {String} id Id do card
 */
function descurtir(id) {
  var card = document.getElementById(id);
  var count = card.getElementsByClassName("count-number")[0];
  var countNumber = +count.innerText;
  if (countNumber > 0) {
    countNumber = countNumber - 1;

    /**
     * update(): Recebe um objeto (e apenas um objeto)
     * e atualiza APENAS as propriedades desse objeto
     */
    ref
      .child(id)
      .update({ curtidas: countNumber })
      .then(() => {
        count.innerText = countNumber;
      })
      .catch((err) => console.log("Erro ao descurtir => ", err));
  }
}

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {
  // LOGGING DO STATUS DAS CHAMADAS DO FIREBASE
  // firebase.database.enableLogging(function (message) {
  //   console.log('[firebase]', message);
  // });

  /**
   * Once retorna os dados lidos de uma URL
   * snapshot: objeto retornado pela leitura
   */
  // ref.once('value').then(snapshot => {

  //   // // acessa um no filho
  //   // console.log('Child => ',snapshot.child('-MR0BxrfsmSTfqF9_sHU').val());

  //   // // checa se exite algo no snapshot
  //   // console.info('Exists() => ', snapshot.exists());

  //   // // checa se exite filho passado na url
  //   // console.info('hasChild() nome => ', snapshot.hasChild('-MR0BxrfsmSTfqF9_sHU/nome'));
  //   // console.info('hasChild() comentario => ', snapshot.hasChild('-MR0BxrfsmSTfqF9_sHU/comentario'));

  //   // // se exite algum filho no no
  //   // console.log('hasChildren() => ', snapshot.child('-MR0BxrfsmSTfqF9_sHU'));

  //   // // numro de filhos no snapshot
  //   // console.log('numChildren => ', snapshot.numChildren());

  //   // // a chave do snapshot/caminho
  //   // console.log('Chave snapshot:', snapshot.key);

  //   snapshot.forEach(value => {
  //     // console.log('Chave:', value.key);
  //     adicionaCardATela(value.val(), value.key);
  //   });
  // })

  /**
   * .ON
   */
  // ref.on("value", (snapshot) => {
  //   snapshot.forEach((value) => {
  //     adicionaCardATela(value.val(), value.key);
  //   });
  // });

  // ref.on("child_added", (snapshot) => {
  //   adicionaCardATela(snapshot.val(), snapshot.key);
  // });

  // ref.on("child_changed", (snapshot, uid) => {
  //   console.log(snapshot.key, uid);
  // });

  // ref.on("child_removed", snapshot => {
  //   console.log('Removed => ', snapshot.key);
  // });

  /**
   * ORDENAÇÃO
   * .oderByChild('filho'): Ordena pela propriedade filho passado como parametro
   * .orderByKey(): Ordena pela chave dos nós
   * .orderByValue(): Ordena pelo valor de cada propriedade do nó
   * Não vale para nos que tenha como filho outros nos
   *
   * É POSSIVEL UTILIZAR APENAS 1 METODOS DE ORDENAÇÃO POR VEZ
   */

  // ref.orderByChild("idade").on("child_added", (snapshot) => {
  //   adicionaCardATela(snapshot.val(), snapshot.key);
  // });

  /**
   * .startAt(): Traz valores cujo valor passado na query comece no valor passado por parametro no metodo
   * .endAt() : Traz valore cujo valor passado na query va até o valor passado por parametro no metodo
   * .equalTo(): traz valores cujo valor passado na query vata exatamente com o valor da propriedade selecionada
   */
  // ref.orderByChild("idade").startAt(25).endAt(30).on("child_added", (snapshot) => {
  //   adicionaCardATela(snapshot.val(), snapshot.key);
  // });

  /**
   * Limites
   * .limitToFirst(Number) : Retorna apenas os primeiros valores valores de acordo com o numero passado por parametro
   * limitToLast(Number) : Retorna apenas ultimos valores de acordo com o numero passado por parametro
   */
  // ref.orderByChild("idade").startAt(0).limitToLast(20).on("child_added", (snapshot) => {
  //   adicionaCardATela(snapshot.val(), snapshot.key);
  // });

  // ref.on("value", (snapshot) => {
  //   snapshot.forEach((value) => {
  //     adicionaCardATela(value.val(), value.key);
  //   });

  //   ref.off("value");
  // }, err => console.log('Erro no on =>', err));

  /**
   *  USANDO O FETCH NO LUGAR DA BLIBLIOTECA DO FIREBASE
   */
  fetch(
    "https://curso-firebase-app-85b96-default-rtdb.firebaseio.com/card.json"
  )
    .then((res) => res.json())
    .then((res) => {
      for (var key in res) {
        adicionaCardATela(res[key], key);
      }
    });
});

/**
 * Adiciona card na tela
 * @param {Object} informacao Objeto contendo dados do card
 * @param {String} id UID do objeto inserido/consultado
 */
function adicionaCardATela(informacao, id) {
  /**
   * HEADER DO CARD
   */
  let header = document.createElement("h2");
  header.innerText = informacao.nome;
  header.classList.add("card-title");
  // ===================================

  /**
   * CONTENT DO CARD
   */
  let content = document.createElement("p");
  content.classList.add("card-text");
  content.innerText = informacao.idade + " anos.";
  // ===================================

  /**
   * BOTÕES DO CARD
   */
  let inner = document.createElement("div");
  inner.classList.add("row");
  // Botão adicionar
  let button_add = document.createElement("button");
  button_add.classList.add("btn", "btn-link", "col-3");
  button_add.setAttribute("onclick", "curtir('" + id + "')");
  button_add.innerText = "+";
  inner.appendChild(button_add);

  // Contador de curtidas
  let counter = document.createElement("span");
  counter.innerHTML = informacao.curtidas;
  counter.classList.add("col-3", "text-center", "count-number");
  inner.appendChild(counter);

  // Botão de subtrair
  let button_sub = document.createElement("button");
  button_sub.classList.add("btn", "btn-link", "col-3");
  button_sub.setAttribute("onclick", "descurtir('" + id + "')");
  button_sub.innerText = "-";
  inner.appendChild(button_sub);
  // ===================================

  // Botão de excluir
  let button_del = document.createElement("button");
  button_del.classList.add("btn", "btn-danger", "col-3");
  button_del.setAttribute("onclick", "deletar('" + id + "')");
  button_del.innerText = "x";
  inner.appendChild(button_del);
  // ===================================

  /**
   * CARD
   */
  let card = document.createElement("div");
  card.classList.add("card");
  card.id = id;
  let card_body = document.createElement("div");
  card_body.classList.add("card-body");
  // ===================================

  // popula card
  card_body.appendChild(header);
  card_body.appendChild(content);
  card_body.appendChild(inner);
  card.appendChild(card_body);

  // insere no container
  CARD_CONTAINER.appendChild(card);
}
