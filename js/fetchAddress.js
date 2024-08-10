// Função para buscar CEP via API usando jQuery
function fetchAddress() {
    var cep = $('#cep').val().replace(/\D/g, '');

    if (cep) {
        $.ajax({
            url: `https://viacep.com.br/ws/${cep}/json/`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (!data.erro) {
                    $('#endereco').val(data.logradouro);
                    $('#bairro').val(data.bairro);
                    $('#municipio').val(data.localidade);
                    $('#estado').val(data.uf);
                } else {
                    alert('CEP não encontrado.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Erro ao buscar o endereço:', errorThrown);
                alert('Erro ao buscar o endereço. Verifique o CEP e tente novamente.');
            }
        });
    }
}
