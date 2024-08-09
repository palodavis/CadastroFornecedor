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