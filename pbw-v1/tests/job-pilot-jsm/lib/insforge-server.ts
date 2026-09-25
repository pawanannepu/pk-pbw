import { createServerClient } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";

export const createInsforgeServer = async () => {
  const cookieStore = await cookies();
  return createServerClient({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL,
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY,
    cookies: cookieStore,
  });
};

export const getSessionUser = async () => {
  try {
    const cookieStore = await cookies();
    const hasToken =
      cookieStore.has("insforge_access_token") ||
      cookieStore.has("insforge_refresh_token");
    if (!hasToken) return null;

    const insforge = await createInsforgeServer();
    const { data, error } = await insforge.auth.getCurrentUser();
    if (error || !data?.user) return null;
    return data.user;
  } catch (err) {
    console.error("[insforge-server] Error reading session user:", err);
    return null;
  }
};

