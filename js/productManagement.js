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
    updateProductDisplay();
    clearProductForm();
}

function updateProductDisplay() {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        // Criação do container do produto
        const productContainer = document.createElement('div');
        productContainer.className = 'product-item-container';

        // Criação do botão de remoção com ícone
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.type = 'button';
        removeBtn.onclick = () => removeProduct(index);
        const removeIcon = document.createElement('img');
        removeIcon.src = 'icons/fluigicon-trash.png';
        removeIcon.alt = 'Remover';
        removeBtn.appendChild(removeIcon);

        // Criação do formulário do produto
        const productForm = document.createElement('form');
        productForm.className = 'product-form';
        productForm.innerHTML = `
            <h3>Produto ${index + 1}</h3> <!-- Atualiza o título do formulário -->
            <div class="row">
                <!-- Descrição do produto -->
                <div class="col-xs-12 col-md-12">
                    <div class="input-container">
                        <label>Descrição</label>
                        <input type="text" class="form-control" value="${product.description}" readonly>
                    </div>
                </div>
                <!-- Unidade de Medida -->
                <div class="col-xs-12 col-md-3">
                    <div class="input-container">
                        <label>Unidade de Medida</label>
                        <input type="text" class="form-control" value="${product.unitMeasure}" readonly>
                    </div>
                </div>
                <!-- Quantidade em Estoque -->
                <div class="col-xs-12 col-md-3">
                    <div class="input-container">
                        <label>Quantidade em Estoque</label>
                        <input type="number" class="form-control" value="${product.quantity}" readonly>
                    </div>
                </div>
                <!-- Valor Unitário -->
                <div class="col-xs-12 col-md-3">
                    <div class="input-container">
                        <label>Valor Unitário</label>
                        <input type="number" class="form-control" value="${product.unitPrice}" readonly>
                    </div>
                </div>
                <!-- Valor Total -->
                <div class="col-xs-12 col-md-3">
                    <div class="input-container">
                        <label>Valor Total</label>
                        <input type="number" class="form-control" value="${product.totalPrice}" readonly>
                    </div>
                </div>
            </div>
        `;

        // Adiciona o formulário e o botão de remoção ao container do produto
        productContainer.appendChild(removeBtn);
        productContainer.appendChild(productForm);

        // Adiciona o container do produto à lista de produtos
        productList.appendChild(productContainer);
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
    updateProductDisplay();
}
