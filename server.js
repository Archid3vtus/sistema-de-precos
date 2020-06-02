const serverAdapter = require("./serverAdapter");
const server = new serverAdapter();

// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

server.on("message", (msg, info) => {
  console.log(`Data received from server: ${msg.toString()}`)
  console.log(`Received ${msg.length} bytes from ${info.address}:${info.port}`);

  server.send(msg, info.port, 'localhost', (error) => {
    if(error){
      client.close();
    }else{
      console.log("Data sent!");
    }
  });
});

server.on("listening", () => {
  const address = server.get().address();
  console.log(`server listening on ${address.address}:${address.port}`);
});

server.bind(41234);