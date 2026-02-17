"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/hooks/use-modal-store";

export const InitialModal = () => {
    const { onOpen } = useModal();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            onOpen("createServer");
        }
    }, [isMounted, onOpen]);

    return null;
}
