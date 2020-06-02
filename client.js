const serverAdapter = require("./serverAdapter");
const client = new serverAdapter();
const { createInterface } = require("readline");
const readLine = createInterface({
  input: process.stdin,
  output: process.stdout,
});
function prompt(question) {
  readLine.setPrompt(question);
  readLine.prompt();
}

function test(object) {
  client.sendJSON(object, 41234, 'localhost', (error) => {
    if(error){
      client.close();
    } else{
      console.log("Data sent!");
    }
  })
}

let promptMsg =
  "OPÇÕES:\nD - Enviar dados\nP - Fazer uma pesquisa\nQ - Sair\n\nEscolha uma opção: ";
let whoToCall = 0;
let operation = 0;
let data = {
  combustivel: -1,
  valor: 0.0,
  coordenadas: [0.0, 0.0],
};

prompt(promptMsg);

readLine
  .on("line", (line) => {
    line = line.toUpperCase();

    if (whoToCall === 1) {
      switch (operation) {
        case 0:
          data.combustivel = parseInt(line);
          operation = 1;
          promptMsg = "valor do combustível: ";

          break;
        case 1:
          data.valor = parseFloat(line);
          operation = 2;
          promptMsg =
            "coordenadas (Latitude e longitude, separados por espaço. Ex.: -19.8157 -43.9542): ";

          break;
        case 2:
          data.coordenadas = line.split(" ").map((s) => parseFloat(s));
          operation = 0;
          whoToCall = 0;
          promptMsg =
            "OPÇÕES:\nD - Enviar dados\nP - Fazer uma pesquisa\nQ - Sair\n\nEscolha uma opção: ";
          test(data);

          break;
      }
    }

    if ((whoToCall === 0)) {
      switch (line) {
        default:
          break;
        case "D":
          whoToCall = 1;
          promptMsg =
            "OPÇÕES:\n0 - diesel\n1 - álcool\n2 - gasolina\n\nEscolha o tipo de combustível: ";
          break;
        case "P":
          break;
        case "Q":
          readLine.close();
          break;
      }
    }
    prompt(promptMsg);
  })
  .on("close", () => {
    console.log("\nTerminado!");
    process.exit(0);
  });
