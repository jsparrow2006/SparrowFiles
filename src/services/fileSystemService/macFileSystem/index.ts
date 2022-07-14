import IFileSystem from '@services/fileSystemService/types/IFileSystem'

const fileIcon = window.require("extract-file-icon");
const {execSync} = window.require('child_process');
const iconv  = window.require('iconv-lite');

enum ModeType {
    'r' = 4,
    'w' = 2,
    'x' = 1,
    '-' = 0
};

enum FileType {
    'd' = 'FILE',
    'b' = 'BLOCKED_FILE',
    'c' = 'CYMBOL_FILE',
    'l' = 'LINK',
    's' = 'SOCKET',
    'p' = 'PIPE',
    '-' = 'FILE',
    '/' = 'DIR'
};

class MacFileSystem implements IFileSystem{
    constructor() {
        if (!!MacFileSystem._instance) {
            return MacFileSystem._instance;
        }
        this._decode = 'cp1125';
        MacFileSystem._instance = this;
        return this;
    }

    private _syncExec = (command: string) => {
        let result = execSync(command);
        return  iconv.decode(result, 'cp1125')
    }

    private static _instance: any;
    private _decode: string;
    private _user: string = this._syncExec(`users`);
    private _groups: string[] = this._syncExec(`groups`).split(' ');

    private _getModeNumber = (char: string): number => {
        return ModeType[char as keyof typeof ModeType]
    }

    private _parseMode = (mode: string) : any => {
        return {
            type: FileType[mode[0] as keyof typeof FileType],
            mode: [
                this._getModeNumber(mode[1])+this._getModeNumber(mode[2])+this._getModeNumber(mode[3]),
                this._getModeNumber(mode[4])+this._getModeNumber(mode[5])+this._getModeNumber(mode[6]),
                this._getModeNumber(mode[7])+this._getModeNumber(mode[8])+this._getModeNumber(mode[9])
            ]
        }
    }

    private _isViewFile = (group: string) => {
        return this._groups.includes(group);
    }

    public readDir(path: string) {
        console.log(`cd ${path} && pwd`)
        return {
            currentDirectory: this._syncExec(`cd ${path} && pwd`).split('\n')[0],
            files: this._syncExec(`cd ${path} && ls -lTF | tr ' ' "|"`)
                .split('\n')
                .slice(1, -1)
                .map((item: string) => {
                    const fileInfo = item.split(/\|+/g)
                    let fileName = fileInfo[9]
                    const mask = new String(fileInfo[0]).split('');
                    let icon = ''
                    if (fileName[fileName.length - 1] === '/') {
                        fileName = fileName.slice(0, -1);
                        mask[0] = '/'
                    }
                    for (let i = 10; i < fileInfo.length; i++){
                        fileName += ' ' + fileInfo[i]
                    }
                    icon = new Buffer(fileIcon(`${path}/${fileName}`, 32)).toString('base64');
                    let fileNameInfo: string[] = []
                    if (mask[0] !== '/') {
                        fileNameInfo = fileName.split('.')
                    } else {
                        fileNameInfo[0] = fileName;
                    }
                    return {
                        name: fileNameInfo[0],
                        ext: fileNameInfo[1],
                        ...this._parseMode(mask.join('')),
                        owner: fileInfo[2],
                        group: fileInfo[3],
                        size: fileInfo[4],
                        isView: this._isViewFile(fileInfo[3]),
                        date: new Date(`${fileInfo[5]} ${fileInfo[6]} ${fileInfo[8]} ${fileInfo[7]}`).toISOString(),
                        icon: icon
                    }
                })
        }
    }

}

export default MacFileSystem
