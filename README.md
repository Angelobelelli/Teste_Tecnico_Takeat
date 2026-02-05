# Classificador de Intenções – Desafio Estágio em Inteligência Artificial

Este projeto foi desenvolvido como parte do desafio técnico para a vaga de **Estágio em Inteligência Artificial**.  
O objetivo é criar uma API REST capaz de classificar automaticamente mensagens de clientes de restaurantes em diferentes categorias de intenção, auxiliando no direcionamento do atendimento.

---

## Objetivo do Projeto

Classificar mensagens de clientes em uma das seguintes categorias:

- **PEDIDO_CARDAPIO** – Pedidos ou dúvidas relacionadas ao cardápio  
- **STATUS_ENTREGA** – Perguntas sobre status ou andamento da entrega  
- **RECLAMACAO** – Reclamações ou problemas relatados pelo cliente  
- **ELOGIO** – Feedbacks positivos e elogios  
- **OUTROS** – Mensagens que não se enquadram nas categorias anteriores  

A solução foi desenvolvida priorizando simplicidade, clareza e aderência aos requisitos propostos no desafio.

---

## Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Fastify**
- **Modelos de Linguagem (LLM)** – OpenAI, Gemini ou compatíveis
- **Vitest** – Testes automatizados

Não foi utilizado banco de dados. O arquivo JSON fornecido no desafio é utilizado exclusivamente para validação do classificador.

---

## Estrutura do Projeto

src/
├─ routes/
│ ├─ classify.route.ts
│ └─ validate.route.ts
├─ services/
│ └─ classifier.service.ts
├─ llm/
│ ├─ llm.interface.ts
│ ├─ llm.factory.ts
│ ├─ openai.provider.ts
│ └─ gemini.provider.ts
├─ data/
│ └─ conversas-exemplo.json
├─ utils/
│ └─ confidence.ts
└─ tests/
└─ classify.test.ts




Como Executar o Projeto
Instalar as dependências:
  npm install
  
Executar o projeto em ambiente de desenvolvimento:
  npm run dev
  
O servidor será iniciado em:
  http://localhost:3333

Endpoints Disponíveis:
  POST /classify
  Responsável por classificar mensagens em uma categoria de intenção.

  Exemplo de requisição (mensagem única)
  {
    "message": "Oi, queria saber se vocês têm pizza de calabresa"
  }

  Exemplo de requisição (múltiplas mensagens – contexto):
  {
    "messages": [
      "Oi, boa noite",
      "Meu pedido já saiu para entrega?"
    ]
  }
  
  Exemplo de resposta:
  {
    "category": "STATUS_ENTREGA",
    "confidence": 0.9
  }

O campo confidence representa uma estimativa simples do grau de clareza da classificação.
Mensagens classificadas como OUTROS retornam um valor de confiança menor.

POST /validate
Este endpoint utiliza o arquivo conversas-exemplo.json, fornecido no desafio, para validar o funcionamento do classificador.
O arquivo é tratado como uma base de dados simples, permitindo comparar as categorias previstas pela IA com as categorias esperadas.

Exemplo de resposta
{
  "total": 25,
  "correct": 23,
  "accuracy": 0.92,
  "byCategory": {
    "PEDIDO_CARDAPIO": 1,
    "STATUS_ENTREGA": 0.8,
    "RECLAMACAO": 1,
    "ELOGIO": 1,
    "OUTROS": 0.8
  },
  "errors": []
}

Prompt Engineering
O prompt utilizado foi projetado para ser simples, determinístico e independente do provedor de IA.
O modelo é instruído a retornar exclusivamente o nome da categoria, sem explicações adicionais, garantindo maior consistência nas respostas.

Testes Automatizados
Foi implementado um teste automatizado simples para o endpoint /classify, utilizando Vitest.

Durante a execução dos testes, o serviço responsável pela comunicação com a IA é mockado, evitando dependência de serviços externos e consumo de APIs.

Para executar os testes:

npm run test
Suporte a Múltiplos Provedores de IA
A aplicação foi estruturada de forma a permitir a troca do provedor de IA (OpenAI, Gemini ou outros compatíveis) sem a necessidade de alterações na lógica principal do sistema, facilitando testes e futuras adaptações.

Considerações Finais
Este projeto foi desenvolvido com foco em:
  Atendimento completo aos requisitos do desafio.
  Organização e clareza do código.
  Qualidade do prompt de classificação.
  Documentação clara e objetiva.


