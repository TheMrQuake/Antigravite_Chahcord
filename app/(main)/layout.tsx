import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/");
    }

    const { data: servers } = await supabase.from("members").select("*, server:servers(*)").eq("profile_id", user.id);

    // Check if user is member of any server.
    // Actually we want all servers the user is member of.
    // But for InitialModal, we just care if user has any servers.
    // The query above returns members.

    // Correct query:
    // We want to know if there are any servers this user belongs to.

    const hasServers = servers && servers.length > 0;

    return (
        <div className="h-full flex flex-col md:flex-row dark:bg-[#1E1F22]">
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0 text-white">
                <NavigationSidebar />
            </div>
            <main className="md:pl-[72px] h-full w-full">
                {!hasServers && <InitialModal />}
                {children}
            </main>
        </div>
    );
}
