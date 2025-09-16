document.addEventListener('DOMContentLoaded', function () {
    // Links das redes sociais no rodapé
    document.querySelector('.link-instagram')?.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'https://www.instagram.com/accounts/login/';
    });
    document.querySelector('.link-facebook')?.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'https://www.facebook.com/login/';
    });
    document.querySelector('.link-twitter')?.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'https://twitter.com/login';
    });

    // Botão cadastrar com validação
    document.querySelector('.register-box form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const senha = this.querySelector('input[type="password"]').value.trim();
        const mensagemErro = document.getElementById('mensagem-erro');
        const mensagemSucesso = document.getElementById('mensagem-sucesso');

        if (email === 'admin@gmail.com' && senha === '123456') {
            if (!mensagemSucesso) {
                const sucesso = document.createElement('p');
                sucesso.id = 'mensagem-sucesso';
                sucesso.style.color = '#2ecc40';
                sucesso.style.marginTop = '10px';
                sucesso.textContent = 'Cadastro realizado com sucesso!';
                this.appendChild(sucesso);
            } else {
                mensagemSucesso.textContent = 'Cadastro realizado com sucesso!';
            }
            if (mensagemErro) mensagemErro.textContent = '';
            setTimeout(() => {
                window.location.href = 'interface.html';
            }, 1200);
        } else {
            if (!mensagemErro) {
                const erro = document.createElement('p');
                erro.id = 'mensagem-erro';
                erro.style.color = '#e74c3c';
                erro.style.marginTop = '10px';
                erro.textContent = 'Email ou senha não existe.';
                this.appendChild(erro);
            } else {
                mensagemErro.textContent = 'Email ou senha não existe.';
            }
            if (mensagemSucesso) mensagemSucesso.textContent = '';
        }
    });

    // Link "Entrar" inativo
    const entrarLink = document.querySelector('.login-link a');
    if (entrarLink) {
        entrarLink.style.pointerEvents = 'none';
        entrarLink.style.opacity = '0.5';
        entrarLink.title = 'Função desativada';
    }

    // Botões sociais
    document.querySelector('.facebook')?.addEventListener('click', function() {
        window.location.href = 'https://www.facebook.com/login/';
    });
    document.querySelector('.google')?.addEventListener('click', function() {
        window.location.href = 'https://accounts.google.com/signin';
    });
});