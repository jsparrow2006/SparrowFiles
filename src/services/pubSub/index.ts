class PubSub {
    constructor() {
        this._subscribers = {
            default: {}
        }
    }

    private _subscribers: any;

    protected _sendMessage = (data: any, channel: string = 'default') => {
        Object.keys(this._subscribers[channel]).forEach((item) => {
            let message;
            if (Array.isArray(data)){
                message = [...data];
            } else if (typeof data === 'object') {
                message = {...data};
            } else {
                message = data;
            }
            this._subscribers[channel][item](message);
        })
    }

    public subscribe = (callback: any, channel: string = 'default') => {
        const subscriberId = String(Date.now()) + Math.floor(Math.random() * 1000);
        this._subscribers[channel][subscriberId] = callback;
        return subscriberId;
    }

    public unsubscribe = (id: string, channel: string = 'default') => {
        delete this._subscribers[channel][id];
    }

}

export default PubSub


