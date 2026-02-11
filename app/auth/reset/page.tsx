import { buildMetadata } from "@/lib/seo";
import { ResetRequestClient } from "@/components/reset-request-client";
import { ResetPasswordClient } from "@/components/reset-password-client";

export const metadata = buildMetadata({ title: "Resetare parolă", path: "/auth/reset" });

export default function ResetPage({ searchParams }: { searchParams: { token?: string } }) {
  const token = searchParams.token;

  return (
    <div className="mx-auto max-w-md space-y-4 rounded-xl border bg-white p-6">
      <h1 className="font-display text-3xl font-bold">Resetare parolă</h1>
      {token ? <ResetPasswordClient token={token} /> : <ResetRequestClient />}
    </div>
  );
}
