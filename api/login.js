/* eslint-env node */
/* global process */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({
      error:
        "Supabase not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY env vars.",
    });
  }

  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    console.log("Login attempt for:", email);
    let { data: data, error } = await supabase.auth.signInWithPassword({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      return res.status(401).json({
        now: new Date().toISOString(),
        note: "`Sign in` failed; returning server time as fallback",
        details: error.message,
      });
    }

    // Set httpOnly cookies for tokens
    const isProduction = process.env.NODE_ENV === "production";

    res.setHeader("Set-Cookie", [
      `access_token=${data.session.access_token}; HttpOnly; Secure=${isProduction}; SameSite=Strict; Path=/; Max-Age=3600`,
      `refresh_token=${data.session.refresh_token}; HttpOnly; Secure=${isProduction}; SameSite=Strict; Path=/; Max-Age=2592000`,
    ]);

    // Return user data without tokens
    return res.status(200).json({
      message: "Login successful",
      user: data.user,
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
