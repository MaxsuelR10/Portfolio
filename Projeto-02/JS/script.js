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

    // Botão cadastrar
    document.querySelector('.register-box form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        window.location.href = 'interface.html'; // Troque para o nome da sua página de interface
    });

    // Link "Entrar"
    document.querySelector('.login-link a')?.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'interface.html'; // Troque para o nome da sua página de interface
    });

    // Botões sociais
    document.querySelector('.facebook')?.addEventListener('click', function() {
        window.location.href = 'https://www.facebook.com/login/';
    });
    document.querySelector('.google')?.addEventListener('click', function() {
        window.location.href = 'https://accounts.google.com/signin';
    });
});