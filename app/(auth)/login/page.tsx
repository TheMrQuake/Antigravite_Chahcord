import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { login } from "@/actions/auth";

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-6 w-full max-w-sm p-4 bg-zinc-900 rounded-lg border border-zinc-800 shadow-xl">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back!</h1>
                <p className="text-sm text-zinc-400">We&apos;re so excited to see you again!</p>
            </div>

            <form action={async (formData) => {
                "use server"
                await login(formData);
            }} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase text-zinc-400">Email</label>
                    <Input name="email" type="email" placeholder="name@example.com" className="bg-zinc-950 border-0 focus-visible:ring-indigo-500" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase text-zinc-400">Password</label>
                    <Input name="password" type="password" className="bg-zinc-950 border-0 focus-visible:ring-indigo-500" />
                </div>
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">Log In</Button>
            </form>

            <div className="text-xs text-zinc-400 mt-2">
                Need an account? <Link href="/register" className="text-indigo-400 hover:underline">Register</Link>
            </div>
        </div>
    );
}
