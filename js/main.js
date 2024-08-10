// Função para salvar fornecedor
function saveSupplier() {
    // Validar os campos obrigatórios
    if (!validateForm()) {
        return;
    }

    // Mostrar modal de loading
    $('#loadingModal').css('display', 'flex');

    // Obter dados do fornecedor
    const supplierData = {
        razaoSocial: $('#razaoSocial').val(),
        nomeFantasia: $('#nomeFantasia').val(),
        cnpj: $('#cnpj').val(),
        inscricaoEstadual: $('#inscricaoEstadual').val(),
        inscricaoMunicipal: $('#inscricaoMunicipal').val(),
        nomeContato: $('#nomeContato').val(),
        telefoneContato: $('#telefoneContato').val(),
        emailContato: $('#emailContato').val(),
        cep: $('#cep').val(),
        endereco: $('#endereco').val(),
        numero: $('#numero').val(),
        complemento: $('#complemento').val(),
        bairro: $('#bairro').val(),
        municipio: $('#municipio').val(),
        estado: $('#estado').val(),
        produtos: products.map((product, index) => ({
            indice: index + 1,
            descricaoProduto: product.description,
            unidadeMedida: product.unitMeasure,
            qtdeEstoque: product.quantity,
            valorUnitario: product.unitPrice,
            valorTotal: product.totalPrice
        })),
        anexos: []
    };

    // Converter anexos para base64 e adicionar ao JSON
    const promises = attachments.map(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = function() {
                const base64String = reader.result.split(',')[1];
                supplierData.anexos.push({
                    indice: attachments.indexOf(file) + 1,
                    nomeArquivo: file.name,
                    blobArquivo: base64String
                });
                resolve();
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    });

    // Os arquivos sejam convertidos antes de continuar
    Promise.all(promises).then(() => {
        // Formatar JSON 
        const formattedJSON = JSON.stringify(supplierData, null, 4);

        // Exibir JSON no console
        console.log(formattedJSON);

        // Simulação de salvamento dos dados
        setTimeout(() => {
            // Fechar o modal de loading após a simulação de salvamento
            $('#loadingModal').css('display', 'none');
            alert("Fornecedor salvo com sucesso!");
            // Limpar campos do formulário
            clearSupplierForm();
        }, 2000);
    }).catch(error => {
        console.error('Erro ao processar anexos:', error);
        $('#loadingModal').css('display', 'none');
        alert("Erro ao salvar o fornecedor.");
    });
}

// Função para limpar o formulário
function clearSupplierForm() {
    // Limpar valores dos campos
    $('#razaoSocial').val('');
    $('#nomeFantasia').val('');
    $('#cnpj').val('');
    $('#inscricaoEstadual').val('');
    $('#inscricaoMunicipal').val('');
    $('#nomeContato').val('');
    $('#telefoneContato').val('');
    $('#emailContato').val('');
    $('#cep').val('');
    $('#endereco').val('');
    $('#numero').val('');
    $('#complemento').val('');
    $('#bairro').val('');
    $('#municipio').val('');
    $('#estado').val('');
    $('#attachmentList').empty();  // Limpar lista de anexos
    attachments = []; // Limpar lista de anexos
}
