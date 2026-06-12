================================================================
  FRANCK RODRIGUES HAIR STYLIST – LANDING PAGE
  README DE PERSONALIZAÇÃO
================================================================

ARQUIVOS DO PROJETO:
  index.html   — Estrutura HTML da página
  styles.css   — Estilos (cores, fontes, layout)
  script.js    — Funcionalidades JavaScript
  images/      — Pasta para colocar suas fotos
  README.txt   — Este arquivo

================================================================
  1. COMO INSERIR FOTOS
================================================================

Coloque todas as fotos na pasta /images/ do projeto.

FOTO DE FUNDO DO HERO (seção principal):
  1. Salve a foto como: images/hero-bg.jpg
     (Tamanho recomendado: 1920x1080px, otimizado para web)
  2. Abra styles.css
  3. Encontre o bloco ".hero-bg-placeholder" (por volta da linha 200)
  4. Descomente as 3 linhas abaixo do comentário "INSERIR FOTO":
       background-image: url('images/hero-bg.jpg');
       background-size: cover;
       background-position: center;

FOTOS DA GALERIA (6 fotos):
  Salve as fotos com estes nomes exatos em /images/:
    galeria-1.jpg  → Balayage Natural
    galeria-2.jpg  → Corte de Precisão
    galeria-3.jpg  → Mechas e Iluminação
    galeria-4.jpg  → Loiro Impecável
    galeria-5.jpg  → Tratamento Capilar
    galeria-6.jpg  → Coloração Global
  (Tamanho recomendado: 600x800px, formato WebP ou JPEG)

  Ao adicionar as fotos, os placeholders serão substituídos
  automaticamente. O lightbox (ampliação ao clicar) também
  funcionará automaticamente.

FOTOS DA SEÇÃO "SOBRE O SALÃO" (3 fotos):
  As fotos ficam na seção "Conheça o Nosso Espaço".
  No index.html, localize a seção com id="sobre".
  Substitua as <div class="img-placeholder"> por tags <img>:

  Exemplo de substituição:
    ANTES:
      <div class="img-placeholder" ...>
        <svg>...</svg>
        <span>Inserir foto do salão</span>
      </div>

    DEPOIS:
      <img
        src="images/sobre-salao.jpg"
        alt="Ambiente interno do salão Franck Rodrigues"
        width="600"
        height="800"
        loading="lazy"
      />

================================================================
  2. COMO ALTERAR TEXTOS
================================================================

Todos os textos estão no arquivo index.html.

NOME DO SALÃO:       Busque por "Franck Rodrigues" no HTML
SLOGAN:              Busque por "A Arte do Corte e Coloração"
ENDEREÇO:            Busque por "CLN 310"
HORÁRIO:             Busque por "09:00 às 18:30"
SERVIÇOS:            Seção com id="servicos"
DEPOIMENTOS:         Seção com id="depoimentos"
  IMPORTANTE: Os depoimentos são fictícios (para layout).
  Substitua pelo nome real e texto dos clientes do Google!

================================================================
  3. COMO ALTERAR O NÚMERO DE WHATSAPP
================================================================

O número atual é: 5561991279133

Para trocar, abra index.html e faça "Localizar e Substituir":
  Encontre:    5561991279133
  Substitua:   55XXXXXXXXXXX  (seu novo número sem espaços/traços)

Todos os botões serão atualizados de uma vez.
No VS Code: Ctrl+H para abrir o substituidor.

A mensagem padrão enviada é:
  "Olá, vi seus serviços no Google e quero mais informações!"

Para alterar a mensagem, localize no HTML:
  text=Ol%C3%A1%2C%20vi%20seus%20servi%C3%A7os%20no%20Google%20e%20quero%20mais%20informa%C3%A7%C3%B5es!

Substitua pelo texto desejado codificado em URL.
Use o site: https://www.urlencoder.org/ para converter o texto.

================================================================
  4. COMO ALTERAR CORES
================================================================

Abra styles.css e localize o bloco ":root" no topo do arquivo.
As cores principais são:
  --gold:    #C9A84C   (dourado – cor de destaque)
  --black:   #0A0A0A   (fundo principal)
  --dark:    #1A1A1A   (fundo secundário)
  --white:   #FFFFFF   (textos)

Altere os valores hexadecimais para mudar o esquema de cores.

================================================================
  5. COMO SUBSTITUIR OS DEPOIMENTOS
================================================================

No index.html, localize a seção id="depoimentos".
Para cada depoimento, substitua:
  - O texto entre as aspas (blockquote)
  - O nome da cliente (tag <strong>)
  - A primeira letra do avatar (div.testimonial-avatar)

Exemplo de depoimento real:
  <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
  <blockquote class="testimonial-text">
    "Seu texto aqui..."
  </blockquote>
  <footer class="testimonial-author">
    <div class="testimonial-avatar">M</div>
    <div>
      <strong>Maria Silva</strong>
      <span>Avaliação no Google</span>
    </div>
  </footer>

================================================================
  6. COMO ATUALIZAR O MAPA DO GOOGLE
================================================================

O mapa atual usa coordenadas aproximadas.
Para gerar o embed correto:
  1. Acesse https://maps.google.com
  2. Busque: "Franck Rodrigues Hair Stylist, Brasília"
  3. Clique em "Compartilhar" → "Incorporar um mapa"
  4. Copie o código iframe gerado
  5. No index.html, substitua o iframe existente na
     seção id="contato" pelo novo código

================================================================
  7. COMO ATUALIZAR A AVALIAÇÃO DO GOOGLE
================================================================

Quando o número de avaliações mudar:
  1. No index.html, busque por "306" e substitua pelo novo total
  2. Em script.js, na linha com "animateCounter(el, 306,",
     substitua 306 pelo novo número
  3. Para o contador do hero, busque "animateCounter(reviewCountEl, 306"

================================================================
  8. PUBLICAÇÃO (HOSPEDAGEM)
================================================================

Para publicar a landing page:
  - Envie os 3 arquivos (index.html, styles.css, script.js)
    e a pasta /images/ para seu servidor ou serviço de hospedagem

Opções simples de hospedagem gratuita:
  - Netlify (netlify.com) – arraste a pasta e pronto
  - Vercel (vercel.com)
  - GitHub Pages

Após publicar, atualize a URL canônica no index.html:
  <link rel="canonical" href="https://SEU-DOMINIO.com.br/" />

E também no Schema.org (bloco JSON-LD no <head>):
  "url": "https://SEU-DOMINIO.com.br/"

================================================================
  CONTATO / SUPORTE
================================================================

Em caso de dúvidas sobre personalização, entre em contato
com o desenvolvedor que criou esta landing page.

© 2025 Franck Rodrigues Hair Stylist. Todos os direitos reservados.
================================================================
