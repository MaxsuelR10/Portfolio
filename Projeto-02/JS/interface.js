// Menu lateral do perfil
const profileIcon = document.getElementById('profileIcon');
const profileMenu = document.getElementById('profileMenu');

profileIcon.addEventListener('mouseenter', () => {
    profileMenu.style.display = 'block';
});
profileIcon.addEventListener('mouseleave', () => {
    setTimeout(() => { profileMenu.style.display = 'none'; }, 300);
});
profileMenu.addEventListener('mouseenter', () => {
    profileMenu.style.display = 'block';
});
profileMenu.addEventListener('mouseleave', () => {
    profileMenu.style.display = 'none';
});

// Cotações - usando API pública do AwesomeAPI (https://docs.awesomeapi.com.br/api-de-moedas)
async function carregarCotacoes() {
    const cotacoesDiv = document.getElementById('cotacoes');
    try {
        const resp = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,IBOVESPA');
        const data = await resp.json();
        cotacoesDiv.innerHTML = `
            <strong>Dólar:</strong> R$ ${parseFloat(data.USDBRL.bid).toFixed(2)}<br>
            <strong>Euro:</strong> R$ ${parseFloat(data.EURBRL.bid).toFixed(2)}<br>
            <strong>Bitcoin:</strong> R$ ${parseFloat(data.BTCBRL.bid).toFixed(2)}<br>
            <strong>Ibovespa:</strong> ${data.IBOVESPA.bid}
        `;
    } catch (e) {
        cotacoesDiv.innerHTML = '<span style="color:#f77f00;">Não foi possível carregar as cotações.</span>';
    }
}
carregarCotacoes();
setInterval(carregarCotacoes, 60000); // Atualiza a cada 1 minuto