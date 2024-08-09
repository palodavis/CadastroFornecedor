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
        productContainer.className = 'row product-item';

        // Botão de Remoção
        const removeDiv = document.createElement('div');
        removeDiv.className = 'col-xs-12 col-md-1';
        const removeBtn = document.createElement('button');
        removeBtn.className = 'action-btn';
        removeBtn.type = 'button';
        removeBtn.onclick = () => removeProduct(index);
        const removeIcon = document.createElement('img');
        removeIcon.src = 'icons/fluigicon-trash.png';
        removeIcon.alt = 'Remover';
        removeBtn.appendChild(removeIcon);
        removeDiv.appendChild(removeBtn);
        productContainer.appendChild(removeDiv);

        // Descrição do produto
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'col-xs-12 col-md-2';
        descriptionDiv.innerHTML = `
            <div class="input-container">
                <label>Descrição</label>
                <input type="text" class="form-control" value="${product.description}" readonly>
            </div>
        `;
        productContainer.appendChild(descriptionDiv);

        // Unidade de Medida
        const unitMeasureDiv = document.createElement('div');
        unitMeasureDiv.className = 'col-xs-12 col-md-2';
        unitMeasureDiv.innerHTML = `
            <div class="input-container">
                <label>Unidade de Medida</label>
                <input type="text" class="form-control" value="${product.unitMeasure}" readonly>
            </div>
        `;
        productContainer.appendChild(unitMeasureDiv);

        // Quantidade em Estoque
        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'col-xs-12 col-md-2';
        quantityDiv.innerHTML = `
            <div class="input-container">
                <label>Quantidade em Estoque</label>
                <input type="number" class="form-control" value="${product.quantity}" readonly>
            </div>
        `;
        productContainer.appendChild(quantityDiv);

        // Valor Unitário
        const unitPriceDiv = document.createElement('div');
        unitPriceDiv.className = 'col-xs-12 col-md-2';
        unitPriceDiv.innerHTML = `
            <div class="input-container">
                <label>Valor Unitário</label>
                <input type="number" class="form-control" value="${product.unitPrice}" readonly>
            </div>
        `;
        productContainer.appendChild(unitPriceDiv);

        // Valor Total
        const totalPriceDiv = document.createElement('div');
        totalPriceDiv.className = 'col-xs-12 col-md-2';
        totalPriceDiv.innerHTML = `
            <div class="input-container">
                <label>Valor Total</label>
                <input type="number" class="form-control" value="${product.totalPrice}" readonly>
            </div>
        `;
        productContainer.appendChild(totalPriceDiv);

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
