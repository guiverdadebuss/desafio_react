import { useState } from "react";

const casaVazia = " ";
const jogoVazio = {
    tabuleiro: [
        [casaVazia, casaVazia, casaVazia],
        [casaVazia, casaVazia, casaVazia],
        [casaVazia, casaVazia, casaVazia],
    ],
    jogadorAtual: "X"
};

export function useJogoDoGalo() {
    const [state, setState] = useState(jogoVazio);

    // ✅ REMOVI OS PARÂMETROS jogo e jogador — não são necessários!
    function adicionarJogada(linha, coluna) {
        setState(estadoAnterior => {
            if (estadoAnterior.tabuleiro[linha][coluna] !== casaVazia) {
                return estadoAnterior;
            }

            const novoTabuleiro = estadoAnterior.tabuleiro.map(linhaArray => [...linhaArray]);
            novoTabuleiro[linha][coluna] = estadoAnterior.jogadorAtual;

            return {
                tabuleiro: novoTabuleiro,
                jogadorAtual: estadoAnterior.jogadorAtual === "X" ? "O" : "X"
            };
        });
    }

    function verificarVencedor(jogo) {
        const sequencias = obtemSequencias(jogo);
        if (sequencias.includes("XXX")) return "X";
        if (sequencias.includes("OOO")) return "O";
        return undefined;
    }

    function obtemSequencias(jogo) {
        return obtemLinhas(jogo)
            .concat(obtemColunas(jogo))
            .concat(obtemDiagonais(jogo));
    }

    function obtemLinhas(jogo) {
        return jogo.tabuleiro.map(linha => linha.join(""));
    }

    function obtemColunas(jogo) {
        let colunas = [];
        for (let i = 0; i < jogo.tabuleiro.length; i++) {
            let coluna = "";
            for (let j = 0; j < jogo.tabuleiro.length; j++) {
                coluna += jogo.tabuleiro[j][i];
            }
            colunas.push(coluna);
        }
        return colunas;
    }

    function obtemDiagonais(jogo) {
        let diagonais = ["", ""];
        for (let i = 0; i < jogo.tabuleiro.length; i++) {
            diagonais[0] += jogo.tabuleiro[i][i];
            diagonais[1] += jogo.tabuleiro[i][jogo.tabuleiro.length - 1 - i];
        }
        return diagonais;
    }

    function obterJogadasPossiveis(jogo) {
        let jogadasPossiveis = [];
        for (let linha = 0; linha < jogo.tabuleiro.length; linha++) {
            for (let coluna = 0; coluna < jogo.tabuleiro[linha].length; coluna++) {
                if (jogo.tabuleiro[linha][coluna] === casaVazia) {
                    jogadasPossiveis.push({ linha, coluna });
                }
            }
        }
        return jogadasPossiveis;
    }

    function verificarFimDoJogo(jogo) {
        return obterJogadasPossiveis(jogo).length === 0 || verificarVencedor(jogo) !== undefined;
    }

    function reiniciarJogo() {
        setState(jogoVazio);
    }

    return {
        jogo: state,
        verificarFimDoJogo,
        adicionarJogada,
        verificarVencedor,
        reiniciarJogo
    };
}