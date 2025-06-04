let pizzaria = [];
let pizzaParaAlterar = null;
let vendas = [];

function mostrarSecao(secao) {
  document.getElementById("cadastro").classList.add("hidden");
  document.getElementById("consultar").classList.add("hidden");
  document.getElementById("alterar").classList.add("hidden");
  document.getElementById("venda").classList.add("hidden");
  document.getElementById("relatorio-vendas").classList.add("hidden");
  document.getElementById("sobre").classList.add("hidden")
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

    // Limpar campos
    document.getElementById("sabor").value = "";
    document.getElementById("recheio").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("obs").value = "";

    document.getElementById("text").innerHTML = "Pizza cadastrada com sucesso!";
    atualizarLista();
  } else {
    document.getElementById("text").innerHTML = "Por favor, insira todos os dados corretamente.";
  }
}

function buscarPizza() {
  const busca = document.getElementById("busca").value.toLowerCase();
  const resultados = pizzaria.filter(pizza =>
    pizza.usuario.toLowerCase().includes(busca)
  );
  atualizarLista(resultados);
}

function atualizarLista(lista = pizzaria) {
  const tabela = document.getElementById("lista-pizza");
  tabela.innerHTML = "";

  lista.forEach(pizza => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${pizza.usuario}</td>
      <td>${pizza.sabor}</td>
      <td>${pizza.recheio}</td>
      <td>${pizza.observacao}</td>
      <td>R$ ${pizza.valor.toFixed(2)}</td>
    `;
    tabela.appendChild(linha);
  });
}

function buscarPizzaParaAlterar() {
  const busca = document.getElementById("busca-alterar").value.toLowerCase();
  pizzaParaAlterar = pizzaria.find(pizza =>
    pizza.usuario.toLowerCase().includes(busca)
  );

  if (pizzaParaAlterar) {
    document.getElementById("form-alterar").classList.remove("hidden");
    document.getElementById("novo-sabor").value = pizzaParaAlterar.sabor;
    document.getElementById("novo-recheio").value = pizzaParaAlterar.recheio;
    document.getElementById("novo-valor").value = pizzaParaAlterar.valor;
    document.getElementById("novo-usuario").value = pizzaParaAlterar.usuario;
    document.getElementById("novo-obs").value = pizzaParaAlterar.observacao;
  } else {
    document.getElementById("text").innerHTML ="Pedido não encontrado para o cliente informado.";
  }
}

function alterarpedido() {
  if (pizzaParaAlterar) {
    const novosabor = document.getElementById("novo-sabor").value;
    const novorecheio = document.getElementById("novo-recheio").value;
    const novovalor = parseFloat(document.getElementById("novo-valor").value);
    const novousuario = document.getElementById("novo-usuario").value;
    const novoobs = document.getElementById("novo-obs").value;

    if (novosabor && novorecheio && novovalor && novousuario) {
      pizzaParaAlterar.sabor = novosabor;
      pizzaParaAlterar.recheio = novorecheio;
      pizzaParaAlterar.valor = novovalor;
      pizzaParaAlterar.usuario = novousuario;
      pizzaParaAlterar.observacao = novoobs;

      atualizarLista();
      document.getElementById("text").innerHTML="Pedido alterado com sucesso!";
      document.getElementById("form-alterar").classList.add("hidden");
    } else {
      document.getElementById("text")="Por favor, preencha todos os campos obrigatórios.";
    }
  }
}

function registrarVenda() {
  const usuario = document.getElementById("venda-comprador").value;
  const sabor = document.getElementById("venda-pedido").value;
  const valor = parseFloat(document.getElementById("venda-preco").value);

  if (usuario && sabor &&valor) {
    vendas.push({ usuario, sabor, valor });
    // Atualiza a lista de vendas imediatamente
    const listavendas = document.getElementById("lista-vendas");
    const item = document.createElement("li");
    item.textContent = `Cliente: ${usuario}, Pedido: ${sabor}, Valor: R$${valor.toFixed(2)}`;
    listavendas.appendChild(item);

    // Limpa os campos
    document.getElementById("venda-comprador").value = '';
    document.getElementById("venda-pedido").value = '';
    document.getElementById("venda-preco").value = '';

    document.getElementById("text")="Venda registrada com sucesso!";
  } else {
    document.getElementById("text")="Por favor, preencha todos os campos corretamente.";
  }
}
function gerarRelatorioVendas() {
  
  // Carrega vendas do localStorage se existirem
  if(localStorage.getItem('vendas')) {
    vendas = JSON.parse(localStorage.getItem('vendas'));
  }

  const tabelaRelatorio = document.getElementById('tabela-relatorio-vendas');
  tabelaRelatorio.innerHTML = '';

  if (vendas.length === 0) {
    document.getElementById("text").innerHTML = 'Nenhuma venda registrada.';
    return;
  }

  let totalVendas = 0;

  vendas.forEach((venda) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${venda.sabor}</td>
      <td>R$${venda.valor.toFixed(2)}</td>
      <td>${venda.comprador || venda.usuario}</td> <!-- Compatibilidade com registros antigos -->
    `;
    tabelaRelatorio.appendChild(linha);
    totalVendas += venda.valor;
  });

  // Linha do total
  const linhaTotal = document.createElement('tr');
  linhaTotal.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>R$${totalVendas.toFixed(2)}</strong></td>
    <td></td>
  `;
  tabelaRelatorio.appendChild(linhaTotal);

  document.getElementById('relatorio-vendas').classList.remove('hidden');
}
function login(){
 setTimeout(() => {
            window.location.href = "loginpizza.html";
        }, 1000);
}
