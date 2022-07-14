import IPlatformsNames from '@services/typeOSService/types/IPlatformsNames';
import Platforms from '@services/typeOSService/types/Platforms';

const os = window.require('os');


const platformsNames: IPlatformsNames = {
    win32: Platforms.WINDOWS,
    darwin: Platforms.MAC,
    linux: Platforms.LINUX,
};

const currentOS = platformsNames[os.platform()]

export default currentOS

