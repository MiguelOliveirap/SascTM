document.addEventListener('DOMContentLoaded', () => {
    const productSearch = document.getElementById('productSearch');
    const statusFilter = document.getElementById('statusFilter');
    const sortFilter = document.getElementById('sortFilter');
    const productsTableBody = document.getElementById('productsTableBody');
    const btnAddProduct = document.getElementById('btnAddProduct');
    const addProductSidebar = document.getElementById('addProductSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('overlay');
    const cancelAddProduct = document.getElementById('cancelAddProduct');
    const productForm = document.getElementById('productForm');
    const btnExportProducts = document.getElementById('btnExportProducts');
    const btnBackMenu = document.getElementById('back-button');

    // Sample data (can be replaced with actual data from an API)
    let products = [
        { name: 'Goiabada tablete 400g', id: '35465656', feedbacks: 91, rating: 3, status: 'active' },
        { name: 'Creme de Avelã 300g', id: '24354569', feedbacks: 344, rating: 5, status: 'active' },
        { name: 'Doce pastoso com leite 300g', id: '90890987', feedbacks: 257, rating: 5, status: 'inactive' },
        { name: 'Leite condensado semidesnatado 340g', id: '47689000', feedbacks: 103, rating: 3, status: 'active' },
        { name: 'Leite em pó integral 400g', id: '56778935', feedbacks: 74, rating: 2, status: 'inactive' },
        { name: 'Creme de leite leve UHT 1.010 kg', id: '09343434', feedbacks: 86, rating: 3, status: 'active' },
        { name: 'Biscoito Cream Cracker 200g', id: '11223344', feedbacks: 150, rating: 4, status: 'active' },
        { name: 'Café Torrado e Moído 500g', id: '22334455', feedbacks: 200, rating: 4, status: 'active' },
        { name: 'Arroz Branco Tipo 1 5kg', id: '33445566', feedbacks: 50, rating: 1, status: 'inactive' },
        { name: 'Feijão Carioca Tipo 1 1kg', id: '44556677', feedbacks: 120, rating: 3, status: 'active' },
    ];

    const renderStars = (rating) => {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<i class="${i <= rating ? 'fas' : 'far'} fa-star"></i>`;
        }
        return starsHtml;
    };

    const renderTable = (data) => {
        productsTableBody.innerHTML = '';
        data.forEach(product => {
            const row = document.createElement('tr');
            const statusClass = product.status === 'active' ? 'status-active' : 'status-inactive';
            const statusText = product.status === 'active' ? 'ATIVO' : 'INATIVO';
            const toggleIcon = product.status === 'active' ? 'fa-toggle-on' : 'fa-toggle-off';

            row.innerHTML = `
                <td><input type="checkbox" class="product-checkbox"></td>
                <td>
                    <div class="product-name">${product.name}</div>
                </td>
                <td class="product-id">${product.id}</td>
                <td>
                    <span class="feedback-count">${product.feedbacks}</span>
                    <span class="star-rating">${renderStars(product.rating)}</span>
                </td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td class="table-actions">
                    <button class="action-btn edit-product" data-id="${product.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn toggle-status" data-id="${product.id}"><i class="fas ${toggleIcon}"></i></button>
                    <button class="action-btn delete-product" data-id="${product.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            productsTableBody.appendChild(row);
        });
        addTableEventListeners();
    };

    const filterAndSortProducts = () => {
        let filteredProducts = [...products];

        // Search
        const searchTerm = productSearch.value.toLowerCase();
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                p.id.toLowerCase().includes(searchTerm)
            );
        }

        // Filter by Status
        const selectedStatus = statusFilter.value;
        if (selectedStatus !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.status === selectedStatus);
        }

        // Sort
        const sortOption = sortFilter.value;
        filteredProducts.sort((a, b) => {
            if (sortOption === 'feedback_desc') {
                return b.feedbacks - a.feedbacks;
            } else if (sortOption === 'rating_desc') {
                return b.rating - a.rating;
            } else if (sortOption === 'name_asc') {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });

        renderTable(filteredProducts);
    };

    const addTableEventListeners = () => {
        // Edit Product
        document.querySelectorAll('.edit-product').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                alert(`Editar produto com ID: ${productId}`);
                // In a real app, you'd populate the sidebar form with product data
                // and open the sidebar for editing.
            });
        });

        // Toggle Status
        document.querySelectorAll('.toggle-status').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                const productIndex = products.findIndex(p => p.id === productId);
                if (productIndex !== -1) {
                    products[productIndex].status = products[productIndex].status === 'active' ? 'inactive' : 'active';
                    filterAndSortProducts(); // Re-render table with updated status
                    alert(`Status do produto ${productId} alterado para ${products[productIndex].status.toUpperCase()}`);
                }
            });
        });

        // Delete Product
        document.querySelectorAll('.delete-product').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                if (confirm(`Tem certeza que deseja excluir o produto com ID: ${productId}?`)) {
                    products = products.filter(p => p.id !== productId);
                    filterAndSortProducts(); // Re-render table
                    alert(`Produto ${productId} excluído com sucesso.`);
                }
            });
        });
    };

    // Event Listeners for Filters and Search
    productSearch.addEventListener('input', filterAndSortProducts);
    statusFilter.addEventListener('change', filterAndSortProducts);
    sortFilter.addEventListener('change', filterAndSortProducts);

    // Sidebar functionality
    const openSidebar = () => {
        addProductSidebar.classList.add('open');
        overlay.classList.add('open');
    };

    const closeSidebarFn = () => {
        addProductSidebar.classList.remove('open');
        overlay.classList.remove('open');
        productForm.reset(); // Clear form on close
    };

    btnAddProduct.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarFn);
    overlay.addEventListener('click', closeSidebarFn);
    cancelAddProduct.addEventListener('click', closeSidebarFn);

    // Handle new product submission
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newProduct = {
            name: document.getElementById('productName').value,
            id: document.getElementById('productId').value,
            category: document.getElementById('productCategory').value,
            price: document.getElementById('productPrice').value,
            status: document.getElementById('productStatus').value,
            feedbacks: 0, // New products start with 0 feedbacks
            rating: 0 // New products start with 0 rating
        };

        // Basic validation (more robust validation needed in a real app)
        if (!newProduct.name || !newProduct.id) {
            alert('Nome e ID do produto são obrigatórios!');
            return;
        }

        // Check for duplicate ID
        if (products.some(p => p.id === newProduct.id)) {
            alert('Já existe um produto com este ID. Por favor, use um ID único.');
            return;
        }

        products.push(newProduct);
        filterAndSortProducts(); // Re-render table with new product
        alert(`Produto '${newProduct.name}' adicionado com sucesso!`);
        closeSidebarFn();
    });

    // Export Products functionality
    btnExportProducts.addEventListener('click', () => {
        alert('Exportando lista de produtos (simulação)...');
        // In a real application, you would generate and download a file (CSV, Excel, PDF)
        console.log('Export data:', products);
    });

    // Back to Menu functionality
    btnBackMenu.addEventListener('click',() => {
        window.location.href = '../HTML/menu.html';
    });

    // Initial render of the table
    filterAndSortProducts();
});