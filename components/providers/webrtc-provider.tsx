"use client";

import { createContext, useContext, useEffect } from "react";

const WebRTCContext = createContext({});

export const useWebRTC = () => useContext(WebRTCContext);

export const WebRTCProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // Stub initialization
        console.log("WebRTC Provider Initialized");
    }, []);

    return (
        <WebRTCContext.Provider value={{}}>
            {children}
        </WebRTCContext.Provider>
    );
};
