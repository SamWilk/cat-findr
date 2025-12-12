/* eslint-env node */
/* global process */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({
      error:
        "Supabase not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY env vars.",
    });
  }

  try {
    // Get access_token from cookies
    const cookies = req.headers.cookie?.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});

    const accessToken = cookies?.access_token;

    if (!accessToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Decode the JWT to get user info
    const payload = JSON.parse(
      Buffer.from(accessToken.split(".")[1], "base64").toString()
    );

    // Check if token is expired
    if (payload.exp * 1000 < Date.now()) {
      return res.status(401).json({ error: "Token expired" });
    }

    const { UserProfileID } = req.query;
    console.log("Fetching profile for UserProfileID:", UserProfileID);
    if (!UserProfileID) {
      return res.status(400).json({ error: "UserProfileID is required" });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data, error } = await supabase
      .from("UserProfile")
      .select("UserProfileID, UserName")
      .eq("UserProfileID", UserProfileID)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(404).json({
        error: "User profile not found",
        details: error.message,
      });
    }

    res.status(200).json({ profile: data });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
