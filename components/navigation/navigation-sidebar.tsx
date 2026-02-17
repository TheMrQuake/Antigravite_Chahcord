import { redirect } from "next/navigation";
import { UserButton } from "@/components/user-button"; // We need to create this or use Avatar
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";

export const NavigationSidebar = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/");
    }

    const { data: servers } = await supabase.from("members").select("server:servers(*)").eq("profile_id", user.id);

    // Flatten the structure
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serverList = servers?.map((member: any) => member.server) || [];

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
            <NavigationAction />
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
                {serverList.map((server: { id: string; name: string; image_url: string }) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.image_url}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <UserButton user={user} />
            </div>
        </div>
    )
}
