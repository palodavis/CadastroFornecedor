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
    updateProductTable();
    clearProductForm();
}

function updateProductTable() {
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.description}</td>
            <td>${product.unitMeasure}</td>
            <td>${product.quantity}</td>
            <td>${product.unitPrice}</td>
            <td>${product.totalPrice}</td>
            <td><button type="button" class="btn btn-danger" onclick="removeProduct(${index})">Remover</button></td>
        `;
        productTableBody.appendChild(row);
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
    updateProductTable();
}
