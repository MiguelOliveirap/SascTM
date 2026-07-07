// ============================================
// FUNÇÕES DE NAVEGAÇÃO
// ============================================

/**
 * Função para navegar entre páginas
 * @param {string} page - Caminho da página a navegar
 */
function navigateTo(page) {
    // Adiciona animação de saída
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';

    // Aguarda a animação e redireciona
    setTimeout(() => {
        window.location.href = page;
    }, 300);
}

/**
 * Função para voltar à página anterior
 */
function goBack() {
    window.history.back();
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Animação de entrada ao carregar a página
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});