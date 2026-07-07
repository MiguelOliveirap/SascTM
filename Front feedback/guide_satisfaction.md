# Sistema de Atendimento de Satisfação do Cliente

Este projeto demonstra a criação de uma interface moderna e funcional para coletar o feedback dos clientes. O sistema utiliza HTML5, CSS3 e JavaScript puro (Vanilla JS), com foco em uma experiência de usuário (UX) intuitiva e design responsivo.

## Componentes do Sistema

O sistema é composto por dois módulos principais integrados na mesma página:

1.  **Formulário de Avaliação**: Uma interface limpa onde o cliente pode selecionar uma nota de 1 a 5 estrelas e deixar um comentário opcional.
2.  **Dashboard de Resultados**: Uma área que exibe métricas em tempo real, como a média das avaliações e o total de feedbacks recebidos, além de uma lista dos comentários mais recentes.

### Estrutura Técnica

| Tecnologia | Função no Projeto |
| :--- | :--- |
| **HTML5** | Define a estrutura semântica do formulário, as seções de dashboard e os elementos de entrada. |
| **CSS3** | Responsável pelo design moderno, cores, tipografia, efeitos de hover nas estrelas e adaptação para dispositivos móveis (responsividade). |
| **JavaScript** | Gerencia a lógica de seleção de estrelas, validação do formulário, simulação de envio de dados e atualização dinâmica do dashboard. |
| **Font Awesome** | Biblioteca de ícones utilizada para exibir as estrelas de avaliação de forma profissional. |

## Como Funciona a Interatividade

O JavaScript (`script.js`) controla todo o comportamento dinâmico:

*   **Sistema de Estrelas**: Ao passar o mouse, as estrelas mudam de cor para indicar a nota potencial. Ao clicar, a nota é fixada.
*   **Envio de Dados**: O botão de envio valida se uma nota foi selecionada. Se sim, os dados são "enviados" (simulado no console) e adicionados às métricas do dashboard.
*   **Atualização em Tempo Real**: O dashboard calcula a média das notas e exibe o total de avaliações instantaneamente após cada envio, sem recarregar a página.
*   **Feedback Visual**: Mensagens de sucesso ou erro são exibidas temporariamente para guiar o usuário.

## Instruções de Uso

1.  **Arquivos**: Certifique-se de que `index.html`, `style.css` e `script.js` estejam na mesma pasta.
2.  **Execução**: Abra o arquivo `index.html` em qualquer navegador moderno.
3.  **Teste**: Selecione as estrelas, escreva um comentário e clique em "Enviar Avaliação". Veja o dashboard aparecer com os resultados atualizados.

Este projeto serve como uma excelente base para sistemas reais, podendo ser facilmente conectado a um banco de dados via API para persistir as avaliações.
