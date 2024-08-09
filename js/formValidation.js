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
