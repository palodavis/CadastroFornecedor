let products = [];
let attachments = [];

function toggleDropdown() {
    const dropdown = document.getElementById('unitMeasureDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function selectUnit(unit) {
    document.getElementById('unitMeasure').value = unit;
    document.getElementById('dropdownMenuButton').innerText = unit;
    toggleDropdown(); // Fechar o dropdown após a seleção
}

function calculateTotal() {
    const quantity = document.getElementById('quantity').value;
    const unitPrice = document.getElementById('unitPrice').value;
    document.getElementById('totalPrice').value = (quantity * unitPrice).toFixed(2);
}

function addProduct() {
    const description = document.getElementById('productDescription').value;
    const unitMeasure = document.getElementById('unitMeasure').value;
    const quantity = document.getElementById('quantity').value;
    const unitPrice = document.getElementById('unitPrice').value;
    const totalPrice = document.getElementById('totalPrice').value;

    if (!description || !unitMeasure || !quantity || !unitPrice) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    products.push({ description, unitMeasure, quantity, unitPrice, totalPrice });
    updateProductTable();
    clearProductForm();
}

function updateProductTable() {
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.description}</td>
            <td>${product.unitMeasure}</td>
            <td>${product.quantity}</td>
            <td>${product.unitPrice}</td>
            <td>${product.totalPrice}</td>
            <td><button type="button" class="btn btn-danger" onclick="removeProduct(${index})">Remover</button></td>
        `;
        productTableBody.appendChild(row);
    });
}

function clearProductForm() {
    document.getElementById('productDescription').value = '';
    document.getElementById('unitMeasure').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('unitPrice').value = '';
    document.getElementById('totalPrice').value = '';
    document.getElementById('dropdownMenuButton').innerText = 'Selecione a Unidade';
}

function removeProduct(index) {
    products.splice(index, 1);
    updateProductTable();
}

let attachmentCounter = 1; // Contador para nomear os anexos

function addAttachment() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const attachmentList = document.getElementById('attachmentList');
        
        // Criação do item de anexo
        const attachmentItem = document.createElement('div');
        attachmentItem.className = 'attachment-item';
        
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
        
        // Botão de remoção com ícone
        const removeBtn = document.createElement('button');
        removeBtn.className = 'action-btn';
        const removeIcon = document.createElement('img');
        removeIcon.src = 'icons/fluigicon-trash.png'; 
        removeIcon.alt = 'Remover';
        removeBtn.appendChild(removeIcon);
        removeBtn.onclick = function() {
            attachmentItem.remove();
        };
        attachmentItem.appendChild(removeBtn);
        
        // Nome do documento
        const fileName = document.createElement('span');
        fileName.textContent = `Documento Anexo ${attachmentCounter}`;
        attachmentItem.appendChild(fileName);
        
        // Adiciona o item à lista de anexos
        attachmentList.appendChild(attachmentItem);
        
        // Incrementa o contador
        attachmentCounter++;
        
        // Limpa o input de arquivo
        fileInput.value = '';
    } else {
        alert('Selecione um arquivo para anexar.');
    }
}


// function addAttachment() {
//     const fileInput = document.getElementById('fileInput');
//     const file = fileInput.files[0];

//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             attachments.push({ name: file.name, content: e.target.result });
//             updateAttachmentTable();
//         };
//         reader.readAsDataURL(file);
//     }
// }

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

function saveSupplier() {

    // Validar os campos obrigatórios
    if (!validateForm()) {
        return;
    }

    // Mostrar modal de loading
    document.getElementById('loadingModal').style.display = 'flex';

    // Obter dados do fornecedor
    const supplierData = {
        razaoSocial: document.getElementById('razaoSocial').value,
        nomeFantasia: document.getElementById('nomeFantasia').value,
        cnpj: document.getElementById('cnpj').value,
        inscricaoEstadual: document.getElementById('inscricaoEstadual').value,
        inscricaoMunicipal: document.getElementById('inscricaoMunicipal').value,
        nomeContato: document.getElementById('nomeContato').value,
        telefoneContato: document.getElementById('telefoneContato').value,
        emailContato: document.getElementById('emailContato').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        municipio: document.getElementById('municipio').value,
        estado: document.getElementById('estado').value,
        produtos: products.map((product, index) => ({
            indice: index + 1,
            descricaoProduto: product.description,
            unidadeMedida: product.unitMeasure,
            qtdeEstoque: product.quantity,
            valorUnitario: product.unitPrice,
            valorTotal: product.totalPrice
        })),
        anexos: attachments.map((attachment, index) => ({
            indice: index + 1,
            nomeArquivo: attachment.name,
            blobArquivo: attachment.data
        }))
    };

    // Formatar JSON 
    const formattedJSON = `
    {
        razaoSocial: '${supplierData.razaoSocial}',
        nomeFantasia: '${supplierData.nomeFantasia}',
        cnpj: '${supplierData.cnpj}',
        inscricaoEstadual: '${supplierData.inscricaoEstadual}',
        inscricaoMunicipal: '${supplierData.inscricaoMunicipal}',
        nomeContato: '${supplierData.nomeContato}',
        telefoneContato: '${supplierData.telefoneContato}',
        emailContato: '${supplierData.emailContato}',
        cep: '${supplierData.cep}',
        endereco: '${supplierData.endereco}',
        numero: '${supplierData.numero}',
        complemento: '${supplierData.complemento}',
        bairro: '${supplierData.bairro}',
        municipio: '${supplierData.municipio}',
        estado: '${supplierData.estado}',
        produtos: [
            ${supplierData.produtos.map(product => `
                {
                    indice: ${product.indice},
                    descricaoProduto: '${product.descricaoProduto}',
                    unidadeMedida: '${product.unidadeMedida}',
                    qtdeEstoque: '${product.qtdeEstoque}',
                    valorUnitario: '${product.valorUnitario}',
                    valorTotal: '${product.valorTotal}'
                }
            `).join(',')}
        ],
        anexos: [
            ${supplierData.anexos.map(attachment => `
                {
                    indice: ${attachment.indice},
                    nomeArquivo: '${attachment.nomeArquivo}',
                    blobArquivo: '${attachment.blobArquivo}'
                }
            `).join(',')}
        ]
    }`;

    // Exibir JSON no console
    console.log(formattedJSON);

    // Simulação de salvamento dos dados
    setTimeout(() => {
        // Fechar o modal de loading após a simulação de salvamento
        document.getElementById('loadingModal').style.display = 'none';
        alert("Fornecedor salvo com sucesso!");
    }, 2000);
}

function fetchAddress() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');

    if (cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('endereco').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('municipio').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                } else {
                    alert('CEP não encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o endereço:', error);
                alert('Erro ao buscar o endereço. Verifique o CEP e tente novamente.');
            });
    }
}

function validateForm() {
    let isValid = true;

    // Valida Razão Social
    const razaoSocial = document.getElementById('razaoSocial');
    if (razaoSocial.value.trim() === '') {
        document.getElementById('razaoSocialError').textContent = 'Razão Social: obrigatório';
        isValid = false;
    } else {
        document.getElementById('razaoSocialError').textContent = '';
    }

    // Valida Nome Fantasia
    const nomeFantasia = document.getElementById('nomeFantasia');
    if (nomeFantasia.value.trim() === '') {
        document.getElementById('nomeFantasiaError').textContent = 'Nome Fantasia: obrigatório';
        isValid = false;
    } else {
        document.getElementById('nomeFantasiaError').textContent = '';
    }

    // Valida CNPJ
    const cnpj = document.getElementById('cnpj');
    if (cnpj.value.trim() === '') {
        document.getElementById('cnpjError').textContent = 'CNPJ: obrigatório';
        isValid = false;
    } else {
        document.getElementById('cnpjError').textContent = '';
    }

    // Valida Nome do Contato
    const nomeContato = document.getElementById('nomeContato');
    if (nomeContato.value.trim() === '') {
        document.getElementById('nomeContatoError').textContent = 'Nome da pessoa de contato: obrigatório';
        isValid = false;
    } else {
        document.getElementById('nomeContatoError').textContent = '';
    }

    // Valida Telefone
    const telefoneContato = document.getElementById('telefoneContato');
    if (telefoneContato.value.trim() === '') {
        document.getElementById('telefoneContatoError').textContent = 'Telefone: obrigatório';
        isValid = false;
    } else {
        document.getElementById('telefoneContatoError').textContent = '';
    }

    // Valida E-mail
    const emailContato = document.getElementById('emailContato');
    if (emailContato.value.trim() === '') {
        document.getElementById('emailContatoError').textContent = 'E-mail: obrigatório';
        isValid = false;
    } else {
        document.getElementById('emailContatoError').textContent = '';
    }

    // Valida Endereço
    const endereco = document.getElementById('endereco');
    if (endereco.value.trim() === '') {
        document.getElementById('enderecoError').textContent = 'Endereço: obrigatório';
        isValid = false;
    } else {
        document.getElementById('enderecoError').textContent = '';
    }

    // Valida CEP
    const cep = document.getElementById('cep');
    if (cep.value.trim() === '') {
        document.getElementById('cepError').textContent = 'CEP: obrigatório';
        isValid = false;
    } else {
        document.getElementById('cepError').textContent = '';
    }

    // Se o formulário for válido, exibe o modal de loading e salva os dados
    if (isValid) {
        saveSupplier();
    } else {
        alert('Por favor, corrija os erros no formulário antes de continuar.');
    }
}
