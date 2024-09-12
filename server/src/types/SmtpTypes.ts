export interface Smtp {
    host: string;
    port: number;
    username: string;
    password: string;
}

export interface ISmtpForMail {
    id: number;
    host: string;
    port: number;
    username: string;
    password: string;
    addedAt: Date;
}