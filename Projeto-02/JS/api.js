document.addEventListener('DOMContentLoaded', function() {
    const cotacoesDiv = document.getElementById('cotacao-petr4');
    cotacoesDiv.innerHTML = `<p>Carregando cotação...</p>`;
    fetch('https://brapi.dev/api/quote/PETR4')
        .then(resp => resp.json())
        .then(data => {
            const quote = data.results[0];
            cotacoesDiv.innerHTML = `
                <div class="petr4-box">
                    <div class="petr4-header">
                        <img src="${quote.logo}" alt="Logo PETR4" class="petr4-logo">
                        <div>
                            <span class="petr4-ticker">${quote.symbol}</span>
                            <span class="petr4-name">${quote.shortName}</span>
                        </div>
                    </div>
                    <div class="petr4-info">
                        <span class="petr4-price">R$ ${quote.regularMarketPrice.toFixed(2)}</span>
                        <span class="petr4-change ${quote.regularMarketChangePercent >= 0 ? 'up' : 'down'}">
                            ${quote.regularMarketChangePercent >= 0 ? '▲' : '▼'} ${quote.regularMarketChangePercent.toFixed(2)}%
                        </span>
                    </div>
                    <div class="petr4-details">
                        <span><strong>Máxima:</strong> R$ ${quote.regularMarketDayHigh.toFixed(2)}</span>
                        <span><strong>Mínima:</strong> R$ ${quote.regularMarketDayLow.toFixed(2)}</span>
                        <span><strong>Volume:</strong> ${quote.regularMarketVolume.toLocaleString('pt-BR')}</span>
                        <span><strong>Última atualização:</strong> ${new Date(quote.updatedAt).toLocaleString('pt-BR')}</span>
                    </div>
                </div>
            `;
        })
        .catch(() => {
            cotacoesDiv.innerHTML = '<span style="color:#f77f00;">Não foi possível carregar a cotação PETR4.</span>';
        });
});