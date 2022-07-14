import PubSub from '@services/pubSub';

interface IModalService {
    handleOpenClose: (isOpen: boolean) => any
}

export interface IModalState {
    isOpen: boolean;
    caption?: string;
    body?: any;
}

class ModalService extends PubSub {
    constructor() {
        super()
        if (!!ModalService._instance) {
            return ModalService._instance;
        }
        this._modalState.isOpen = false;
        ModalService._instance = this;
        return this;
    }

    private static _instance: any;

    private _modalState: IModalState = {
        isOpen: false,
        caption: '',
        body: null
    }

    openModal = () => {
        this._modalState.isOpen = true;
        this._sendMessage(this._modalState);
    }

    closeModal = () => {
        console.log('close modal')
        this._modalState.isOpen = false;
        this._sendMessage(this._modalState);
    }

    prepareModal = (caption: string, body: any = null) => {
        this._modalState.caption = caption;
        this._modalState.body = body;
        // this._sendMessage(this._modalState);
    }

    isOpen = () => {
        this._sendMessage(this._modalState);
        // return this._modalState.isOpen;
    }
}

export default ModalService


