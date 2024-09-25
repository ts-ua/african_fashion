export interface ExtendedSession {
    user: {
        name: string;
        email: string;
        password: string;
        image: string;
    };
    expires: string;
}