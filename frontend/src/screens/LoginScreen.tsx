import { FormEvent, useState } from 'react';

export const LoginScreen = () => {
  const [status, setStatus] = useState('');
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: form.get('email'), password: form.get('password') })
    });
    setStatus(response.ok ? 'Login successful' : 'Login failed');
  };
  return <form onSubmit={onSubmit}><h2>Login</h2><input name="email" placeholder="email" /><input name="password" placeholder="password" type="password" /><button>Sign In</button><p>{status}</p></form>;
};
