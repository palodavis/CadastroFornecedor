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

    // Espera que todos os arquivos sejam convertidos antes de continuar
    Promise.all(promises).then(() => {
        // Formatar JSON 
        const formattedJSON = JSON.stringify(supplierData, null, 4);

        // Exibir JSON no console
        console.log(formattedJSON);

        // Simulação de salvamento dos dados
        setTimeout(() => {
            // Fechar o modal de loading após a simulação de salvamento
            document.getElementById('loadingModal').style.display = 'none';
            alert("Fornecedor salvo com sucesso!");
        }, 2000);
    }).catch(error => {
        console.error('Erro ao processar anexos:', error);
        document.getElementById('loadingModal').style.display = 'none';
        alert("Erro ao salvar o fornecedor.");
    });
}