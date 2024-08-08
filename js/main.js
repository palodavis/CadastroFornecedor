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

$(document).ready(function() {
    $('#dropdownMenuButton').on('click', function() {
        $('#unitMeasureDropdown').toggle();
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.btn-group').length) {
            $('#unitMeasureDropdown').hide();
        }
    });
});

function selectUnit(unit) {
    $('#unitMeasure').val(unit);
    $('#dropdownMenuButton').html(unit + ' <span class="caret"></span>');
    $('#unitMeasureDropdown').hide();
}

let attachments = [];

function addAttachment() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64File = e.target.result;
            attachments.push({ name: file.name, data: base64File });
            sessionStorage.setItem('attachments', JSON.stringify(attachments));
            updateAttachmentTable();
        };
        reader.readAsDataURL(file);
    }
}

function updateAttachmentTable() {
    const attachmentTable = document.getElementById('attachmentTable').getElementsByTagName('tbody')[0];
    attachmentTable.innerHTML = '';
    attachments.forEach((attachment, index) => {
        const row = attachmentTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);

        cell1.textContent = attachment.name;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-xs';
        deleteButton.innerHTML = '<img src="/icons/fluigicon-trash.png" alt="Excluir">';
        deleteButton.onclick = () => deleteAttachment(index);

        const viewButton = document.createElement('button');
        viewButton.className = 'btn btn-info btn-xs';
        viewButton.innerHTML = '<img src="/icons/fluigicon-eye-open.png" alt="Visualizar">';
        viewButton.onclick = () => viewAttachment(index);

        cell2.appendChild(deleteButton);
        cell2.appendChild(viewButton);
    });
}

function deleteAttachment(index) {
    attachments.splice(index, 1);
    sessionStorage.setItem('attachments', JSON.stringify(attachments));
    updateAttachmentTable();
}

function viewAttachment(index) {
    const attachment = attachments[index];
    const link = document.createElement('a');
    link.href = attachment.data;
    link.download = attachment.name;
    link.click();
}

window.onload = function () {
    const storedAttachments = sessionStorage.getItem('attachments');
    if (storedAttachments) {
        attachments = JSON.parse(storedAttachments);
        updateAttachmentTable();
    }
};