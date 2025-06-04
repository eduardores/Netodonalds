async function fetchHistory() {
  const cpf = document.getElementById('cpfSearch').value.trim();
  const res = await fetch(`http://localhost:8080/history/${cpf}`);
  const data = await res.json();

  const result = document.getElementById('historyResult');
  result.innerHTML = '';

  if (data.length) {
    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card-record');
      card.innerHTML = `
        <strong>Pedido:</strong> ${item.description}<br>
        <strong>Data:</strong> ${new Date(item.pay_date).toLocaleDateString()}<br>
        <strong>CPF:</strong> ${item.cpf}<br>
        <strong>Preço:</strong> R$ ${parseFloat(item.price).toFixed(2)}
      `;
      result.appendChild(card);
    });
  } else {
    result.innerHTML = `<div class="card-record">Nenhum resultado encontrado.</div>`;
  }
}

