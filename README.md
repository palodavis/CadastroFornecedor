# Cadastro de Fornecedores e Produtos

Bem-vindo ao projeto **Cadastro de Fornecedores e Produtos**! Este sistema foi desenvolvido para facilitar o gerenciamento de fornecedores e produtos, oferecendo uma interface intuitiva e funcional.

## 🚀 Funcionalidades

- **Cadastro de Fornecedores:** Cadastro de fornecedores, incluindo informações como Razão Social, CNPJ, Nome Fantasia, dados de contato, endereço, entre outros.
- **Cadastro de Produtos:** Cadastro de produtos com informações detalhadas, incluindo descrição, unidade de medida, quantidade em estoque, valor unitário, e cálculo automático do valor total.
- **Anexos:** Anexe documentos ao cadastro dos fornecedores de forma simplificada.
- **Preenchimento Automático de Endereço:** O sistema permite o preenchimento automático do endereço ao informar o CEP.
- **Gerenciamento de Dados em Tempo Real:** Todos os dados dos produtos e anexos são gerenciados em tempo real com interatividade completa.

## 🛠️ Tecnologias Utilizadas

- ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=white) **HTML5**: Estruturação do conteúdo.
- ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=white) **CSS3**: Estilização com o uso do Fluig Style Guide e customizações próprias.
- ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **JavaScript**: Implementação de funcionalidades interativas e validação de formulários.
- ![Fluig](https://img.shields.io/badge/-Fluig-00ADEF?style=flat&logoColor=white) **Fluig**: Uso de componentes visuais padrão para garantir uma experiência de usuário consistente e moderna.


## 📂 Estrutura do Projeto

```plaintext
├── css/
│   ├── fluig-style-guide.min.css
│   └── styles.css
├── icons/
├── js/
│   └── fetchAddress.js
│   └── fileManagement.js
│   └── formValidation.js
│   └── jquery-3.5.1.min.js
│   └── main.js
│   └── productManagement.js
├── index.html
└── README.md
```

## 🎨 Interface do Usuário

- **Formulários**: Organizados em seções claras e com validação em tempo real.
- **Tabela de Produtos**:  Produtos cadastrados contendo opção para remover produtos.
- **Anexos**: Opção para visualização e remoção.

## 📋 Instruções de Uso

### Clonando o Repositório:

```bash
git clone https://github.com/palodavis/CadastroFornecedor.git
```

### 🌐 Abrindo o Projeto:

- Navegue até o diretório do projeto.  
- Para executar o arquivo `index.html`, é necessário utilizar um servidor local (localhost). Pode utilizar ferramentas como o Live Server no VS Code ou rodar um servidor local simples.

### 📝 Cadastro de Fornecedores e Produtos:

- Preencha os dados solicitados nos formulários e adicione produtos.
- Utilize a funcionalidade de anexos para carregar documentos importantes.
- Salve os dados ao final para concluir o cadastro.

### 🔍 Detalhes Técnicos

- **Validação de Formulários**: Implementada diretamente no JavaScript para assegurar a entrada correta de dados.
- **Preenchimento Automático de CEP**: Consumo de API para preencher os dados de endereço automaticamente.
- **Manipulação de DOM**: Utilizada para atualizar dinamicamente a tabela de produtos e a lista de anexos.
