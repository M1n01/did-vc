import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('VC Issuer Server is running!'));

app.listen({ port: 8787 });
