import { buildMetadata } from "@/lib/seo";
import { loginAction, googleLoginAction } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata = buildMetadata({ title: "Login", path: "/auth/login" });

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-4 rounded-xl border bg-white p-6">
      <h1 className="font-display text-3xl font-bold">Autentificare</h1>
      <form action={loginAction} className="space-y-3">
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="password" type="password" placeholder="Parolă" required />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      <form action={googleLoginAction}>
        <Button type="submit" variant="outline" className="w-full">
          Continuă cu Google
        </Button>
      </form>
      <a href="/auth/reset" className="text-sm text-primary">
        Ai uitat parola?
      </a>
    </div>
  );
}
