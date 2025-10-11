// O evento 'DOMContentLoaded' é disparado quando a estrutura do HTML é completamente carregada.
// Isso garante que o código seja executado apenas depois que todos os elementos da página estiverem prontos.
document.addEventListener("DOMContentLoaded", function () {
  // Função para mostrar as mensagens de sucesso ou erro no formulário
  // Essa função recebe dois parâmetros: o tipo da mensagem (sucesso ou erro) e o texto da mensagem.
  function showMessage(type, message) {
    const form = document.querySelector(".register-box form");
    // Remove mensagens antigas
    let feedbackBox = document.getElementById("form-feedback-box"); // Procura se já existe um container para mensagens de feedback

    if (!feedbackBox) {
      // Se não existir o container...
      feedbackBox = document.createElement("div"); // Cria um novo elemento <div>
      feedbackBox.id = "form-feedback-box"; // Define o id para facilitar futuras buscas
      form.parentNode.insertBefore(feedbackBox, form.nextSibling); // Insere o container logo após o formulário
    }

    feedbackBox.innerHTML = ""; // Limpa qualquer mensagem antiga que esteja no container

    const messageElement = document.createElement("p"); // Cria um novo elemento <p> para a mensagem
    messageElement.textContent = message; // Define o texto da mensagem
    messageElement.classList.add(type); // Adiciona a classe 'success' ou 'error' para estilização
    feedbackBox.appendChild(messageElement); // Adiciona a mensagem ao container de feedback
    // Remove a mensagem após 2.5 segundos
    setTimeout(() => {
      if (messageElement.parentNode) messageElement.remove();
    }, 2500);
  }

  // Função para adicionar ou remover feedback visual nos campos de entrada do formulário (nome, email, senha).
  // A função recebe o campo de entrada e um valor booleano 'isValid' para definir se o campo é válido ou não.
  // Remove feedback visual dos campos de input (não aplica mais classes success/error nos inputs)
  function setInputFeedback(input, isValid) {
    input.classList.remove("error");
    input.classList.remove("success");
  }

  // Função para desabilitar o botão de enviar enquanto o formulário é processado.
  // Isso impede que o usuário clique várias vezes no botão durante o envio.
  function disableSubmitButton(button) {
    button.disabled = true; // Desabilita o botão de envio (não pode ser clicado).

    // Reabilita o botão após 1.2 segundos (1200 milissegundos), para permitir um tempo de processamento.
    setTimeout(() => {
      button.disabled = false; // Reabilita o botão após o tempo estipulado.
    }, 1200);
  }

  // Adiciona um evento de envio para o formulário de cadastro
  document
    .querySelector(".register-box form")
    ?.addEventListener("submit", function (e) {
      e.preventDefault(); // Impede o envio tradicional do formulário e o recarregamento da página.

      const submitButton = this.querySelector('button[type="submit"]'); // Seleciona o botão de envio.
      disableSubmitButton(submitButton); // Desabilita o botão para evitar múltiplos cliques durante o processamento.

      // Pegamos os valores inseridos nos campos de entrada (nome, email, senha)
      const nome = this.querySelector('input[type="text"]').value.trim(); // Pega o valor do campo "nome" e remove espaços extras.
      const email = this.querySelector('input[type="email"]').value.trim(); // Pega o valor do campo "email".
      const senha = this.querySelector('input[type="password"]').value.trim(); // Pega o valor do campo "senha".

      // Expressão regular para validar o formato do email
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const form = document.querySelector(".register-box form"); // Seleciona o formulário para adicionar as mensagens de feedback.

      // Verifica se o formato do email está correto usando a expressão regular.
      if (!emailPattern.test(email)) {
        showMessage("error", "Por favor, insira um email válido."); // Se o email for inválido, mostra a mensagem de erro.
        setInputFeedback(this.querySelector('input[type="email"]'), false); // Marca o campo de email como inválido.
        return; // Para a execução do código aqui, sem prosseguir com o envio do formulário.
      } else {
        setInputFeedback(this.querySelector('input[type="email"]'), true); // Se o email for válido, marca o campo como válido.
      }

      // Verifica se o email e senha informados são válidos (essa é uma validação simples e fake, apenas para testes).
      if (email === "admin@gmail.com" && senha === "123456") {
        // Se o login for bem-sucedido, mostra uma mensagem de sucesso
        showMessage("success", "Cadastro realizado com sucesso!");

        // Após 1.2 segundos, redireciona o usuário para a página "interface.html"
        setTimeout(() => {
          window.location.href = "interface.html"; // Redireciona o usuário para a página de interface.
        }, 1200); // 1200 milissegundos = 1.2 segundos
      } else {
        // Se o email ou senha estiverem incorretos, mostra uma mensagem de erro.
        showMessage("error", "Email ou senha não existe.");
        setInputFeedback(this.querySelector('input[type="password"]'), false); // Marca o campo de senha como inválido.
      }
    });

  // ----- SEÇÃO 1: LINKS DAS REDES SOCIAIS -----
  // Adicionando eventos nos links das redes sociais no rodapé da página
  // Quando o usuário clica nesses links, ele será redirecionado para a página de login da respectiva rede social.

  document
    .querySelector(".link-instagram")
    ?.addEventListener("click", function (e) {
      e.preventDefault(); // Impede a ação padrão do link (não segue o link).
      window.location.href = "https://www.instagram.com/accounts/login/"; // Redireciona para o login do Instagram.
    });

  document
    .querySelector(".link-facebook")
    ?.addEventListener("click", function (e) {
      e.preventDefault(); // Impede a ação padrão do link.
      window.location.href = "https://www.facebook.com/login/"; // Redireciona para o login do Facebook.
    });

  document
    .querySelector(".link-twitter")
    ?.addEventListener("click", function (e) {
      e.preventDefault(); // Impede a ação padrão do link.
      window.location.href = "https://twitter.com/login"; // Redireciona para o login do Twitter.
    });

  // ----- SEÇÃO 2: DESATIVAR O LINK DE LOGIN -----
  // Aqui estamos desabilitando o link "Entrar" para que ele não tenha ação ao ser clicado.
  const entrarLink = document.querySelector(".login-link a");
  if (entrarLink) {
    entrarLink.style.pointerEvents = "none"; // Desabilita o clique no link.
    entrarLink.style.opacity = "0.5"; // Deixa o link com opacidade reduzida para indicar que está desativado.
    entrarLink.title = "Função desativada"; // Exibe uma dica ao passar o mouse sobre o link, indicando que ele está desativado.
  }

  // ----- SEÇÃO 3: BOTÕES DE LOGIN SOCIAL (FACEBOOK E GOOGLE) -----
  // Quando o usuário clica nos botões de login social, ele é redirecionado para a página de login correspondente.
  document.querySelector(".facebook")?.addEventListener("click", function () {
    window.location.href = "https://www.facebook.com/login/"; // Redireciona para a página de login do Facebook.
  });

  document.querySelector(".google")?.addEventListener("click", function () {
    window.location.href = "https://accounts.google.com/signin"; // Redireciona para a página de login do Google.
  });
});
