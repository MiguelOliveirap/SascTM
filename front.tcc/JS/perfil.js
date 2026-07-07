document.addEventListener('DOMContentLoaded', () => {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsDropdown = document.getElementById('settings-dropdown');
    const btnBackMenu = document.getElementById('back-button');
    const btnEditProfile = document.getElementById('btnEditProfile');
    const sidebar = document.getElementById('editProfileSidebar');
    const overlay = document.getElementById('overlay');
    const closeSidebar = document.getElementById('closeSidebar');
    const cancelEdit = document.getElementById('cancelEdit');
    const editProfileForm = document.getElementById('editProfileForm');

    // Toggle do dropdown de configurações
    if (settingsBtn && settingsDropdown) {
        settingsBtn.addEventListener('click', (event) => {
            settingsDropdown.classList.toggle('show');
            event.stopPropagation(); // Impede que o clique se propague para o documento
        });

        // Fechar o dropdown se clicar fora dele
        document.addEventListener('click', (event) => {
            if (!settingsDropdown.contains(event.target) && !settingsBtn.contains(event.target)) {
                settingsDropdown.classList.remove('show');
            }
        });
    }

    // Placeholder para o botão de editar avatar
    const editAvatarBtn = document.querySelector('.edit-avatar-btn');
    if (editAvatarBtn) {
        editAvatarBtn.addEventListener('click', () => {
            alert('Funcionalidade de editar avatar em desenvolvimento!');
            // Aqui você pode adicionar lógica para upload de imagem, etc.
        });
    }

    // Placeholder para o botão de editar informações do perfil
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            alert('Funcionalidade de editar informações do perfil em desenvolvimento!');
            // Aqui você pode redirecionar para uma página de edição ou abrir um modal
        });
    }

    // Placeholders para botões de segurança
    const securityActionBtns = document.querySelectorAll('.security-action-btn');
    securityActionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert(`Ação de '${btn.textContent}' em desenvolvimento!`);
            // Adicionar lógica específica para cada botão de segurança
        });
    });

    // Placeholder para links do dropdown de configurações
    const dropdownLinks = settingsDropdown ? settingsDropdown.querySelectorAll('a') : [];
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Para o link de Sair, podemos adicionar uma confirmação
            if (link.classList.contains('logout')) {
                if (confirm('Tem certeza que deseja sair?')) {
                    alert('Saindo...');
                    // Lógica de logout aqui
                } else {
                    event.preventDefault(); // Impede a navegação se o usuário cancelar
                }
            } else {
                alert(`Navegando para: ${link.textContent}`);
                // Lógica de navegação para as outras páginas
            }
            settingsDropdown.classList.remove('show'); // Fecha o dropdown após o clique
        });
    });

    // Placeholder para o botão de voltar
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = '../HTML/menu.html';
            // window.history.back(); // Para voltar na história do navegador
            // Ou redirecionar para uma página específica, ex: window.location.href = 'index.html';
        });
    }

    // Função para abrir a aba lateral
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede o scroll do fundo
    }

    // Função para fechar a aba lateral
    function closeSidebarFunc() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaura o scroll
    }

    // Eventos de clique
    btnEditProfile.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarFunc);
    cancelEdit.addEventListener('click', closeSidebarFunc);
    overlay.addEventListener('click', closeSidebarFunc);

    // Fechar ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebarFunc();
        }
    });

    // Lógica de submissão do formulário
    editProfileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você adicionaria a lógica para salvar os dados
        console.log('Dados salvos!');
        
        // Fecha a aba após salvar
        closeSidebarFunc();
        
        // Opcional: Feedback visual de sucesso
        alert('Informações atualizadas com sucesso!');
    });
});    
