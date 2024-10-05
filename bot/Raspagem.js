const { resolveFile } = require("discord.js");
const fs = require("fs");
const path = "bot/SRC/lista de Loucuras.txt";

function LerArquivo(value) {
  return new Promise((resolv, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let resolvido = data.split("\n");
        console.log("Arquivo lido");
        // console.log(resolvido[value]);
        resolv(resolvido[value]);
      }
    });
  });
}

module.exports = LerArquivo;
