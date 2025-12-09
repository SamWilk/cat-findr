/* eslint-env node */

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Clear the auth cookies
  res.setHeader('Set-Cookie', [
    'access_token=; HttpOnly; Path=/; Max-Age=0',
    'refresh_token=; HttpOnly; Path=/; Max-Age=0'
  ]);

  res.status(200).json({ message: 'Logged out successfully' });
}
