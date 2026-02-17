"use client";

type Message = {
    id: string;
    content: string;
    member: {
        profile: {
            name: string;
            imageUrl: string;
        }
    };
    createdAt: string;
}

interface ChatMessagesProps {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    member: any; // TODO: Type this properly when Member type is available
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation";
}

export const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,
}: ChatMessagesProps) => {
    // Stub messages for now
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const messages: Message[] = [];

    console.log({ member, chatId, apiUrl, socketUrl, socketQuery, paramKey, paramValue, type });

    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1" />
            <div className="flex flex-col-reverse mt-auto">
                {/* Messages will render here */}
                <div className="flex flex-col space-y-4 px-4">
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                        Welcome to #{name}!
                    </p>
                </div>
            </div>
        </div>
    );
};
