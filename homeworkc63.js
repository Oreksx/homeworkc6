const btn = document.querySelector('.j-btn-test');

const wsUri = "wss://echo-ws-service.herokuapp.com/";

const btngeoloc = document.querySelector('.geoloc');
const btnOpen = document.querySelector('.j-btn-open');
const btnClose = document.querySelector('.j-btn-close');
const messageouter = document.querySelector('.message__outer');
  
let websocket;
  
function writeToScreen(message) {
  const pserver = document.createElement('p');
  pserver.setAttribute("class", "message__server");
  pserver.textContent = message;
  messageouter.appendChild(pserver);
}

function writetostatus(message) {
  const stat = document.querySelector('.status');
  stat.textContent = message;
}
  
btnClose.addEventListener('click', () => {
  websocket.close();
  websocket = null;
});

btnOpen.addEventListener('click', () => {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    writetostatus("CONNECTED");
  };
  websocket.onclose = function(evt) {
    writetostatus("DISCONNECTED");
  };
  websocket.onerror = function(evt) {
    writetostatus(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
});

btn.addEventListener('click', () => {
  const input = document.querySelector('.inputmessage').value;
  const pclient = document.createElement('p');
  pclient.setAttribute("class", "message__client");
  pclient.textContent = input;
  messageouter.appendChild(pclient);
  websocket.send(input);
  websocket.onmessage = function(evt) {
    writeToScreen(evt.data);
  };
});

btngeoloc.addEventListener('click', () => {
  const pclient = document.createElement('p');
  pclient.setAttribute("class", "message__client");
  pclient.innerHTML = `<a href="https://www.openstreetmap.org/#map=12/51.6751/39.2088">гео-локация</a>`;
  messageouter.appendChild(pclient);
});










