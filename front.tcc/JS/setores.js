document.addEventListener('DOMContentLoaded', () => {
    // Referências dos elementos
    const btnFilter = document.getElementById('btnFilter');
    const btnExport = document.getElementById('btnExport');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const btnBackMenu = document.getElementById('back-button');

    // 1. Funcionalidade de Filtro por Período
    if (btnFilter) {
        btnFilter.addEventListener('click', () => {
            console.log('Ação: Abrir modal de filtro de período');
            const period = prompt('Selecione o período:\n1. Últimos 7 dias\n2. Últimos 30 dias\n3. Este mês\n4. Personalizado');
            if (period) {
                alert(`Filtrando dados para o período selecionado: ${period}`);
                // Aqui você poderia atualizar os gráficos e tabelas
            }
        });
    }

    // 2. Funcionalidade de Exportação
    if (btnExport) {
        btnExport.addEventListener('click', () => {
            console.log('Ação: Exportar dashboard de setores');
            const format = prompt('Selecione o formato de exportação:\n1. PDF\n2. Excel\n3. CSV');
            if (format) {
                alert(`Iniciando exportação do dashboard em formato: ${format}`);
                // Aqui você poderia gerar o arquivo de exportação
            }
        });
    }

    // 3. Ações de Visualizar Detalhes
    viewDetailsButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const sectorName = row.querySelector('.sector-name').textContent;
            alert(`Abrindo detalhes analíticos do setor: ${sectorName}`);
            // Aqui você poderia navegar para uma página de detalhes do setor
        });
    });

    // 4. Efeito de Hover nos Gráficos (opcional)
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.addEventListener('mouseenter', () => {
            console.log(`Hovering over bar ${index + 1}`);
        });
    });

    // 5. Simulação de Dados Dinâmicos
    console.log('Dashboard de Setores carregado com sucesso!');
    console.log('Dados disponíveis para análise:');
    console.log({
        rendimento: '71%',
        satisfacaoMedia: '88%',
        atendimento: 519,
        setores: ['Vendas', 'Financeiro', 'Produção', 'Marketing']
    });

    // Back to Menu functionality
    btnBackMenu.addEventListener('click',() => {
        window.location.href = '../HTML/menu.html';
    });
});