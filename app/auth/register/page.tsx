import { buildMetadata } from "@/lib/seo";
import { registerAction } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata = buildMetadata({ title: "Înregistrare", path: "/auth/register" });

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md space-y-4 rounded-xl border bg-white p-6">
      <h1 className="font-display text-3xl font-bold">Creează cont</h1>
      <form action={registerAction} className="space-y-3">
        <Input name="name" placeholder="Nume complet" required />
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="password" type="password" placeholder="Parolă (min 6 caractere)" required />
        <Button type="submit" className="w-full">
          Înregistrare
        </Button>
      </form>
    </div>
  );
}
