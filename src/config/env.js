require("dotenv").config();

const PORT = Number(process.env.PORT) || 8080;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
    process.env.SUPABASE_PUBLISHABLE_KEY;

const SUPABASE_SECRET_KEY =
    process.env.SUPABASE_SECRET_KEY;

const SUPABASE_JWKS_URL =
    process.env.SUPABASE_JWKS_URL;

if (!SUPABASE_URL) {
    throw new Error("SUPABASE_URL is not configured");
}

if (!SUPABASE_PUBLISHABLE_KEY) {
    throw new Error(
        "SUPABASE_PUBLISHABLE_KEY is not configured"
    );
}

if (!SUPABASE_JWKS_URL) {
    throw new Error(
        "SUPABASE_JWKS_URL is not configured"
    );
}

module.exports = {
    PORT,
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    SUPABASE_SECRET_KEY,
    SUPABASE_JWKS_URL
};