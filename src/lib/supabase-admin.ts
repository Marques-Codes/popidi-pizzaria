import { createClient } from "@supabase/supabase-js";

function normalizeSupabaseUrl(rawUrl: string) {
  const url = new URL(rawUrl);

  if (!url.origin.includes(".supabase.co")) {
    throw new Error(
      "SUPABASE_URL inválida. Use a URL do projeto, exemplo: https://xxxx.supabase.co",
    );
  }

  return url.origin;
}

export function getSupabaseAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL não configurada.");
  }

  if (!supabaseServiceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY não configurada.");
  }

  return createClient(normalizeSupabaseUrl(supabaseUrl), supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}