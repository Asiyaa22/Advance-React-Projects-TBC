import { io } from "socket.io-client";

let socket = null;

function createDevSocket() {
  const handlers = {};
  return {
    on(event, cb) {
      handlers[event] ||= [];
      handlers[event].push(cb);
    },
    off(event, cb) {
      if (!handlers[event]) return;
      handlers[event] = handlers[event].filter(f => f !== cb);
    },
    emit() {},
    // internal: call to simulate server pushing an event
    _emitToClients(event, payload) {
      (handlers[event] || []).forEach(cb => cb(payload));
    }
  };
}

export function connect() {
  if (!socket) {
    if (import.meta.env.DEV) {
      socket = createDevSocket();
      // expose dev helper so you can call from console:
      // window.__livePollDevEmit("poll:update", { id: 'p1', ... })
      try { window.__livePollDevEmit = (event, payload) => socket._emitToClients(event, payload); } catch(e){}
    } else {
      socket = io();
    }
  }
  return socket;
}

export function on(event, cb) {
  const s = connect();
  s.on(event, cb);
  return () => s.off(event, cb);
}

export function emit(event, ...args) {
  const s = connect();
  s.emit(event, ...args);
}

export function devEmit(event, payload) {
  const s = connect();
  if (s._emitToClients) s._emitToClients(event, payload);
}

export function disconnect() {
  if (socket?.disconnect) socket.disconnect();
  socket = null;
}
