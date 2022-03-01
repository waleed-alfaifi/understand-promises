import fetch from "node-fetch";
import liverServer from "live-server";

liverServer.start({
  port: 3000,
});

async function doAllWork() {
  const response = await fetch("http://127.0.0.1:3000/public/video.json");
  addTwo(5);
  const data = await response.json();
  console.log(data);
}

function addTwo(number) {
  console.log(number + 2);
}

doAllWork();
console.log("Done!");
addTwo(3);
