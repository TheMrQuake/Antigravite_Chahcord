export type Server = {
    id: string;
    name: string;
    imageUrl: string;
    inviteCode: string;
    profileId: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Channel = {
    id: string;
    name: string;
    type: "TEXT" | "AUDIO" | "VIDEO";
    profileId: string;
    serverId: string;
    createdAt: Date;
    updatedAt: Date;
};
