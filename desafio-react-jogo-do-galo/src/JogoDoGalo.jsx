import { useJogoDoGalo } from "./useJogoDoGalo.js";
import "./JogoDoGalo.css";

export default function JogoDoGalo() {
  const { jogo, verificarFimDoJogo, verificarVencedor, adicionarJogada, reiniciarJogo } = useJogoDoGalo();

  const fimDeJogo = verificarFimDoJogo(jogo);
  const vencedor = verificarVencedor(jogo);

  return (
    <div className="jogo-container">
      <h1>JOGO DO ROCK! </h1>  {/* H1 MUDANDO COR */}

 
      {!fimDeJogo ? (
        <>
          <h2> 
            <div className="vez-jogador">
              <span>Vez do Jogador:</span> {/* SPAN H2 MUDAR COR */}

              {jogo.jogadorAtual === "X" && (
                <img src="/imagens/gaga.jpeg" alt="Gaga" className="icone-jogador" />
              )}
              {jogo.jogadorAtual === "O" && (
                <img src="/imagens/alex.jpg" alt="Alex" className="icone-jogador" />
              )}
            </div>
          </h2>

          <div className="tabuleiro">
            {jogo.tabuleiro.map((linha, i) => (
              <div key={i} className="linha">
                {linha.map((casa, j) => (
                  <button
                    key={j}
                    className="casa"
                    onClick={() => {
                      if (casa === " " && !fimDeJogo) {
                        adicionarJogada(i, j);
                      }
                    }}
                  >
                    {casa === "X" && (
                      <img
                        src="/imagens/gaga.jpeg"
                        alt="Gaga"
                        className="icone-jogador"
                      />
                    )}
                    {casa === "O" && (
                      <img
                        src="/imagens/alex.jpg"
                        alt="Alex"
                        className="icone-jogador"
                      />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="resultado-final">
          {vencedor ? (
            <div className="vencedor-container">
              <h3>VENCEDOR:</h3> {/* H3 MUDAR COR */}

              {vencedor === "X" && (
                <img src="/imagens/gaga.jpeg" alt="Gaga" className="icone-vencedor" />
              )}
              {vencedor === "O" && (
                <img src="/imagens/alex.jpg" alt="Alex" className="icone-vencedor" />
              )}
            </div>
          ) : (
            <div className="vencedor-container">
              <h2>Empate! Ninguém venceu.</h2>
              
            </div>
          )}

          <button className="btn-reiniciar" onClick={reiniciarJogo}>
            Reiniciar {/* MEXER BOTAO, COR ETC FONTE NO CSS */}

          </button>
        </div>
      )}
    </div>
  );
}
