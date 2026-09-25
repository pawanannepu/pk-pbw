// 1. External imports
import { redirect } from "next/navigation";

// 2. Internal imports
// (None)

// 3. Type definitions
type CallbackPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 4. Component
export default async function CallbackPage({ searchParams }: CallbackPageProps) {
  const params = await searchParams;
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") {
      search.set(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => search.append(key, v));
    }
  }

  const query = search.toString();
  redirect(`/api/auth/callback${query ? `?${query}` : ""}`);
}
