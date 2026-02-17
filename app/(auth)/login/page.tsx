"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { login } from "@/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (formData: FormData) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await login(formData);
            if (result?.error) {
                setError(result.error);
            } else {
                // Success is handled by redirect in action, but we can also refresh
                // router.refresh();
            }
        } catch (e) {
            setError("Произошла ошибка при входе. Попробуйте еще раз.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-sm p-4 bg-zinc-900 rounded-lg border border-zinc-800 shadow-xl">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold">С возвращением!</h1>
                <p className="text-sm text-zinc-400">Мы так рады снова видеть вас!</p>
            </div>

            <form action={onSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase text-zinc-400">Email</label>
                    <Input
                        disabled={isLoading}
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        className="bg-zinc-950 border-0 focus-visible:ring-indigo-500"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase text-zinc-400">Пароль</label>
                    <Input
                        disabled={isLoading}
                        name="password"
                        type="password"
                        className="bg-zinc-950 border-0 focus-visible:ring-indigo-500"
                    />
                </div>
                {error && (
                    <div className="text-rose-500 text-sm font-medium">
                        {error}
                    </div>
                )}
                <Button disabled={isLoading} className="bg-indigo-500 hover:bg-indigo-600 text-white">
                    Войти
                </Button>
            </form>

            <div className="text-xs text-zinc-400 mt-2">
                Нет аккаунта? <Link href="/register" className="text-indigo-400 hover:underline">Зарегистрироваться</Link>
            </div>
        </div>
    );
}
