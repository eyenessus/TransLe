# TransLe

TransLe ensina as pessoas a pronunciarem e falarem o inglês da forma mais próxima possível do nativo através do Whatsapp Business.

## Funcionalidades

- Transcreve a proúncia do modo que e falada em inglês.

## Instalação

```bash
git clone https://github.com/eyenessus/TransLe
cd TransLe
# Siga as instruções específicas de instalação abaixo
```

## Como usar

Como executar o projeto:

```bash
# Exemplo de comando para rodar o projeto
npm run build
node lib
```
VARIÁVEIS DE AMBIENTE:

<!--
    Seção de credenciais do Whatsapp Business
    https://developers.facebook.com/docs/
-->

<!--
    WHATSAPP_ID: Identificador único do número do WhatsApp Business. 
    Preencha este campo com o ID fornecido pelo painel do WhatsApp Business.
-->
WHATSAPP_ID
<!--    
    Chave secreta da aplicação
-->
WHATSAPP_SECRET

<!--    
    Chave Token
-->
WHATSAPP_TOKEN

<!--    
    Identificação do número de telefone
-->
WHATSAPP_PHONE_NUMBER_ID

<!--
    Token de autenticação do Webhook - VERIFY TOKEN
-->
WHATSAPP_VERIFY_TOKEN

<!--
    Seção de credenciais da OPENAI
-->

<!--
    Chave token
    https://platform.openai.com/docs/api-reference/introduction
-->
OPENAI_API_KEY

## Licença
Apache License 2.0
