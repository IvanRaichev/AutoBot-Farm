const { ipcRenderer, contextBridge } = require("electron");

//preload script

contextBridge.exposeInMainWorld("api", {
  send: (channel, data = undefined) => {
    if (data !== undefined) {
      ipcRenderer.send(channel, data);
    } else {
      ipcRenderer.send(channel);
    }
  },
  on: (channel, callback) => {
    ipcRenderer.on(channel, callback);
  },
  once: (channel, callback) => {
      const newCallback = (_, data) => callback(data);
      ipcRenderer.once(channel, newCallback);
  },
  removeListener: (channel, callback) => {
      ipcRenderer.removeListener(channel, callback);
    
  },
  removeAllListeners: (channel) => {
      ipcRenderer.removeAllListeners(channel);
  },
  sendSync:(channel)=>{
    ipcRenderer.sendSync(channel);
  }
});
