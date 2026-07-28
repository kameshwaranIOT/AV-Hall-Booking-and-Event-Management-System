import { spawn } from 'child_process';
import http from 'http';

const server = spawn('node', ['server.js'], { shell: true });

server.stdout.on('data', (data) => {
  process.stdout.write(data.toString());
});

server.stderr.on('data', (data) => {
  process.stderr.write(data.toString());
});

server.on('error', (error) => {
  console.error('Spawn error:', error);
});

const payload = JSON.stringify({ name: 'New User', email: 'newuser1234@example.com', password: 'password123' });
const options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

setTimeout(() => {
  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => (body += chunk));
    res.on('end', () => {
      console.log('STATUS', res.statusCode);
      console.log(body);
      server.kill();
    });
  });
  req.on('error', (error) => {
    console.error('Request error:', error);
    server.kill();
  });
  req.write(payload);
  req.end();
}, 2500);
