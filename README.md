# Zumppy Soluções Digitais — Landing Page (HTML + CSS + JS puro)

Esta é a conversão completa do projeto original (React + TanStack Start + Tailwind + Framer Motion) para **HTML, CSS e JavaScript puros**, sem nenhum framework ou build step. Basta abrir/publicar os arquivos diretamente — funciona em qualquer hospedagem estática, incluindo **GitHub Pages**.

## Estrutura

```
index.html        → toda a estrutura da página
css/style.css      → cores, gradientes, glassmorphism e animações (idênticos ao projeto original)
js/script.js        → slider do hero, partículas, reveal-on-scroll, contadores animados, depoimentos, menu mobile
assets/             → imagens originais (hero, portfólio, cta) + logo
```

Nenhum texto, cor, espaçamento, seção ou animação foi alterado — apenas a tecnologia por trás (de React/Tailwind/Framer Motion para HTML/CSS/JS nativos).

## ⚠️ Sobre o logotipo

O logo original (`zumppy-logo.png`) estava hospedado no CDN privado da plataforma Lovable (`/__l5e/assets-v1/...`) e **não pôde ser baixado**, pois esse endereço exige autenticação/acesso interno da plataforma e não é público.

Para que o projeto funcione, foi criado um logotipo substituto em `assets/zumppy-logo.svg`, recriando o estilo "metálico" (gradiente prata/branco) usado no restante do site, com o nome "zumppy".

**Recomendado:** se você tiver o arquivo PNG original do logo, basta substituir `assets/zumppy-logo.svg` pelo seu arquivo (ajustando a extensão/referência em `index.html`, nas linhas onde aparece `assets/zumppy-logo.svg`, em 2 lugares: cabeçalho e rodapé).

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub e envie todos os arquivos desta pasta (mantendo a estrutura de pastas).
2. Vá em **Settings → Pages**.
3. Em "Source", selecione a branch (ex: `main`) e a pasta `/ (root)`.
4. Salve. Em poucos minutos o site estará disponível em `https://seu-usuario.github.io/nome-do-repositorio/`.

## Como testar localmente

Basta abrir `index.html` diretamente no navegador, ou rodar um servidor local simples, por exemplo:

```bash
python3 -m http.server 8000
```

e acessar `http://localhost:8000`.

## Dependências externas (via CDN, carregadas no navegador)

- Google Fonts (Space Grotesk + Inter)
- Lucide Icons (ícones SVG, via `cdn.jsdelivr.net`)

Nenhuma instalação local é necessária (sem `npm install`, sem build).
