"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AgoraContext = createContext({});

export const useAgora = () => useContext(AgoraContext);

export const AgoraProvider = ({ children }: { children: React.ReactNode }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const [client, setClient] = useState<any>(null);

    useEffect(() => {
        // Stub initialization
        console.log("Agora Provider Initialized");
    }, []);

    return (
        <AgoraContext.Provider value={{ client }}>
            {children}
        </AgoraContext.Provider>
    );
};
