let pizzaria = [];
let pizzaParaAlterar = null;

function mostrarSecao(secao) {
  document.getElementById("cadastro").classList.add("hidden");
  document.getElementById("consultar").classList.add("hidden");
  document.getElementById("alterar").classList.add("hidden");

  document.getElementById(secao).classList.remove("hidden");
}

function adicionarpizza() {
  const sabor = document.getElementById("sabor").value;
  const recheio = document.getElementById("recheio").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const usuario = document.getElementById("usuario").value;
  const observacao = document.getElementById("obs").value;

  if (sabor && recheio && valor && usuario) {
    pizzaria.push({ sabor, recheio, valor, usuario, observacao });

    document.getElementById("sabor").value = "";
    document.getElementById("recheio").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("obs").value = "";

    alert("Pizza cadastrada com sucesso!");
    atualizarLista();
  } else {
    alert("Por favor, insira todos os dados corretamente.");
  }
}

function buscarPizza() {
  const busca = document.getElementById("busca").value.toLowerCase();
  const resultados = pizzaria.filter((pizza) =>
    pizza.sabor.toLowerCase().includes(busca)
  );
  atualizarLista(resultados);
}

function buscarPizzaParaAlterar() {
  const busca = document.getElementById("busca-alterar").value.toLowerCase();
  pizzaParaAlterar = pizzaria.find((pizza) =>
    pizza.sabor.toLowerCase().includes(busca)
  );

  if (pizzaParaAlterar) {
    document.getElementById("form-alterar").classList.remove("hidden");
    document.getElementById("novo-sabor").value = pizzaParaAlterar.sabor;
    document.getElementById("novo-recheio").value = pizzaParaAlterar.recheio;
    document.getElementById("novo-valor").value = pizzaParaAlterar.valor;
    document.getElementById("novo-usuario").value = pizzaParaAlterar.usuario;
    document.getElementById("novo-obs").value = pizzaParaAlterar.observacao;
  } else {
    alert("Pizza não encontrada.");
  }
}

function alterarpedido() {
  if (pizzaParaAlterar) {
    const novosabor = document.getElementById("novo-sabor").value;
    const novorecheio = document.getElementById("novo-recheio").value;
    const novovalor = parseFloat(document.getElementById("novo-valor").value);
    const novousuario = document.getElementById("novo-usuario").value;
    const novoobs = document.getElementById("novo-obs").value;

    if (novosabor && novorecheio && novovalor && novousuario && novoobs) {
      pizzaParaAlterar.sabor = novosabor;
      pizzaParaAlterar.recheio = novorecheio;
      pizzaParaAlterar.valor = novovalor;
      pizzaParaAlterar.usuario = novousuario;
      pizzaParaAlterar.observacao = novoobs;

      atualizarLista();
      alert("Pizza alterada com sucesso!");
      document.getElementById("form-alterar").classList.add("hidden");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  }
}

function atualizarLista(lista = pizzaria) {
  const tabela = document.getElementById("lista-pizza");
  tabela.innerHTML = "";

  lista.forEach((pizza) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${pizza.sabor}</td>
      <td>${pizza.recheio}</td>
      <td>R$ ${pizza.valor.toFixed(2)}</td>
      <td>${pizza.usuario}</td>
      <td>${pizza.observacao}</td>
    `;
    tabela.appendChild(linha);
  });
}
