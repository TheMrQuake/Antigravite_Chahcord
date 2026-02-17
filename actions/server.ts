"use server";

import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

export async function createServer(values: {
    name: string;
    imageUrl: string;
}) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const { data: server, error } = await supabase.from("servers").insert({
            profile_id: user.id,
            name: values.name,
            image_url: values.imageUrl,
            invite_code: uuidv4(),
        }).select().single();

        if (error) {
            console.error(error);
            throw new Error("Failed to create server");
        }

        // Add creator as ADMIN member
        const { error: memberError } = await supabase.from("members").insert({
            profile_id: user.id,
            server_id: server.id,
            role: "ADMIN"
        });

        if (memberError) {
            console.error(memberError);
            throw new Error("Failed to create member");
        }

        // Create default channels
        const { error: channelError } = await supabase.from("channels").insert([
            { name: "general", profile_id: user.id, server_id: server.id, type: "TEXT" },
            { name: "voice", profile_id: user.id, server_id: server.id, type: "AUDIO" }
        ]);

        if (channelError) {
            console.error(channelError);
            throw new Error("Failed to create channels");
        }

        return server;
    } catch (error) {
        console.log("[SERVERS_POST]", error);
        throw new Error("Internal Error");
    }
}
