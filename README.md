# Cadastro de Fornecedores e Produtos

Bem-vindo ao projeto **Cadastro de Fornecedores e Produtos**! Este sistema foi desenvolvido para facilitar o gerenciamento de fornecedores e produtos, oferecendo uma interface intuitiva e funcional.

## 🚀 Funcionalidades

- **Cadastro de Fornecedores:** Preencha e valide informações essenciais, como Razão Social, CNPJ, Nome Fantasia, e dados de contato.
- **Cadastro de Produtos:** Adicione produtos com informações detalhadas, incluindo descrição, unidade de medida, quantidade em estoque, valor unitário, e cálculo automático do valor total.
- **Anexos:** Anexe documentos relevantes ao cadastro dos fornecedores de forma prática e organizada.
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
├── js/
│   └── main.js
├── index.html
└── README.md
```

## 🎨 Interface do Usuário

A interface foi projetada para ser limpa e intuitiva, com foco na usabilidade:

- **Formulários**: Organizados em seções claras e com validação em tempo real.
- **Tabela de Produtos**: Apresenta os produtos cadastrados de forma organizada, com opções para remover produtos.
- **Anexos**: Exibidos com ícones interativos para visualização e remoção.

## 📋 Instruções de Uso

### Clonando o Repositório:

```bash
git clone https://github.com/palodavis/CadastroFornecedor.git
```

### 🌐 Abrindo o Projeto:

- Navegue até o diretório do projeto e abra o arquivo `index.html` em seu navegador preferido.

### 📝 Cadastro de Fornecedores e Produtos:

- Preencha os dados solicitados nos formulários e adicione produtos.
- Utilize a funcionalidade de anexos para carregar documentos importantes.
- Salve os dados ao final para concluir o cadastro.

### 🔍 Detalhes Técnicos

- **Validação de Formulários**: Implementada diretamente no JavaScript para assegurar a entrada correta de dados.
- **Preenchimento Automático de CEP**: Consumo de API para preencher os dados de endereço automaticamente.
- **Manipulação de DOM**: Utilizada para atualizar dinamicamente a tabela de produtos e a lista de anexos.
