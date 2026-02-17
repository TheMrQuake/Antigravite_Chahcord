"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    content: z.string().min(1),
});

export const ChatInput = ({
    apiUrl,
    query,
    name,
    type,
}: {
    apiUrl: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query: Record<string, any>;
    name: string;
    type: "conversation" | "channel";
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values, apiUrl, query);
            // TODO: Implement axios.post(apiUrl, values, { params: query });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-4 pb-6">
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => { }}
                        className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                    >
                        <Plus className="text-white dark:text-[#313338]" />
                    </button>
                    <Input
                        disabled={isLoading}
                        {...form.register("content")}
                        placeholder={`Message ${type === "conversation" ? name : "#" + name}`}
                        className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    />
                    <div className="absolute top-7 right-8">
                        <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
                    </div>
                </div>
            </div>
        </form>
    );
};
