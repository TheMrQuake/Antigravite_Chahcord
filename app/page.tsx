import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return redirect("/channels");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h1 className="text-4xl font-bold mb-8">Добро пожаловать в ChahCord</h1>
      <p className="text-lg mb-8 text-zinc-400">
        Вайбовый чат для друзей-кодеров.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/login">Войти</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/register">Регистрация</Link>
        </Button>
      </div>
    </main>
  );
}
