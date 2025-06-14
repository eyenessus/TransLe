export interface IMessage {
    from: string;
    id: string;
    timestamp: string;
    text: {
        body: string;
    };
    type: 'text' | string;
}