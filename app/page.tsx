import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to ChahCord</h1>
      <p className="text-lg mb-8 text-zinc-400">
        Vibe coding chat app for friends.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </main>
  );
}
