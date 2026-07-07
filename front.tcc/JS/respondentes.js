document.addEventListener("DOMContentLoaded", () => {
    const feedbackSearch = document.getElementById("feedbackSearch");
    const dateFilter = document.getElementById("dateFilter");
    const filterChips = document.querySelectorAll(".btn-filter-chip");
    const sectorFilter = document.getElementById("sectorFilter");
    const feedbackListContainer = document.getElementById("feedbackList");
    const btnBackMenu = document.getElementById('back-button');

    // Sample Data (replace with actual data from an API)
    let feedbacks = [
        {
            id: 1,
            name: "Marcela Fernandes",
            initials: "MF",
            timestamp: "Hoje, 10:49",
            text: "O fardo de leite condensado veio com alguns furinhos, tive que retirar da embalagem.",
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
        },
        {
            id: 5,
            name: "Bruno Silva",
            initials: "BS",
            timestamp: "Ontem, 09:00",
            text: "A entrega foi super rápida, parabéns!",
            sector: "service",
            product: null,
            type: "compliment",
            status: "read"
        },
        {
            id: 6,
            name: "Carla Dias",
            initials: "CD",
            timestamp: "2 dias atrás, 16:30",
            text: "Sugiro mais opções de pagamento no site.",
            sector: "commercial",
            product: null,
            type: "suggestion",
            status: "unread"
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

    const renderFeedbacks = (filteredFeedbacks) => {
        feedbackListContainer.innerHTML = "";
        if (filteredFeedbacks.length === 0) {
            feedbackListContainer.innerHTML = 
                `<div style="text-align: center; padding: 2rem; color: var(--text-muted);">Nenhum feedback encontrado.</div>`;
            return;
        }

        filteredFeedbacks.forEach(feedback => {
            const feedbackItem = document.createElement("div");
            feedbackItem.classList.add("feedback-item");
            feedbackItem.dataset.id = feedback.id;

            const productTag = feedback.product ? `<span class="tag tag-product">${feedback.product}</span>` : "";

            feedbackItem.innerHTML = `
                <div class="avatar">${feedback.initials}</div>
                <div class="feedback-content">
                    <div class="feedback-header">
                        <span class="respondent-name">${feedback.name}</span>
                        <span class="feedback-timestamp">${feedback.timestamp}</span>
                    </div>
                    <p class="feedback-text">${feedback.text}</p>
                    <div class="feedback-tags-actions">
                        <div class="tags-group">
                            <span class="tag ${getTagClass(feedback.sector)}">${feedback.sector.toUpperCase()}</span>
                            ${productTag}
                        </div>
                        <div class="feedback-actions">
                            <button class="action-btn primary reply-feedback" data-id="${feedback.id}">
                                <i class="fas fa-reply"></i> Responder
                            </button>
                            <button class="action-btn mark-resolved" data-id="${feedback.id}">
                                <i class="fas fa-check-circle"></i> Resolvido
                            </button>
                            <button class="action-btn view-history" data-id="${feedback.id}">
                                <i class="fas fa-history"></i> Histórico
                            </button>
                        </div>
                    </div>
                </div>
            `;
            feedbackListContainer.appendChild(feedbackItem);
        });
        addFeedbackActionListeners();
    };

    const applyFilters = () => {
        let filtered = [...feedbacks];

        // Search Filter
        const searchTerm = feedbackSearch.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(f => 
                f.name.toLowerCase().includes(searchTerm) || 
                f.text.toLowerCase().includes(searchTerm) ||
                (f.product && f.product.toLowerCase().includes(searchTerm))
            );
        }

        // Date Filter (simplified for demo)
        const selectedDateFilter = dateFilter.value;
        // In a real app, this would involve date parsing and comparison
        if (selectedDateFilter === "today") {
            filtered = filtered.filter(f => f.timestamp.includes("Hoje"));
        } else if (selectedDateFilter === "yesterday") {
            filtered = filtered.filter(f => f.timestamp.includes("Ontem"));
        }

        // Chip Filters (All, Unread, Complaint, Compliment, Suggestion)
        const activeChip = document.querySelector(".btn-filter-chip.active");
        if (activeChip && activeChip.dataset.filter !== "all") {
            const filterType = activeChip.dataset.filter;
            if (filterType === "unread") {
                filtered = filtered.filter(f => f.status === "unread");
            } else {
                filtered = filtered.filter(f => f.type === filterType);
            }
        }

        // Sector Filter
        const selectedSector = sectorFilter.value;
        if (selectedSector !== "all") {
            filtered = filtered.filter(f => f.sector === selectedSector);
        }

        renderFeedbacks(filtered);
    };

    const addFeedbackActionListeners = () => {
        document.querySelectorAll(".reply-feedback").forEach(button => {
            button.addEventListener("click", (e) => {
                const feedbackId = e.currentTarget.dataset.id;
                alert(`Abrindo caixa de resposta para o feedback ${feedbackId}`);
                // Implement modal or inline reply form
            });
        });

        document.querySelectorAll(".mark-resolved").forEach(button => {
            button.addEventListener("click", (e) => {
                const feedbackId = e.currentTarget.dataset.id;
                const feedbackIndex = feedbacks.findIndex(f => f.id == feedbackId);
                if (feedbackIndex !== -1) {
                    feedbacks[feedbackIndex].status = "resolved";
                    alert(`Feedback ${feedbackId} marcado como resolvido.`);
                    applyFilters(); // Re-render to update status visually
                }
            });
        });

        document.querySelectorAll(".view-history").forEach(button => {
            button.addEventListener("click", (e) => {
                const feedbackId = e.currentTarget.dataset.id;
                const feedback = feedbacks.find(f => f.id == feedbackId);
                alert(`Visualizando histórico de interações com ${feedback.name}`);
                // Implement sidebar or new page for customer history
            });
        });
    };

    // Event Listeners
    feedbackSearch.addEventListener("input", applyFilters);
    dateFilter.addEventListener("change", applyFilters);
    sectorFilter.addEventListener("change", applyFilters);

    filterChips.forEach(chip => {
        chip.addEventListener("click", (e) => {
            filterChips.forEach(c => c.classList.remove("active"));
            e.currentTarget.classList.add("active");
            applyFilters();
        });
    });

    // Back to Menu functionality
    btnBackMenu.addEventListener('click',() => {
        window.location.href = '../HTML/menu.html';
    });

    // Initial render
    applyFilters();
});