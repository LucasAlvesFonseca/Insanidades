let Raspagem = require("./Raspagem");

async function insanidades() {
  let roll = Math.floor(Math.random() * 100);

  try {
    const resultado = await Raspagem(roll);
    return resultado;
  } catch (error) {
    console.error("Erro ao obter o resultado:", error);
    return null;
  }
}

module.exports = insanidades;
