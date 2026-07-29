import http from 'http';

const request = (options, body) => new Promise((resolve, reject) => {
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => resolve({ status: res.statusCode, body: data }));
  });
  req.on('error', reject);
  if (body) req.write(body);
  req.end();
});

const registerUser = async () => {
  const payload = JSON.stringify({ name: 'Test User 500', email: 'test500@example.com', password: 'password123' });
  const res = await request({ hostname: '127.0.0.1', port: 5000, path: '/api/auth/register', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) } }, payload);
  console.log('REGISTER:', res.status, res.body);
  return JSON.parse(res.body);
};

const createBooking = async (token) => {
  const payload = JSON.stringify({ hall: '', eventName: '500 Event', date: '2026-08-01', startTime: '09:00', endTime: '10:00' });
  const res = await request({ hostname: '127.0.0.1', port: 5000, path: '/api/bookings', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload), Authorization: `Bearer ${token}` } }, payload);
  console.log('BOOKING:', res.status, res.body);
};

const main = async () => {
  try {
    const reg = await registerUser();
    if (!reg?.data?.token) return;
    await createBooking(reg.data.token);
  } catch (error) {
    console.error('ERROR:', error.message);
  }
};

main();
