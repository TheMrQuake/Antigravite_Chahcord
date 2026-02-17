"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export const useChatSocket = ({
    channelId,
    serverId,
}: {
    channelId: string;
    serverId: string;
}) => {
    const [isConnected, setIsConnected] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const channel = supabase.channel(`chat:${channelId}`)
            .on("broadcast", { event: "message" }, (payload) => {
                console.log("Received message:", payload);
            })
            .subscribe((status) => {
                if (status === "SUBSCRIBED") {
                    setIsConnected(true);
                }
            });

        return () => {
            supabase.removeChannel(channel);
            setIsConnected(false);
        };
    }, [channelId, supabase]);

    return { isConnected };
};
