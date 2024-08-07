$(document).ready(function () {
    // Função para calcular o valor total automaticamente
    $('#quantity, #unitPrice').on('input', function () {
        let quantity = parseFloat($('#quantity').val());
        let unitPrice = parseFloat($('#unitPrice').val());
        let totalPrice = quantity * unitPrice;
        $('#totalPrice').val(totalPrice.toFixed(2));
    });

    // Função para auto-preencher endereço pelo CEP
    $('#address').on('input', function () {
        let cep = $(this).val();
        if (cep.length === 8) {
            $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
                if (!("erro" in data)) {
                    $('#address').val(data.logradouro);
                }
            });
        }
    });

    // Função para salvar os dados e exibir o JSON no console
    $('#supplierForm').submit(function (event) {
        event.preventDefault();
        let formData = {
            companyName: $('#companyName').val(),
            fantasyName: $('#fantasyName').val(),
            cnpj: $('#cnpj').val(),
            stateRegistration: $('#stateRegistration').val(),
            municipalRegistration: $('#municipalRegistration').val(),
            address: $('#address').val(),
            contactPerson: $('#contactPerson').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            products: [{
                description: $('#productDescription').val(),
                unitMeasure: $('#unitMeasure').val(),
                quantity: $('#quantity').val(),
                unitPrice: $('#unitPrice').val(),
                totalPrice: $('#totalPrice').val()
            }],
            attachments: [] // Aqui você pode adicionar lógica para os anexos
        };
        console.log(JSON.stringify(formData));
        // Aqui você pode implementar a lógica para enviar o JSON
    });
});
