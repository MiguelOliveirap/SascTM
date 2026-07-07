
/**
 * Função para alternar visibilidade da senha
 */
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.innerHTML = '<span class="eye-icon"><img src="../IMAGEM/hidden.png"></span>';
    } else {
        passwordInput.type = 'password';
        toggleButton.innerHTML = '<span class="eye-icon"><img src="../IMAGEM/eye.png"></span>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const companyId = document.getElementById('company-id').value;
            const password = document.getElementById('password').value;

            // Validação simples
            if (email && companyId && password) {
                // Validar email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Por favor, insira um email válido');
                    return;
                }

                // Aqui você pode adicionar lógica de autenticação com backend
                console.log('Login com:', {
                    email: email,
                    companyId: companyId,
                    password: password
                });
                
                // Simular login bem-sucedido
                // Armazenar token (simulado)
                localStorage.setItem('userToken', 'token_' + Date.now());
                localStorage.setItem('userEmail', email);
                localStorage.setItem('companyId', companyId);
                
                // Redirecionar para dashboard
                navigateTo('../HTML/menu.html');
            } else {
                alert('Por favor, preencha todos os campos');
            }
        });
    }
});
