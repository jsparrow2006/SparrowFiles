import MacFileSystem from '@services/fileSystemService/macFileSystem';
import IFileSystem from '@services/fileSystemService/types/IFileSystem';

import PubSub from '@services/pubSub';

import Platforms  from '@services/typeOSService/types/Platforms';
import IPlatformMatches  from '@commonTypes/IPlatformMatches';

class FileSystemService extends PubSub{
    constructor(os: Platforms) {
        super()
        if (!!FileSystemService._instance) {
            return FileSystemService._instance;
        }
        this._os = os;
        FileSystemService._instance = this;
        return this;
    }

    private static _instance: any;
    private _os: Platforms;

    private _fs: IPlatformMatches<IFileSystem> = {
        [Platforms.MAC]: new MacFileSystem(),
        [Platforms.WINDOWS]: new MacFileSystem(),
        [Platforms.LINUX]: new MacFileSystem(),
    }

    public fs = () => {
        return this._fs[this._os]
    }

}

export default FileSystemService


