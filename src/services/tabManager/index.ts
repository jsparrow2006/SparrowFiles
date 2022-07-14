import MacFileSystem from '@services/fileSystemService/macFileSystem';
import IFileSystem from '@services/fileSystemService/types/IFileSystem';

import PubSub from '@services/pubSub';

class Tab {
    public activeDrive = '';
    public currentFile = '';
    public selectedFiles = '';
}

class TabManager extends PubSub{
    constructor() {
        super()
        if (!!TabManager._instance) {
            return TabManager._instance;
        }
        TabManager._instance = this;
        return this;
    }

    private static _instance: any;
    private tabs = {
        activeTab: 0,
        0: new Tab(),
        1: new Tab()
    }

    public fs = () => {

    }

}

export default TabManager


