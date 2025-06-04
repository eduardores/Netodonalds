let selectedFood = {};
let fillings = [];

// Carrega a comida selecionada
async function loadFood(id) {
  const res = await fetch(`http://localhost:8080/food/${id}`);
  const data = await res.json();

  selectedFood = data.food[0];
  fillings = data.fillings;

  document.getElementById('total-price').textContent = selectedFood.price;
  renderFillings();
}

// Renderiza os recheios
function renderFillings() {
  const container = document.getElementById('addons-list');
  container.innerHTML = '';

  fillings.forEach((item, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <input type="checkbox" id="f${index}" onclick="updatePrice()">
      <label for="f${index}">${item.name} (R$ ${item.price})</label>
    `;
    container.appendChild(div);
  });
}

// Atualiza preço total
function updatePrice() {
  const checks = document.querySelectorAll('#addons-list input[type="checkbox"]');
  const selectedDiv = document.getElementById('selected-addons');
  selectedDiv.innerHTML = '';

  let total = parseFloat(selectedFood.price);

  checks.forEach((chk, idx) => {
    if (chk.checked) {
      const item = fillings[idx];
      const h4 = document.createElement('h4');
      h4.textContent = `${item.name}: R$ ${item.price}`;
      selectedDiv.appendChild(h4);
      total += parseFloat(item.price);
    }
  });

  document.getElementById('total-price').textContent = total.toFixed(2);
}

// Monta descrição do pedido
function buildDescription() {
  const checks = document.querySelectorAll('#addons-list input[type="checkbox"]');
  const selected = [];

  checks.forEach((chk, idx) => {
    if (chk.checked) selected.push(fillings[idx].name);
  });

  const base = selectedFood.name || 'Tapioca';
  return selected.length ? `${base} com ${selected.join(' e ')}` : base;
}

// Envia pedido
async function makePayment() {
  const cpf = document.getElementById('cpf').value.trim();
  if (!cpf) {
    alert('Digite seu CPF.');
    return;
  }

  const payload = {
    idFood: selectedFood.id,
    cpf,
    date: new Date().toISOString().split('T')[0],
    description: buildDescription(),
    price: document.getElementById('total-price').textContent
  };

  await fetch('http://localhost:8080/payment', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });

  alert('Pedido realizado com sucesso!');
}

// Abrir modal de histórico
async function openHistory() {
  const cpf = document.getElementById('cpf').value.trim();
  if (!cpf) {
    alert('Digite seu CPF para consultar o histórico.');
    return;
  }

  const res = await fetch(`http://localhost:8080/history/${cpf}`);
  const data = await res.json();

  const container = document.getElementById('history-results');
  container.innerHTML = '';

  if (data.length) {
    data.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('history-card');
      div.innerHTML = `
        <strong>Pedido:</strong> ${item.description}<br>
        <strong>Data:</strong> ${new Date(item.pay_date).toLocaleDateString()}<br>
        <strong>Preço:</strong> R$ ${parseFloat(item.price).toFixed(2)}
      `;
      container.appendChild(div);
    });
  } else {
    container.innerHTML = '<p>Nenhum pedido encontrado.</p>';
  }

  document.getElementById('historyModal').style.display = 'block';
}

// Fechar modal
function closeHistory() {
  document.getElementById('historyModal').style.display = 'none';
}

// Carrega comida padrão (Tapioca)
loadFood(1);
