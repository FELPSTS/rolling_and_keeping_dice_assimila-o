 let ultimoResultadoTexto = "";

  function getResultadoD6(face) {
    switch (face) {
      case 1:
      case 2: return { texto: "Face vazia", emoji: "➖" };
      case 3: return { texto: "Pressão (🦉)", emoji: "🦉" };
      case 4:
      case 5: return { texto: "Pressão + adaptação (🦉🦌)", emoji: "🦉🦌" };
      case 6: return { texto: "Sucesso (🐞)", emoji: "🐞" };
    }
  }

  function getResultadoD10(face) {
    switch (face) {
      case 1: return { texto: "Face vazia", emoji: "➖" };
      case 2: return { texto: "Pressão (🦉)", emoji: "🦉" };
      case 3:
      case 4:
      case 5: return { texto: "Pressão + adaptação (🦉🦌)", emoji: "🦉🦌" };
      case 6: return { texto: "Sucesso (🐞)", emoji: "🐞" };
      case 7: return { texto: "Sucesso x2 (🐞🐞)", emoji: "🐞🐞" };
      case 8: return { texto: "Sucesso + adaptação (🐞🦌)", emoji: "🐞🦌" };
      case 9: return { texto: "Sucesso + adaptação + Pressão (🐞🦌🦉)", emoji: "🐞🦌🦉" };
      case 10: return { texto: "Sucesso x2 + Pressão (🐞🐞🦉)", emoji: "🐞🐞🦉" };
    }
  }

  function getResultadoD12(face) {
    switch (face) {
      case 1:
      case 2: return { texto: "Face vazia", emoji: "➖" };
      case 3: return { texto: "Pressão (🦉)", emoji: "🦉" };
      case 4:
      case 5: return { texto: "Pressão + adaptação (🦉🦌)", emoji: "🦉🦌" };
      case 6: return { texto: "Sucesso x2 (🐞🐞)", emoji: "🐞🐞" };
      case 7: return { texto: "Sucesso x3 (🐞🐞🐞)", emoji: "🐞🐞🐞" };
      case 8: return { texto: "Sucesso x2 + adaptação (🐞🐞🦌)", emoji: "🐞🐞🦌" };
      case 9: return { texto: "Sucesso + adaptação + Pressão (🐞🦌🦉)", emoji: "🐞🦌🦉" };
      case 10: return { texto: "Sucesso x2 + Pressão (🐞🐞🦉)", emoji: "🐞🐞🦉" };
      case 11: return { texto: "Sucesso + adaptação x2 + Pressão (🐞🦌🦌🦉)", emoji: "🐞🦌🦌🦉" };
      case 12: return { texto: "Pressão x2 (🦉🦉)", emoji: "🦉🦉" };
    }
  }

  function rolarDado() {
    const tipo = document.getElementById("tipoDado").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const resultadoDiv = document.getElementById("resultado");
    const emojisDiv = document.getElementById("emojis");
    const listaHistorico = document.getElementById("listaHistorico");

    let resultadosTexto = [];
    let resultadosEmojis = [];

    if (tipo === "coroa") {
      const face = Math.random() < 0.5 ? "Cara" : "Coroa";
      resultadosTexto.push(`Resultado: ${face}`);
      resultadosEmojis.push(`<span class="dado animar">${face}</span>`);
    }

    emojisDiv.innerHTML = "";

    for (let i = 0; i < quantidade; i++) {
      let face = 0;
      let resultado = "";
      let emoji = "";

      if (tipo === "d6") {
        face = Math.floor(Math.random() * 6) + 1;
        ({ texto: resultado, emoji } = getResultadoD6(face));
      } else if (tipo === "d10") {
        face = Math.floor(Math.random() * 10) + 1;
        ({ texto: resultado, emoji } = getResultadoD10(face));
      } else if (tipo === "d12") {
        face = Math.floor(Math.random() * 12) + 1;
        ({ texto: resultado, emoji } = getResultadoD12(face));
      }

      else if (tipo === "d4") {
        face = Math.floor(Math.random() * 4) + 1;
        resultado = `Resultado: ${face}`;
        emoji = face.toString(); 
      }
      else if (tipo === "d6simples") {
        face = Math.floor(Math.random() * 6) + 1;
        resultado = `Resultado: ${face}`;
        emoji = face.toString();
      }
      else if (tipo === "d20") {
        face = Math.floor(Math.random() * 20) + 1;
        resultado = `Resultado: ${face}`;
        emoji = face.toString(); 
      }


      resultadosTexto.push(resultado);
      resultadosEmojis.push(`<span class="dado animar">${emoji}</span>`);
    }

    setTimeout(() => {
      const textoFinal = `Você rolou: ${resultadosTexto.join(" | ")}`;
      resultadoDiv.textContent = textoFinal;
      emojisDiv.innerHTML = resultadosEmojis.join(" ");

      ultimoResultadoTexto = textoFinal;
      document.getElementById("btnGuardar").disabled = false;

      const entrada = document.createElement("div");
      entrada.className = "entrada-historico";
      entrada.textContent = `[${new Date().toLocaleTimeString()}] ${quantidade}x ${tipo.toUpperCase()}: ${resultadosTexto.join(" | ")}`;
      listaHistorico.prepend(entrada);
    }, 600);
  }

  function limparHistorico() {
    document.getElementById("listaHistorico").innerHTML = "";
  }

  function guardarResultado() {
    if (!ultimoResultadoTexto) return;

    let guardados = JSON.parse(localStorage.getItem("resultadosGuardados")) || [];
    guardados.push(ultimoResultadoTexto);
    localStorage.setItem("resultadosGuardados", JSON.stringify(guardados));

    mostrarGuardados();
  }

  function mostrarGuardados() {
    const lista = document.getElementById("listaGuardados");
    lista.innerHTML = "";

    let guardados = JSON.parse(localStorage.getItem("resultadosGuardados")) || [];
    guardados.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      lista.appendChild(li);
    });
  }

  function limparGuardados() {
    localStorage.removeItem("resultadosGuardados");
    mostrarGuardados();
  }

  window.onload = function () {
    mostrarGuardados();
  }