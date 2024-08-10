let attachmentCounter = 1; // Contador para nomear os anexos
let attachments = [];

// Função para adicionar arquivos
function addAttachment() {
    const fileInput = $('#fileInput');
    const file = fileInput[0].files[0];
    
    if (file) {
        const attachmentList = $('#attachmentList');

        // Verifica se já existe um fieldset, caso contrário, cria um
        let $fieldset = $('#attachmentList fieldset');
        if ($fieldset.length === 0) {
            $fieldset = $('<fieldset>').append('<legend>Itens</legend>');
            attachmentList.append($fieldset);
        }

        // Criação do item de anexo
        const $attachmentItem = $('<div>').addClass('attachment-item');

        // Botão de remoção com ícone
        const $removeBtn = $('<button>').addClass('action-btn');
        const $removeIcon = $('<img>').attr('src', 'icons/fluigicon-trash.png').attr('alt', 'Remover');
        $removeBtn.append($removeIcon).click(function() {
            $attachmentItem.remove();
            attachments = attachments.filter(a => a !== file); // Remover o arquivo da lista de anexos
            if ($fieldset.children().length === 1) { // Se o fieldset estiver vazio exceto pela legenda
                $fieldset.remove();
            }
        });
        $attachmentItem.append($removeBtn);

        // Botão de visualizar com ícone
        const $viewBtn = $('<button>').addClass('action-btn');
        const $viewIcon = $('<img>').attr('src', 'icons/fluigicon-eye-open.png').attr('alt', 'Visualizar');
        $viewBtn.append($viewIcon).click(function() {
            const url = URL.createObjectURL(file);
            const $a = $('<a>').attr('href', url).attr('download', file.name); // Nome do arquivo para download
            $a[0].click();
            URL.revokeObjectURL(url);
        });
        $attachmentItem.append($viewBtn);

        // Nome do documento
        const $fileName = $('<span>').text(`Documento Anexo ${attachmentCounter}`);
        $attachmentItem.append($fileName);

        // Adiciona o item ao fieldset
        $fieldset.append($attachmentItem);

        // Adiciona o arquivo à lista de anexos
        attachments.push(file);

        // Incrementa o contador
        attachmentCounter++;

        // Limpa o input de arquivo
        fileInput.val('');
    } else {
        alert('Selecione um arquivo para anexar.');
    }
}

// Atualizar tabela dos arquivos
function updateAttachmentTable() {
    const $attachmentTableBody = $('#attachmentTable tbody');
    $attachmentTableBody.empty();
    attachments.forEach((attachment, index) => {
        const $row = $('<tr>').html(`
            <td>${attachment.name}</td>
            <td><button type="button" class="btn btn-danger" onclick="removeAttachment(${index})">Remover</button></td>
        `);
        $attachmentTableBody.append($row);
    });
}

// Remoção do arquivo
function removeAttachment(index) {
    attachments.splice(index, 1);
    updateAttachmentTable();
}
