import { FormEvent, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io();

export const MessagesScreen = () => {
  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => { socket.on('message:new', (m) => setMessages((prev) => [m, ...prev])); return () => { socket.off('message:new'); }; }, []);

  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ from: 'u_cg1', to: 'p_01', body: form.get('body') })
    });
    e.currentTarget.reset();
  };

  return <section><h2>Secure Messages</h2><form onSubmit={send}><input name="body" placeholder="message" /><button>Send</button></form><ul>{messages.map((m) => <li key={m.id}>{m.body}</li>)}</ul></section>;
};
