document.addEventListener("DOMContentLoaded", () => {
    const globalSearchInput = document.getElementById("globalSearchInput");
    const recentFeedbacksList = document.getElementById("recentFeedbacksList");

    // Sample data for recent feedbacks (can be replaced with actual data from an API)
    const recentFeedbacks = [
        {
            id: 1,
            name: "Marcela Fernandes",
            initials: "MF",
            timestamp: "Hoje, 10:49",
            text: "O fardo de leite condensado veio com alguns furinhos...",
            sector: "quality",
            product: "LEITE CONDENSADO",
            type: "complaint",
            status: "unread"
        },
        {
            id: 2,
            name: "Soso Careca",
            initials: "SC",
            timestamp: "Hoje, 14:29",
            text: "O doce de leite é muito doce e muito líquido.....",
            sector: "commercial",
            product: "DOCE DE LEITE",
            type: "complaint",
            status: "unread"
        },
        {
            id: 3,
            name: "Kaio Ferreira",
            initials: "KF",
            timestamp: "Ontem, 23:24",
            text: "Tive um excelente atendimento, eficaz na hora...",
            sector: "service",
            product: null,
            type: "compliment",
            status: "read"
        },
        {
            id: 4,
            name: "Antonella Braga",
            initials: "AB",
            timestamp: "Hoje, 10:49",
            text: "O doce da goiabada não é tão doce quanto meu pirulito...",
            sector: "removed",
            product: "GOIABADA",
            type: "complaint",
            status: "read"
        }
    ];

    const getTagClass = (sector) => {
        switch (sector) {
            case "quality": return "tag-quality";
            case "commercial": return "tag-commercial";
            case "service": return "tag-service";
            case "removed": return "tag-removed";
            default: return "";
        }
    };

    const renderRecentFeedbacks = (feedbacksToRender) => {
        recentFeedbacksList.innerHTML = "";
        feedbacksToRender.forEach(feedback => {
            const feedbackItem = document.createElement("div");
            feedbackItem.classList.add("feedback-item");

            const productTag = feedback.product ? `<span class="tag tag-product">${feedback.product}</span>` : "";

            feedbackItem.innerHTML = `
                <div class="avatar-small">${feedback.initials}</div>
                <div class="feedback-content">
                    <div class="feedback-meta">
                        <span class="respondent-name">${feedback.name}</span>
                        <span class="feedback-timestamp">${feedback.timestamp}</span>
                    </div>
                    <p class="feedback-text-preview">${feedback.text}</p>
                    <div class="feedback-tags-actions">
                        <div class="tags-group">
                            <span class="tag ${getTagClass(feedback.sector)}">${feedback.sector.toUpperCase()}</span>
                            ${productTag}
                        </div>
                        <div class="feedback-actions-mini">
                            <button class="action-btn-mini" title="Responder"><i class="fas fa-reply"></i></button>
                            <button class="action-btn-mini" title="Marcar como Lido"><i class="fas fa-check"></i></button>
                        </div>
                    </div>
                </div>
            `;
            recentFeedbacksList.appendChild(feedbackItem);
        });
    };

    // Global Search Functionality (simplified for demo)
    globalSearchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // In a real application, this would trigger a global search across the entire system
        // For this demo, we'll just filter the recent feedbacks
        const filteredFeedbacks = recentFeedbacks.filter(f => 
            f.name.toLowerCase().includes(searchTerm) ||
            f.text.toLowerCase().includes(searchTerm) ||
            (f.product && f.product.toLowerCase().includes(searchTerm)) ||
            f.sector.toLowerCase().includes(searchTerm)
        );
        renderRecentFeedbacks(filteredFeedbacks);
    });

    // Initial render of recent feedbacks
    renderRecentFeedbacks(recentFeedbacks);

    // Interatividade nos itens do menu
    const menuActions = {
        Setores: () => window.location.href = '../HTML/setores.html',
        Relatorio: () => window.location.href = '../HTML/relatorio.html',
        Produtos: () => window.location.href = '../HTML/produtos.html',
        Respondentes: () => window.location.href = '../HTML/respondentes.html'
    };

        document.querySelectorAll('.nav-card').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            const name = item.querySelector('span').innerText.trim();

            if (page) {
                window.location.href = page;
            } else {
                openModal(name, `<p>Você acessou a seção de <strong>${name}</strong>.</p><p>Esta funcionalidade está em desenvolvimento para o ambiente de produção.</p>`);
            }
        });
    });

    // Notification and Settings button actions (example)
    document.querySelector(".fa-bell").closest("button").addEventListener("click", () => {
        alert("Abrindo central de notificações...");
    });

    document.querySelector(".fa-cog").closest("button").addEventListener("click", () => {
        alert("Abrindo configurações do sistema...");
    });
});