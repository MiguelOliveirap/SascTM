document.addEventListener('DOMContentLoaded', () => {
    // Referências dos elementos
    const searchInput = document.getElementById('searchMonth');
    const tableBody = document.getElementById('tableBody');
    const btnPrimary = document.querySelector('.btn-primary');
    const btnSecondary = document.querySelector('.btn-secondary');
    const btnBackMenu = document.getElementById('back-button');

    // 1. Funcionalidade de Pesquisa em tempo real
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const rows = tableBody.querySelectorAll('tr');

            rows.forEach(row => {
                const month = row.querySelector('.month-name').textContent.toLowerCase();
                if (month.includes(term)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // 2. Simulação de Novo Relatório
    if (btnPrimary) {
        btnPrimary.addEventListener('click', () => {
            console.log('Ação: Abrir modal de criação de relatório');
            alert('Funcionalidade: Abrir formulário para gerar novo relatório.');
        });
    }

    // 3. Simulação de Relatórios Anteriores
    if (btnSecondary) {
        btnSecondary.addEventListener('click', () => {
            console.log('Ação: Navegar para histórico completo');
            alert('Navegando para a lista completa de relatórios históricos.');
        });
    }

    // 4. Ações de linha (Visualizar Detalhes)
    const viewButtons = document.querySelectorAll('.view-details');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const month = row.querySelector('.month-name').textContent;
            alert(`Exibindo detalhes analíticos do mês de ${month}`);
        });
    });

    // 5. Simulação de Download
    const downloadButtons = document.querySelectorAll('.fa-download');
    downloadButtons.forEach(icon => {
        icon.parentElement.addEventListener('click', () => {
            alert('Iniciando exportação do relatório em formato PDF...');
        });
    });

    // Back to Menu functionality
    btnBackMenu.addEventListener('click',() => {
        window.location.href = '../HTML/menu.html';
    });
});