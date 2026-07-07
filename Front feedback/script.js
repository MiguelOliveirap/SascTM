/*
 script.js
 ----------------
 Este arquivo gerencia a interface de avaliação de atendimento:
 - Interação com as estrelas (selecionar, hover, reset)
 - Validação e submissão do formulário de satisfação
 - Armazenamento em memória das avaliações/comentários
 - Atualização dinâmica do dashboard (média, total, comentários recentes)

 Observação: o armazenamento é local em memória (variáveis JavaScript),
 sem persistência em servidor ou localStorage.
*/

// Executa o código apenas depois que todo o HTML estiver carregado.
document.addEventListener('DOMContentLoaded', () => {
    // Captura elementos principais do DOM usados pelo script.
    const ratingStars = document.querySelectorAll('.rating-stars i');
    const nameInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const cnpjInput = document.getElementById('cnpj');
    const commentsTextarea = document.getElementById('comments');
    const satisfactionForm = document.getElementById('satisfaction-form');
    const feedbackSection = document.getElementById('feedback-section');
    const formMessage = document.getElementById('form-message');
    const dashboardSection = document.getElementById('dashboard');
    const averageRatingDisplay = document.getElementById('average-rating');
    const totalRatingsDisplay = document.getElementById('total-ratings');
    const recentCommentsList = document.getElementById('recent-comments');
    const allFeedbacksList = document.getElementById('all-feedbacks');

    // Estado local usado para armazenar a avaliação selecionada e histórico.
    // - `selectedRating`: nota atual selecionada pelo usuário (1-5)
    // - `allRatings`: array de números usado para calcular média e total
    // - `allComments`: array de strings com comentários não vazios
    // - `allFeedbacks`: array de objetos com feedbacks completos (para exibição detalhada)
    // - `messageTimeoutId`: controle para ocultar mensagens após tempo
    let selectedRating = 0; // Valor de 1 a 5 conforme estrela selecionada.
    let allRatings = [];    // Armazena todas as avaliações realizadas.
    let allComments = [];   // Armazena os comentários não vazios.
    let allFeedbacks = [];  // Armazena cada feedback completo do usuário.
    let messageTimeoutId = null; // ID do timeout que oculta a mensagem.

    // --- Lógica de interação das estrelas ---
    // Comportamento implementado:
    // - hover: mostra temporariamente a avaliação correspondente
    // - mouseout: restaura a visualização para a nota selecionada
    // - click: define a nota selecionada (persistente até reset)

    // A cada estrela adicionamos eventos de mouseover, mouseout e click.
    ratingStars.forEach(star => {
        star.addEventListener('mouseover', () => {
            resetStars();
            const rating = parseInt(star.dataset.rating, 10);
            highlightStars(rating);
        });

        star.addEventListener('mouseout', () => {
            resetStars();
            highlightStars(selectedRating);
        });

        star.addEventListener('click', () => {
            selectedRating = parseInt(star.dataset.rating, 10);
            highlightStars(selectedRating);
        });
    });

    // Preenche as estrelas até o valor informado.
    // Recebe `rating` e altera as classes para trocar o ícone (vazio/cheio).
    function highlightStars(rating) {
        ratingStars.forEach(star => {
            if (parseInt(star.dataset.rating, 10) <= rating) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }

    // Limpa toda a seleção visual das estrelas.
    // Útil ao resetar o formulário ou durante hover para reiniciar estado.
    function resetStars() {
        ratingStars.forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
        });
    }

    // --- Lógica de submissão do formulário ---
    // Valida campos essenciais e adiciona o feedback nas estruturas locais.
    // Não faz requisição ao servidor; apenas atualiza o dashboard na página.
    // Escuta o envio do form e processa os dados sem recarregar a página.
    satisfactionForm.addEventListener('submit', event => {
        event.preventDefault(); // Impede o comportamento padrão do navegador.

        if (selectedRating === 0) {
            displayMessage('Por favor, selecione uma avaliação com estrelas.', 'error');
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const cnpj = cnpjInput.value.trim();
        const comment = commentsTextarea.value.trim();

        if (!name) {
            displayMessage('Informe seu nome antes de enviar a avaliação.', 'error');
            return;
        }

        if (!email) {
            displayMessage('Informe seu e-mail antes de enviar a avaliação.', 'error');
            return;
        }

        if (!cnpj) {
            displayMessage('Informe seu CNPJ antes de enviar a avaliação.', 'error');
            return;
        }

        // Logging local para facilitar testes e desenvolvimento.
        console.log('Avaliação enviada:', {
            name,
            email,
            cnpj,
            rating: selectedRating,
            comment
        });

        // Registra a avaliação para cálculo das métricas gerais.
        allRatings.push(selectedRating);

        // Armazena apenas comentários não vazios para a lista "comentários recentes".
        if (comment) {
            allComments.push(comment);
        }

        // Guarda o feedback completo em um array de objetos para exibição detalhada.
        // Cada objeto contém nome, e-mail, CNPJ, nota, comentário e timestamp.
        allFeedbacks.push({
            nome: name,
            email,
            cnpj,
            rating: selectedRating,
            comment: comment || 'Sem comentário',
            createdAt: new Date().toLocaleString('pt-BR')
        });

        displayMessage('Sua avaliação foi enviada com sucesso! Obrigado.', 'success');
        updateDashboard();
        resetForm();

        feedbackSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        dashboardSection.classList.add('visible');
    });

    // Exibe uma mensagem de feedback ao usuário.
    // `type` pode ser 'success' ou 'error' — classes CSS gerenciam a aparência.
    function displayMessage(message, type) {
        if (messageTimeoutId) {
            clearTimeout(messageTimeoutId);
        }

        formMessage.textContent = message;
        formMessage.className = '';
        formMessage.classList.add(type);
        formMessage.classList.remove('hidden');

        messageTimeoutId = setTimeout(() => {
            formMessage.classList.add('hidden');
            messageTimeoutId = null;
        }, 5000);
    }

    // Expor a função para teste no console do navegador, se necessário.
    window.displayMessage = displayMessage;

    // Restaura o formulário ao estado inicial para nova avaliação.
    function resetForm() {
        selectedRating = 0;
        resetStars();
        nameInput.value = '';
        emailInput.value = '';
        cnpjInput.value = '';
        commentsTextarea.value = '';
    }

    // --- Lógica de atualização do dashboard ---
    // Calcula métricas (média, total) e renderiza listas (comentários recentes,
    // feedbacks completos). A atualização utiliza apenas os arrays mantidos
    // em memória (`allRatings`, `allComments`, `allFeedbacks`).
    function updateDashboard() {
        if (allRatings.length === 0) {
            averageRatingDisplay.textContent = '--';
            totalRatingsDisplay.textContent = '0';
            recentCommentsList.innerHTML = '<li>Nenhum comentário ainda.</li>';
            return;
        }

        const sumRatings = allRatings.reduce((sum, rating) => sum + rating, 0);
        const average = (sumRatings / allRatings.length).toFixed(1);

        averageRatingDisplay.textContent = average;
        totalRatingsDisplay.textContent = allRatings.length;

        recentCommentsList.innerHTML = '';
        if (allComments.length > 0) {
            allComments.slice(-5).reverse().forEach(comment => {
                const li = document.createElement('li');
                li.textContent = comment;
                recentCommentsList.appendChild(li);
            });
        } else {
            recentCommentsList.innerHTML = '<li>Nenhum comentário recente.</li>';
        }

        // Exibe todos os feedbacks completos no painel.
        // A lista é invertida para mostrar primeiro os registros mais recentes.
        allFeedbacksList.innerHTML = '';
        if (allFeedbacks.length > 0) {
            allFeedbacks.slice().reverse().forEach(feedback => {
                const feedbackCard = document.createElement('div');
                feedbackCard.className = 'feedback-card';
                feedbackCard.innerHTML = `
                    Nome: ${feedback.nome}<br> 
                    Email: ${feedback.email}<br>
                    CNPJ: ${feedback.cnpj}<br>
                    Avaliação: ${feedback.rating} estrela(s)<br>
                    Comentário: ${feedback.comment}<br>
                    Enviado em: ${feedback.createdAt}
                `;
                allFeedbacksList.appendChild(feedbackCard);
            });
        } else {
            allFeedbacksList.innerHTML = '<p>Nenhum feedback registrado ainda.</p>';
        }
    }

    // Atualiza o dashboard ao carregar a página pela primeira vez.
    updateDashboard();
});
