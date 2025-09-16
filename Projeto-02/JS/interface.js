// ...existing code...

// Menu perfil: permanece aberto enquanto mouse está sobre ícone ou menu
document.addEventListener('DOMContentLoaded', function() {
    const profileIcon = document.getElementById('profileIcon');
    const profileMenu = document.getElementById('profileMenu');
    let menuTimeout;

    function showMenu() {
        clearTimeout(menuTimeout);
        profileMenu.classList.add('show');
    }
    function hideMenu() {
        menuTimeout = setTimeout(() => {
            profileMenu.classList.remove('show');
        }, 200);
    }
    profileIcon.addEventListener('mouseenter', showMenu);
    profileMenu.addEventListener('mouseenter', showMenu);
    profileIcon.addEventListener('mouseleave', hideMenu);
    profileMenu.addEventListener('mouseleave', hideMenu);
});

// ...existing code...
async function carregarCotacoes() {
    // ...cotação...
}
carregarCotacoes();
setInterval(carregarCotacoes, 60000);
// ...existing code...