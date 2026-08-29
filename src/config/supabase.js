const { createClient } = require("@supabase/supabase-js");

const {
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
} = require("./env");

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

module.exports = supabase;