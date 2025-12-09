/* eslint-env node */
/* global process */

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY


export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Hello World from Cat Findr!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
}