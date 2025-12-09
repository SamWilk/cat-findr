/* eslint-env node */
/* global process */

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get access_token from cookies
    const cookies = req.headers.cookie?.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});

    const accessToken = cookies?.access_token;

    if (!accessToken) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Decode the JWT to get user info (basic validation)
    // In production, you should verify the token with Supabase
    const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
    
    // Check if token is expired
    if (payload.exp * 1000 < Date.now()) {
      return res.status(401).json({ error: 'Token expired' });
    }

    res.status(200).json({ 
      user: {
        id: payload.sub,
        email: payload.email,
        role: payload.role
      }
    });

  } catch (error) {
    console.error('Auth check error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
}
