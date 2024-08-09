let attachmentCounter = 1; // Contador para nomear os anexos
let attachments = [];

function addAttachment() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const attachmentList = document.getElementById('attachmentList');

        // Verifica se já existe um fieldset, caso contrário, cria um
        let fieldset = document.querySelector('#attachmentList fieldset');
        if (!fieldset) {
            fieldset = document.createElement('fieldset');
            const legend = document.createElement('legend');
            legend.textContent = 'Itens';
            fieldset.appendChild(legend);
            attachmentList.appendChild(fieldset);
        }

        // Criação do item de anexo
        const attachmentItem = document.createElement('div');
        attachmentItem.className = 'attachment-item';

        // Botão de remoção com ícone
        const removeBtn = document.createElement('button');
        removeBtn.className = 'action-btn';
        const removeIcon = document.createElement('img');
        removeIcon.src = 'icons/fluigicon-trash.png'; 
        removeIcon.alt = 'Remover';
        removeBtn.appendChild(removeIcon);
        removeBtn.onclick = function() {
            attachmentItem.remove();
            attachments = attachments.filter(a => a !== file); // Remover o arquivo da lista de anexos
            if (fieldset.childElementCount === 1) { // Se o fieldset estiver vazio exceto pela legenda
                fieldset.remove();
            }
        };
        attachmentItem.appendChild(removeBtn);

        // Botão de visualizar com ícone
        const viewBtn = document.createElement('button');
        viewBtn.className = 'action-btn';
        const viewIcon = document.createElement('img');
        viewIcon.src = 'icons/fluigicon-eye-open.png'; 
        viewIcon.alt = 'Visualizar';
        viewBtn.appendChild(viewIcon);
        viewBtn.onclick = function() {
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name; // Nome do arquivo para download
            a.click();
            URL.revokeObjectURL(url);
        };
        attachmentItem.appendChild(viewBtn);

        // Nome do documento
        const fileName = document.createElement('span');
        fileName.textContent = `Documento Anexo ${attachmentCounter}`;
        attachmentItem.appendChild(fileName);

        // Adiciona o item ao fieldset
        fieldset.appendChild(attachmentItem);

        // Adiciona o arquivo à lista de anexos
        attachments.push(file);

        // Incrementa o contador
        attachmentCounter++;

        // Limpa o input de arquivo
        fileInput.value = '';
    } else {
        alert('Selecione um arquivo para anexar.');
    }
}

function updateAttachmentTable() {
    const attachmentTableBody = document.querySelector('#attachmentTable tbody');
    attachmentTableBody.innerHTML = '';
    attachments.forEach((attachment, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${attachment.name}</td>
            <td><button type="button" class="btn btn-danger" onclick="removeAttachment(${index})">Remover</button></td>
        `;
        attachmentTableBody.appendChild(row);
    });
}

function removeAttachment(index) {
    attachments.splice(index, 1);
    updateAttachmentTable();
}
