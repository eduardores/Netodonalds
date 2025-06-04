# Netodonalds
![Netodonalds](<Captura de Tela (16).png>)
## Descrição

O **Netodonalds** é uma aplicação web de venda de lanches, permitindo que clientes escolham entre **Tapioca** ou **Cuzcuz**, adicionem recheios, visualizem o preço total e realizem pedidos. Além disso, possui um painel administrativo para consultar o histórico de compras.

---

## Funcionalidades

### Cliente
-  Escolha entre **Tapioca** ou **Cuzcuz**
-  Input para CPF do comprador
-  Escolha de recheios adicionais via checkbox
-  Visualização do preço de cada recheio
-  Cálculo automático do preço total (base + recheios)
-  Botão **"Pagar"** envia as informações para o backend
-  Botão **"Histórico de Compras"** abre um modal com o histórico daquele CPF

### Admin
-  Consulta de histórico de compras via CPF
-  Visualização dos dados: data, descrição do pedido e preço

---

## Estrutura dos Arquivos
/Netodonalds
│
├── imgs/                      # Imagens (logo, prints, etc.)
│   └── logo.png                # Logo do Netodonalds
│
├── index.html                  # Página do cliente (loja)
├── style.css                   # Estilo da página do cliente
├── script.js                   # Lógica da página do cliente
│
├── index_adm.html              # Página do administrador (histórico)
├── style_adm.css               # Estilo da página do administrador
├── script_adm.js               # Lógica da página do administrador
│
├── backend/                    # (Opcional) Pasta do backend Node.js
│   ├── index.js                # Servidor backend
│   ├── database.sql            # Script do banco de dados
│   └── package.json            # Dependências do Node.js
│
├── README.md                   # Documentação do projeto
└── LICENSE                     # (Opcional) Licença do projeto

