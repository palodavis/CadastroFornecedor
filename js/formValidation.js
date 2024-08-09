// Função para validar o formato do e-mail
function validateEmail(email) {
    // Expressão regular para validar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para formatar o telefone com a máscara (XX) XXXXX-XXXX
function formatPhoneNumber(value) {
    // Remove tudo que não é número
    const cleaned = ('' + value).replace(/\D/g, '');

    // Aplica a máscara
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return value;
}

// Função para validar o telefone com base na máscara e tipo numérico
function validatePhoneNumber(inputElement) {
    const phoneNumber = inputElement.value.trim();
    const errorElement = document.getElementById(inputElement.id + 'Error');
    const containerElement = inputElement.parentElement; // Usar o parentElement

    // Expressão regular para validar o formato do telefone
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

    if (!phoneRegex.test(phoneNumber)) {
        containerElement.classList.remove('success');
        containerElement.classList.add('error');
        errorElement.textContent = 'Telefone: deve estar no formato (XX) XXXXX-XXXX';
    } else {
        containerElement.classList.remove('error');
        containerElement.classList.add('success');
        errorElement.textContent = '';
    }
}

// Função de validação para o formulário
function validateForm(event) {
    let isValid = true;
    let errorMessage = '';

    // Valida Razão Social
    const razaoSocial = document.getElementById('razaoSocial');
    if (razaoSocial.value.trim() === '') {
        document.getElementById('razaoSocialError').textContent = 'Razão Social: obrigatório';
        razaoSocial.parentElement.classList.add('error');
        isValid = false;
        errorMessage += 'Razão Social: obrigatório\n';
    } else {
        document.getElementById('razaoSocialError').textContent = '';
        razaoSocial.parentElement.classList.remove('error');
        razaoSocial.parentElement.classList.add('success');
    }

    // Valida Nome Fantasia
    const nomeFantasia = document.getElementById('nomeFantasia');
    if (nomeFantasia.value.trim() === '') {
        document.getElementById('nomeFantasiaError').textContent = 'Nome Fantasia: obrigatório';
        nomeFantasia.parentElement.classList.add('error');
        isValid = false;
        errorMessage += 'Nome Fantasia: obrigatório\n';
    } else {
        document.getElementById('nomeFantasiaError').textContent = '';
        nomeFantasia.parentElement.classList.remove('error');
        nomeFantasia.parentElement.classList.add('success');
    }

    // Valida CNPJ
    const cnpj = document.getElementById('cnpj');
    if (cnpj.value.trim() === '') {
        document.getElementById('cnpjError').textContent = 'CNPJ: obrigatório';
        cnpj.parentElement.classList.add('error');
        isValid = false;
        errorMessage += 'CNPJ: obrigatório\n';
    } else {
        document.getElementById('cnpjError').textContent = '';
        cnpj.parentElement.classList.remove('error');
        cnpj.parentElement.classList.add('success');
    }

    // Valida Nome do Contato
    const nomeContato = document.getElementById('nomeContato');
    if (nomeContato.value.trim() === '') {
        document.getElementById('nomeContatoError').textContent = 'Nome da pessoa de contato: obrigatório';
        nomeContato.parentElement.classList.add('error');
        isValid = false;
        errorMessage += 'Nome da pessoa de contato: obrigatório\n';
    } else {
        document.getElementById('nomeContatoError').textContent = '';
        nomeContato.parentElement.classList.remove('error');
        nomeContato.parentElement.classList.add('success');
    }

    // Valida Telefone
    const telefoneContato = document.getElementById('telefoneContato');
    if (telefoneContato.value.trim() === '') {
        document.getElementById('telefoneContatoError').textContent = 'Telefone: obrigatório';
        telefoneContato.parentElement.classList.add('error');
        isValid = false;
        errorMessage += 'Telefone: obrigatório\n';
    } else {
        // Valida o telefone com base na máscara
        validatePhoneNumber(telefoneContato);
        if (telefoneContato.parentElement.classList.contains('error')) {
            isValid = false;
            errorMessage += 'Telefone: formato inválido\n';
        }
    }

    // Valida E-mail
    const emailContato = document.getElementById('emailContato');
    if (emailContato.value.trim() === '') {
        document.getElementById('emailContatoError').textContent = 'E-mail: obrigatório';
        emailContato.parentElement.classList.add('error');
        isValid = false;
        errorMessage += 'E-mail: obrigatório\n';
    } else if (!validateEmail(emailContato.value.trim())) {
        document.getElementById('emailContatoError').textContent = 'E-mail: formato inválido';
        emailContato.parentElement.classList.add('error');
        isValid = false;
        errorMessage += 'E-mail: formato inválido\n';
    } else {
        document.getElementById('emailContatoError').textContent = '';
        emailContato.parentElement.classList.remove('error');
        emailContato.parentElement.classList.add('success');
    }

    // Valida Endereço
    const endereco = document.getElementById('endereco');
    if (endereco.value.trim() === '') {
        document.getElementById('enderecoError').textContent = 'Endereço: obrigatório';
        endereco.parentElement.classList.add('error');
        isValid = false;
        errorMessage += 'Endereço: obrigatório\n';
    } else {
        document.getElementById('enderecoError').textContent = '';
        endereco.parentElement.classList.remove('error');
        endereco.parentElement.classList.add('success');
    }

    // Valida CEP
    const cep = document.getElementById('cep');
    if (cep.value.trim() === '') {
        document.getElementById('cepError').textContent = 'CEP: obrigatório';
        cep.parentElement.classList.add('error');
        isValid = false;
        errorMessage += 'CEP: obrigatório\n';
    } else {
        document.getElementById('cepError').textContent = '';
        cep.parentElement.classList.remove('error');
        cep.parentElement.classList.add('success');
    }

    if (!isValid) {
        alert('Por favor, corrija os seguintes erros:\n' + errorMessage);
        event.preventDefault(); // Impede o envio do formulário
    }

    return isValid;
}

// Função de validação para os campos enquanto são digitados
function validateField(inputElement) {
    const errorElement = document.getElementById(inputElement.id + 'Error');
    const containerElement = inputElement.parentElement; // Usar o parentElement

    if (inputElement.checkValidity()) {
        if (inputElement.id === 'telefoneContato') {
            // Formata o número enquanto o usuário digita
            inputElement.value = formatPhoneNumber(inputElement.value);
            validatePhoneNumber(inputElement);
        } else {
            containerElement.classList.remove('error');
            containerElement.classList.add('success');
            errorElement.textContent = '';
        }
    } else {
        containerElement.classList.remove('success');
        containerElement.classList.add('error');
        errorElement.textContent = inputElement.validationMessage;
    }
}

// Função para validar o formulário de produtos
function validateProductForm() {
    let isValid = true;
    let errorMessage = '';

    // Valida Descrição
    const productDescription = document.getElementById('productDescription');
    if (productDescription.value.trim() === '') {
        document.getElementById('productDescriptionError').textContent = 'Descrição: obrigatório';
        productDescription.parentElement.classList.add('error');
        isValid = false;
        errorMessage += 'Descrição: obrigatório\n';
    } else {
        document.getElementById('productDescriptionError').textContent = '';
        productDescription.parentElement.classList.remove('error');
        productDescription.parentElement.classList.add('success');
    }

    // Valida Unidade de Medida
    const unitMeasure = document.getElementById('unitMeasure');
    if (unitMeasure.value.trim() === '') {
        document.getElementById('unitMeasureError').textContent = 'Unidade de Medida: obrigatório';
        unitMeasure.parentElement.classList.add('error');
        isValid = false;
        errorMessage += 'Unidade de Medida: obrigatório\n';
    } else {
        document.getElementById('unitMeasureError').textContent = '';
        unitMeasure.parentElement.classList.remove('error');
        unitMeasure.parentElement.classList.add('success');
    }

    // Valida Quantidade em Estoque
    const quantity = document.getElementById('quantity');
    if (quantity.value.trim() === '') {
        document.getElementById('quantityError').textContent = 'Quantidade em Estoque: obrigatório';
        quantity.parentElement.classList.add('error');
        isValid = false;
        errorMessage += 'Quantidade em Estoque: obrigatório\n';
    } else {
        document.getElementById('quantityError').textContent = '';
        quantity.parentElement.classList.remove('error');
        quantity.parentElement.classList.add('success');
    }

    // Valida Valor Unitário
    const unitPrice = document.getElementById('unitPrice');
    if (unitPrice.value.trim() === '') {
        document.getElementById('unitPriceError').textContent = 'Valor Unitário: obrigatório';
        unitPrice.parentElement.classList.add('error');
        isValid = false;
        errorMessage += 'Valor Unitário: obrigatório\n';
    } else {
        document.getElementById('unitPriceError').textContent = '';
        unitPrice.parentElement.classList.remove('error');
        unitPrice.parentElement.classList.add('success');
    }

    // Valida Valor Total
    const totalPrice = document.getElementById('totalPrice');
    if (totalPrice.value.trim() === '') {
        document.getElementById('totalPriceError').textContent = 'Valor Total: obrigatório';
        totalPrice.parentElement.classList.add('error');
        isValid = false;
        errorMessage += 'Valor Total: obrigatório\n';
    } else {
        document.getElementById('totalPriceError').textContent = '';
        totalPrice.parentElement.classList.remove('error');
        totalPrice.parentElement.classList.add('success');
    }

    if (!isValid) {
        alert('Por favor, corrija os seguintes erros:\n' + errorMessage);
    }

    return isValid;
}

// Adiciona o evento de validação a todos os campos
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', () => validateField(input));
});
