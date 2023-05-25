const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const port = 5000;
const { exec } = require('node:child_process')

function resultTerminal(err,output){
// once the command has completed, the callback function is called
  if (err) {
    // log and return if we encounter an error
    console.error("could not execute command: ", err)
    return
}
// log the output received from the command
console.log("Output:,\n", output)
}

app.get("/5g", (req, res) => {
  // run the `ls` command using exec
  exec('docker ps', resultTerminal)
  res.json([1, 1, 0, 1, 1, 1, 1, 1]);
});

app.listen(port, () => {
  console.log("Server started at port ", { port });
});
