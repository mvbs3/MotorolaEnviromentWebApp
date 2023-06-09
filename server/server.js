const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const port = 5000;
const { exec } = require("node:child_process");
const execSync = require("child_process").execSync;

const subtitles5g = [
  "oai-amf",
  "oai-smf",
  "oai-spgwu",
  "oai-nrf",
  "oai-udm",
  "oai-udr",
  "oai-ausf",
  "mysql",
];

const subtitles4g = [
  "mme",
  "sgwc",
  "sgwu",
  "upf",
  "smf",
  "osmomsc",
  "mongo",
  "nrf",
  "scp",
  "osmohlr",
  "pcrf",
  "webui",
];
const base5gJson = [0, 0, 0, 0, 0, 0, 0, 0];
const base4gJson = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var generalOutput = [];
var status5g = [];
var status4g = [];

function check5gStatus(output) {
  status5g = [...base5gJson];
  // Essa funcao passa pelo nome de todas as funcoes da rede (um for dentro de subtitles 5g.map)
  //SE existir alguma linha que tenha o nome dessa funcao no comando "docker ps" ele checa se nessa linha esta escrito healthy
  // SE tiver healthy significa q a funcao esta pronta e pode ser usada.
  subtitles5g.map((func5g) => {
    //console.log(func5g);
    output.map((outputLine) => {
      //console.log(
      //  outputLine.indexOf(func5g) != -1 &&
      //    outputLine.includes("healthy") == true
      //);
      if (
        outputLine.indexOf(func5g) != -1 &&
        outputLine.includes("healthy") == true
      ) {
        status5g[subtitles5g.indexOf(func5g)] = 1;
        //console.log(status5g);
      }
    });
  });
  //console.log(status5g)
  return status5g;
}

function check4gStatus(output) {
  status4g = [...base4gJson];
  // Essa funcao passa pelo nome de todas as funcoes da rede (um for dentro de subtitles 5g.map)
  //SE existir alguma linha que tenha o nome dessa funcao no comando "docker ps" ele checa se nessa linha esta escrito healthy
  // SE tiver healthy significa q a funcao esta pronta e pode ser usada.
  subtitles4g.map((func4g) => {
    //console.log(func5g);
    output.map((outputLine) => {
      //console.log(
      //  outputLine.indexOf(func5g) != -1 &&
      //    outputLine.includes("healthy") == true
      //);
      if (outputLine.indexOf(func4g) != -1) {
        status4g[subtitles4g.indexOf(func4g)] = 1;
        //console.log(status5g);
      }
    });
  });
  //console.log(status5g)
  return status4g;
}

function resultTerminal(err, output) {
  // once the command has completed, the callback function is called
  if (err) {
    // log and return if we encounter an error
    console.error("could not execute command: ", err);
    return;
  }
  // log the output received from the command
  console.log("Output:,\n", output.split("\n"));
  output = output.split("\n");
}

function gnbConnected() {
  const fs = require("fs");

  fs.readFile(
    "/home/mvbsilva/Desktop/MotorolaEnviromentWebApp/envwebapp/src/Components/img/amf.log",
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      data = data.split("\n").reverse();
      let connected = [];

      for (var i = 0; i < data.length; i++) {
        if (data[i].includes("gNBs' information")) {
          connected.push(data[i - 2]);
          break;
        }
      }
      console.log(connected);
    }
  );
}
function devicesConnected() {
  const fs = require("fs");

  fs.readFile(
    "/home/mvbsilva/Desktop/MotorolaEnviromentWebApp/envwebapp/src/Components/img/amf.log",
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      data = data.split("\n").reverse();
      let connected = [];

      for (var i = 0; i < data.length; i++) {
        if (data[i].includes("UEs' information")) {
          connected.push(data[i - 2]);
          break;
        }
      }
      console.log(connected);
    }
  );
}

app.get("/5g/on", (req, res) => {
  generalOutput = [...base5gJson];
  // run the `ls` command using exec
  exec(
    "docker compose -f /home/serverthree/oai-sdr-cin/oai-cn5g-fed/docker-compose/docker-compose-basic-nrf.yaml up",
    resultTerminal
  );
  exec("docker ps", resultTerminal);

  res.json(generalOutput);
});

app.get("/5g/off", (req, res) => {
  generalOutput = [...base5gJson];
  // run the `ls` command using exec
  exec(
    "docker compose -f /home/serverthree/oai-sdr-cin/oai-cn5g-fed/docker-compose/docker-compose-basic-nrf.yaml down",
    resultTerminal
  );
  exec("docker ps", resultTerminal);
  res.json(generalOutput);
});

app.get("/5g/Status", (req, res) => {
  generalOutput = [...base5gJson];
  // run the `ls` command using exec
  const output = execSync("docker ps", { encoding: "utf-8" });

  generalOutput = check5gStatus(output.split("\n"));
  //console.log(generalOutput)
  console.log("general output: ", output);
  console.log("status5g: ", generalOutput);
  res.json(generalOutput);
});

app.get("/4g/on", (req, res) => {
  generalOutput = [...base4gJson];
  // run the `ls` command using exec
  // colocar comando pra ligar nsa-deploy
  exec(
    "docker compose -f /home/serverthree/tecs/LTE/open5gs-sdr/nsa-deploy.yaml up",
    resultTerminal
  );
  res.json(generalOutput);
});

app.get("/4g/off", (req, res) => {
  generalOutput = [...base4gJson];
  // run the `ls` command using exec
  //colocar comando para desligar nsa-deploy
  exec(
    "docker compose -f /home/serverthree/tecs/LTE/open5gs-sdr/nsa-deploy.yaml down",
    resultTerminal
  );
  res.json(generalOutput);
});

app.get("/4g/Status", (req, res) => {
  generalOutput = [...base4gJson];
  // run the `ls` command using exec
  const output = execSync("docker ps", { encoding: "utf-8" });

  generalOutput = check4gStatus(output.split("\n"));

  //console.log(generalOutput)
  console.log("general output: ", output);
  console.log("status4g: ", generalOutput);
  res.json(generalOutput);
});
app.get("/enb/Status", (req, res) => {
  generalOutput = [...base4gJson];
  // run the `ls` command using exec
  res.json(generalOutput);
});

app.get("/GnbSA/Status", (req, res) => {
  generalOutput = [...base4gJson];
  // run the `ls` command using exec
  res.json(generalOutput);
});

app.get("/GnbSA/Status", (req, res) => {
  generalOutput = [...base4gJson];
  // run the `ls` command using exec
  res.json(generalOutput);
});

app.get("/enb/on", (req, res) => {
  generalOutput = [...base4gJson];

  exec(
    "docker compose -f /home/serverthree/tecs/LTE/open5gs-sdr/oaienb.yaml up",
    resultTerminal
  );
  res.json(generalOutput);
});

app.get("/enb/off", (req, res) => {
  generalOutput = [...base4gJson];

  exec(
    "docker compose -f /home/serverthree/tecs/LTE/open5gs-sdr/oaienb.yaml down",
    resultTerminal
  );
  res.json(generalOutput);
});

app.get("/GnbNSA/on", (req, res) => {
  generalOutput = [...base4gJson];
  exec(
    "docker compose -f /home/serverthree/tecs/LTE/open5gs-sdr/oaignb.yaml up",
    resultTerminal
  );
  res.json(generalOutput);
});

app.get("/GnbNSA/off", (req, res) => {
  generalOutput = [...base4gJson];
  exec(
    "docker compose -f /home/serverthree/tecs/LTE/open5gs-sdr/oaignb.yaml up",
    resultTerminal
  );
  res.json(generalOutput);
});

app.get("/GnbSA/on", (req, res) => {
  generalOutput = [...base4gJson];
  exec(
    "docker compose -f /home/serverthree/oai-sdr-cin/ran/oaignb.yaml up",
    resultTerminal
  );
  res.json(generalOutput);
});

app.get("/GnbSA/off", (req, res) => {
  generalOutput = [...base4gJson];
  exec(
    "docker compose -f /home/serverthree/oai-sdr-cin/ran/oaignb.yaml down",
    resultTerminal
  );
  res.json(generalOutput);
});

app.listen(port, () => {
  console.log("Server started at port ", { port });
});

console.log(devicesConnected());
