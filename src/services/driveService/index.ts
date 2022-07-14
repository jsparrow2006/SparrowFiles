import macDrives from '@services/driveService/macDrives';

import PubSub from '@services/pubSub';

import Platforms  from '@services/typeOSService/types/Platforms';
import IPlatformMatches  from '@commonTypes/IPlatformMatches';
import IDrive from '@services/driveService/types/IDrive';

class DriveService extends PubSub{
    constructor(os: Platforms, period: number) {
        super()
        if (!!DriveService._instance) {
            return DriveService._instance;
        }
        this._os = os;
        this._driveList = []
        setInterval(this._requestDriveList, period)
        DriveService._instance = this;
        return this;
    }

    private static _instance: any;
    private _os: Platforms;
    private _driveList: IDrive[];

    private _requestDriveList = () => {
        const newDriveList = this._getDriveList[this._os]()
        if (JSON.stringify(this._driveList) !== JSON.stringify(newDriveList)) {
            this._driveList = newDriveList;
            this._sendMessage(this._driveList)
        }
    }

    private _getDriveList: IPlatformMatches<() => IDrive[]> = {
        [Platforms.MAC]: macDrives,
        [Platforms.WINDOWS]: macDrives,
        [Platforms.LINUX]: macDrives,
    }

    public getDrives() {
        return this._getDriveList[this._os]()
    }

}

export default DriveService


