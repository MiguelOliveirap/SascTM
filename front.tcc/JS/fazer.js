document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const wordCountElement = document.getElementById('word-count');
    const backButton = document.querySelector('.back-button');
    const saveBtn = document.querySelector('.save-btn');
    const exportBtn = document.querySelector('.export-btn');
    const toolbarBtns = document.querySelectorAll('.toolbar-btn');
    const insertBtns = document.querySelectorAll('.insert-btn');

    // Função para contar palavras
    function updateWordCount() {
        const text = editor.innerText || '';
        const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        wordCountElement.textContent = words;
    }

    // Atualizar contagem de palavras ao digitar
    editor.addEventListener('input', () => {
        updateWordCount();
        // Aqui você pode adicionar lógica de salvamento automático
        console.log('Conteúdo alterado, salvando automaticamente...');
    });

    // Limpar placeholder ao começar a digitar
    editor.addEventListener('focus', () => {
        if (editor.innerText === 'Escreva seu relatório aqui...') {
            editor.innerText = '';
        }
    });

    // Restaurar placeholder se estiver vazio
    editor.addEventListener('blur', () => {
        if (editor.innerText.trim() === '') {
            editor.innerText = 'Escreva seu relatório aqui...';
        }
    });

    // Funções de formatação de texto
    function applyFormat(command, value = null) {
        document.execCommand(command, false, value);
        editor.focus();
    }

    // Adicionar listeners aos botões da toolbar
    toolbarBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            switch (index) {
                case 0: // Negrito
                    applyFormat('bold');
                    break;
                case 1: // Itálico
                    applyFormat('italic');
                    break;
                case 2: // Sublinhado
                    applyFormat('underline');
                    break;
                case 3: // Título
                    applyFormat('formatBlock', '<h2>');
                    break;
                case 4: // Lista
                    applyFormat('insertUnorderedList');
                    break;
                case 5: // Lista Ordenada
                    applyFormat('insertOrderedList');
                    break;
                case 6: // Link
                    const url = prompt('Digite a URL:');
                    if (url) applyFormat('createLink', url);
                    break;
                case 7: // Inserir Imagem
                    const imgUrl = prompt('Digite a URL da imagem:');
                    if (imgUrl) applyFormat('insertImage', imgUrl);
                    break;
                case 8: // Tabela
                    insertTable();
                    break;
                case 9: // Alinhar Esquerda
                    applyFormat('justifyLeft');
                    break;
                case 10: // Alinhar Centro
                    applyFormat('justifyCenter');
                    break;
                case 11: // Alinhar Direita
                    applyFormat('justifyRight');
                    break;
            }
        });
    });

    // Função para inserir tabela
    function insertTable() {
        const rows = prompt('Número de linhas:', '3');
        const cols = prompt('Número de colunas:', '3');
        
        if (rows && cols) {
            let table = '<table border="1" style="width: 100%; border-collapse: collapse;"><tr>';
            for (let j = 0; j < cols; j++) {
                table += '<td style="padding: 8px; border: 1px solid #ddd;">Coluna ' + (j + 1) + '</td>';
            }
            table += '</tr>';
            for (let i = 1; i < rows; i++) {
                table += '<tr>';
                for (let j = 0; j < cols; j++) {
                    table += '<td style="padding: 8px; border: 1px solid #ddd;"></td>';
                }
                table += '</tr>';
            }
            table += '</table><br>';
            document.execCommand('insertHTML', false, table);
            editor.focus();
        }
    }

    // Botão de voltar
    backButton.addEventListener('click', () => {
        if (editor.innerText.trim() !== 'Escreva seu relatório aqui...' && editor.innerText.trim() !== '') {
            if (confirm('Você tem alterações não salvas. Deseja sair mesmo assim?')) {
                window.history.back();
            }
        } else {
            window.history.back();
        }
    });

    // Botão de salvar rascunho
    saveBtn.addEventListener('click', () => {
        const content = editor.innerHTML;
        localStorage.setItem('relatorio_rascunho', content);
        alert('Rascunho salvo com sucesso!');
    });

    // Botão de exportar
    exportBtn.addEventListener('click', () => {
        const content = editor.innerHTML;
        const format = prompt('Escolha o formato de exportação:\n1 - PDF\n2 - DOCX\n3 - TXT');
        
        if (format === '1') {
            exportPDF(content);
        } else if (format === '2') {
            exportDOCX(content);
        } else if (format === '3') {
            exportTXT(content);
        }
    });

    // Função para exportar como PDF (simulada)
    function exportPDF(content) {
        alert('Exportando como PDF...\n\nEm um ambiente de produção, isso geraria um arquivo PDF com o conteúdo do relatório.');
        console.log('Conteúdo para PDF:', content);
    }

    // Função para exportar como DOCX (simulada)
    function exportDOCX(content) {
        alert('Exportando como DOCX...\n\nEm um ambiente de produção, isso geraria um arquivo DOCX com o conteúdo do relatório.');
        console.log('Conteúdo para DOCX:', content);
    }

    // Função para exportar como TXT (simulada)
    function exportTXT(content) {
        const text = editor.innerText;
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'relatorio.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    // Botões de ações rápidas
    insertBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            switch (index) {
                case 0: // Inserir Gráfico
                    alert('Funcionalidade de inserir gráfico em desenvolvimento!');
                    break;
                case 1: // Inserir Tabela
                    insertTable();
                    break;
                case 2: // Inserir Template
                    loadTemplate();
                    break;
            }
        });
    });

    // Função para carregar template
    function loadTemplate() {
        const template = `
            <h2>Relatório de Desempenho</h2>
            <p><strong>Período:</strong> 01/06/2026 - 07/07/2026</p>
            
            <h3>Resumo Executivo</h3>
            <p>Insira aqui um resumo dos principais pontos do relatório.</p>
            
            <h3>Indicadores Chave de Desempenho (KPIs)</h3>
            <ul>
                <li>Total de Feedbacks: 367</li>
                <li>Problemas Identificados: 22</li>
                <li>Resoluções: 14</li>
            </ul>
            
            <h3>Análise por Setor</h3>
            <p>Descreva o desempenho de cada setor aqui.</p>
            
            <h3>Conclusões e Recomendações</h3>
            <p>Insira suas conclusões e recomendações para o próximo período.</p>
        `;
        
        editor.innerHTML = template;
        updateWordCount();
        alert('Template carregado com sucesso!');
    }

    // Carregar rascunho salvo ao abrir a página
    const savedDraft = localStorage.getItem('relatorio_rascunho');
    if (savedDraft) {
        const loadDraft = confirm('Você tem um rascunho salvo. Deseja carregá-lo?');
        if (loadDraft) {
            editor.innerHTML = savedDraft;
            updateWordCount();
        }
    }

    // Inicializar contagem de palavras
    updateWordCount();
});