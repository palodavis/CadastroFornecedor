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
function validatePhoneNumber($inputElement) {
    const phoneNumber = $inputElement.val().trim();
    const $errorElement = $('#' + $inputElement.attr('id') + 'Error');
    const $containerElement = $inputElement.parent(); // Usar o parentElement

    // Expressão regular para validar o formato do telefone
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

    if (!phoneRegex.test(phoneNumber)) {
        $containerElement.removeClass('success').addClass('error');
        $errorElement.text('Telefone: deve estar no formato (XX) XXXXX-XXXX');
    } else {
        $containerElement.removeClass('error').addClass('success');
        $errorElement.text('');
    }
}

// Função de validação para o formulário
function validateForm(event) {
    let isValid = true;
    let errorMessage = '';

    // Valida Razão Social
    const $razaoSocial = $('#razaoSocial');
    if ($razaoSocial.val().trim() === '') {
        $('#razaoSocialError').text('Razão Social: obrigatório');
        $razaoSocial.parent().addClass('error');
        isValid = false;
        errorMessage += 'Razão Social: obrigatório\n';
    } else {
        $('#razaoSocialError').text('');
        $razaoSocial.parent().removeClass('error').addClass('success');
    }

    // Valida Nome Fantasia
    const $nomeFantasia = $('#nomeFantasia');
    if ($nomeFantasia.val().trim() === '') {
        $('#nomeFantasiaError').text('Nome Fantasia: obrigatório');
        $nomeFantasia.parent().addClass('error');
        isValid = false;
        errorMessage += 'Nome Fantasia: obrigatório\n';
    } else {
        $('#nomeFantasiaError').text('');
        $nomeFantasia.parent().removeClass('error').addClass('success');
    }

    // Valida CNPJ
    const $cnpj = $('#cnpj');
    if ($cnpj.val().trim() === '') {
        $('#cnpjError').text('CNPJ: obrigatório');
        $cnpj.parent().addClass('error');
        isValid = false;
        errorMessage += 'CNPJ: obrigatório\n';
    } else {
        $('#cnpjError').text('');
        $cnpj.parent().removeClass('error').addClass('success');
    }

    // Valida Nome do Contato
    const $nomeContato = $('#nomeContato');
    if ($nomeContato.val().trim() === '') {
        $('#nomeContatoError').text('Nome da pessoa de contato: obrigatório');
        $nomeContato.parent().addClass('error');
        isValid = false;
        errorMessage += 'Nome da pessoa de contato: obrigatório\n';
    } else {
        $('#nomeContatoError').text('');
        $nomeContato.parent().removeClass('error').addClass('success');
    }

    // Valida Telefone
    const $telefoneContato = $('#telefoneContato');
    if ($telefoneContato.val().trim() === '') {
        $('#telefoneContatoError').text('Telefone: obrigatório');
        $telefoneContato.parent().addClass('error');
        isValid = false;
        errorMessage += 'Telefone: obrigatório\n';
    } else {
        // Valida o telefone com base na máscara
        validatePhoneNumber($telefoneContato);
        if ($telefoneContato.parent().hasClass('error')) {
            isValid = false;
            errorMessage += 'Telefone: formato inválido\n';
        }
    }

    // Valida E-mail
    const $emailContato = $('#emailContato');
    if ($emailContato.val().trim() === '') {
        $('#emailContatoError').text('E-mail: obrigatório');
        $emailContato.parent().addClass('error');
        isValid = false;
        errorMessage += 'E-mail: obrigatório\n';
    } else if (!validateEmail($emailContato.val().trim())) {
        $('#emailContatoError').text('E-mail: formato inválido');
        $emailContato.parent().addClass('error');
        isValid = false;
        errorMessage += 'E-mail: formato inválido\n';
    } else {
        $('#emailContatoError').text('');
        $emailContato.parent().removeClass('error').addClass('success');
    }

    // Valida Endereço
    const $endereco = $('#endereco');
    if ($endereco.val().trim() === '') {
        $('#enderecoError').text('Endereço: obrigatório');
        $endereco.parent().addClass('error');
        isValid = false;
        errorMessage += 'Endereço: obrigatório\n';
    } else {
        $('#enderecoError').text('');
        $endereco.parent().removeClass('error').addClass('success');
    }

    // Valida CEP
    const $cep = $('#cep');
    if ($cep.val().trim() === '') {
        $('#cepError').text('CEP: obrigatório');
        $cep.parent().addClass('error');
        isValid = false;
        errorMessage += 'CEP: obrigatório\n';
    } else {
        $('#cepError').text('');
        $cep.parent().removeClass('error').addClass('success');
    }

    if (!isValid) {
        alert('Por favor, corrija os seguintes erros:\n' + errorMessage);
        event.preventDefault(); // Impede o envio do formulário
    }

    return isValid;
}

// Função de validação para os campos enquanto são digitados
function validateField($inputElement) {
    const $errorElement = $('#' + $inputElement.attr('id') + 'Error');
    const $containerElement = $inputElement.parent(); // Usar o parentElement

    if ($inputElement[0].checkValidity()) {
        if ($inputElement.attr('id') === 'telefoneContato') {
            // Formata o número enquanto o usuário digita
            $inputElement.val(formatPhoneNumber($inputElement.val()));
            validatePhoneNumber($inputElement);
        } else {
            $containerElement.removeClass('error').addClass('success');
            $errorElement.text('');
        }
    } else {
        $containerElement.removeClass('success').addClass('error');
        $errorElement.text($inputElement[0].validationMessage);
    }
}

// Função para validar o formulário de produtos
function validateProductForm() {
    let isValid = true;
    let errorMessage = '';

    // Valida Descrição
    const $productDescription = $('#productDescription');
    if ($productDescription.val().trim() === '') {
        $('#productDescriptionError').text('Descrição: obrigatório');
        $productDescription.parent().addClass('error');
        isValid = false;
        errorMessage += 'Descrição: obrigatório\n';
    } else {
        $('#productDescriptionError').text('');
        $productDescription.parent().removeClass('error').addClass('success');
    }

    // Valida Unidade de Medida
    const $unitMeasure = $('#unitMeasure');
    if ($unitMeasure.val().trim() === '') {
        $('#unitMeasureError').text('Unidade de Medida: obrigatório');
        $unitMeasure.parent().addClass('error');
        isValid = false;
        errorMessage += 'Unidade de Medida: obrigatório\n';
    } else {
        $('#unitMeasureError').text('');
        $unitMeasure.parent().removeClass('error').addClass('success');
    }

    // Valida Quantidade em Estoque
    const $quantity = $('#quantity');
    if ($quantity.val().trim() === '') {
        $('#quantityError').text('Quantidade em Estoque: obrigatório');
        $quantity.parent().addClass('error');
        isValid = false;
        errorMessage += 'Quantidade em Estoque: obrigatório\n';
    } else {
        $('#quantityError').text('');
        $quantity.parent().removeClass('error').addClass('success');
    }

    // Valida Valor Unitário
    const $unitPrice = $('#unitPrice');
    if ($unitPrice.val().trim() === '') {
        $('#unitPriceError').text('Valor Unitário: obrigatório');
        $unitPrice.parent().addClass('error');
        isValid = false;
        errorMessage += 'Valor Unitário: obrigatório\n';
    } else {
        $('#unitPriceError').text('');
        $unitPrice.parent().removeClass('error').addClass('success');
    }

    // Valida Valor Total
    const $totalPrice = $('#totalPrice');
    if ($totalPrice.val().trim() === '') {
        $('#totalPriceError').text('Valor Total: obrigatório');
        $totalPrice.parent().addClass('error');
        isValid = false;
        errorMessage += 'Valor Total: obrigatório\n';
    } else {
        $('#totalPriceError').text('');
        $totalPrice.parent().removeClass('error').addClass('success');
    }

    if (!isValid) {
        alert('Por favor, corrija os seguintes erros:\n' + errorMessage);
    }

    return isValid;
}

$('.form-control').on('input', function() {
    validateField($(this));
});