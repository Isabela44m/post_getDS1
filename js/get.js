//Manipulação - DOM
const resposta = document.querySelector('#resposta');
const lista = document.querySelector('#lista-filmes');
const modelo = document.querySelector('#modelo-filme');

const apiKey = 'cv_Q90y4jdWRHo2HjTVDFPx_coPjyU1A7L6xDpla5lOKkXPBtY1188vKCZbV19Lu0-9';
const apiUrl = 'https://api-ds.codeverse.dev.br/api/filmes';

//Funcao que busca todos os herois da API

async function buscarFilmes() {
    resposta.textContent = 'Carregando filmes...';

    try {
        //Fazer uma requisicao GET para buscar os filmes
        const retorno = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'x-api-key': apiKey },
        });

        if (!retorno.ok) {
            throw new Error('Nao foi possivel buscar os filmes');
        }

        //converter para JSON
        const resultado = await retorno.json();

        //Percorrer todos os filmes e montar o filme.

        for (const filme of resultado.data) {
            const card = modelo.content.cloneNode(true);

            card.querySelector('.nome').textContent = filme.title;
            card.querySelector('.genero').textContent = filme.genero;
            card.querySelector('.ano').textContent = filme.ano;
            card.querySelector('.diretor').textContent = filme.diretor;
            card.querySelector('.nota').textContent = filme.nota;

            const imagem = card.querySelector('img');

            if (filme.imageUrl) {
                imagem.src = filme.imageUrl;
                imagem.alt = filme.title;
            } else {
                imagem.remove();
            }

            lista.appendChild(card);
        }

        resposta.textContent = '';
    } catch (error) {
        resposta.textContent = 'Não foi possivel carregar os filmes.  Tente novamente!';
        console.error(error);
    }
}

//executo a funcao
buscarFilmes();
