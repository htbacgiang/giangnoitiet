export default async function handler(req, res) {
  if (req.method === 'POST') {
    const response = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(405).json({ detail: 'Method Not Allowed' });
  }
}