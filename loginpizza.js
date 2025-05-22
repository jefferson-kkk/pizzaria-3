function Exibirmensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
    mensagem.classList.remove("mensagem-hidden");

    setTimeout(() => {
        mensagem.classList.add("mensagem-hidden");
    }, 3000);
}

function validarlogin() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    const usuariocorreto = "admin";
    const senhacorreta = "675849";

    if (usuario === usuariocorreto && senha === senhacorreta) {
        Exibirmensagem("Login realizado com sucesso", "sucesso");
        setTimeout(() => {
            window.location.href = "pizza.html";
        }, 1000);
    } else {
        Exibirmensagem("Usuário ou senha incorretos", "erro");
    }
}
