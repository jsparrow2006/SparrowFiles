import PubSub from '@services/pubSub';
import {prototype} from "dotenv-expand";

const fs = window.require('fs');
const path = window.require('path');

export enum ExtentionType {
    SERVICE = 'SERVICE',
    EXTENTION = 'EXTENTION'

}

export interface IMeta {
    name: string;
    version: string;
    author: string;
    type: ExtentionType;
    views: string[];
}

export interface IExtensionDescription extends IMeta{
    isRunning?: boolean;
    isNeedStart: boolean;
    path: string;
    exec?: any;
    error?: string;
    icon?: string;
}

export interface IExtensionList {
    [key: string]: IExtensionDescription;
}

class ExtensionService extends PubSub{
        constructor(context: any) {
            super()
            if (!!ExtensionService._instance) {
                return ExtensionService._instance;
            }
            this._context = context;
            this._extentionList = JSON.parse(window.localStorage.getItem('ExtensionList') || '{}')
            if (!window.localStorage.getItem('ExtensionList')){
                this.updateExtensionsList();
            } else {
                this.runExtensions();
            }

            // setInterval(() => {
            //     this._sendMessage(this._extentionList)
            // }, 500)
            ExtensionService._instance = this;
            return this;
        }

    private static _instance: any;
    private _context: any;
    private _extentionList: IExtensionList;

    private _getBase64Icon = (imageUrl: string): string => {
        let bitmap = fs.readFileSync(imageUrl);
        return new Buffer(bitmap).toString('base64');
    }

    private _generateHash = (string: string): string => {
        for(var i = 0, h = 0; i < string.length; i++)
            h = Math.imul(31, h) + string.charCodeAt(i) | 0;
        return String(h);
    }

    updateExtensionsList = () => {
        fs.readdir('./public/extensions', (err: any, fileList: string[]) => {
            fileList.forEach((ext, index) => {
                const meta = JSON.parse(fs.readFileSync(`./public/extensions/${ext}/manifest.json`, {encoding:'utf8', flag:'r'}));
                const icon = this._getBase64Icon(`./public/extensions/${ext}/${meta.icon}`)
                this._extentionList[this._generateHash(`${meta.name}-${index}`)] = {...meta, isNeedStart: true, path: path.resolve(`./public/extensions/${ext}/`), icon: icon, views: meta.views || []};
            })
            this.runExtensions()
            window.localStorage.setItem('ExtensionList', JSON.stringify(this._extentionList));
        })
    }

    runExtensions = () => {
        Object.keys(this._extentionList).map(async (ext: string) => {
            await this.startExtension(ext);
        })
    }

    getExtensionsList = () => {
        return this._extentionList;
    }

    setIsNeedStart = (isNeedStart: boolean, extentionName: string) => {
        this._extentionList[extentionName].isNeedStart = isNeedStart
        this._sendMessage(this._extentionList)
    }

    stopExtension = (extentionId: string) => {
        try {
            this._extentionList[extentionId].exec.stop()
            this._extentionList[extentionId].exec = null
            this._extentionList[extentionId].isRunning = false
        } catch (e) {
            this._extentionList[extentionId]['error'] = e;
        } finally {
            this._sendMessage(this._extentionList)
        }
    }

    private _viewsPrepare = async (extension: IExtensionDescription) => {
        const views: any = {};
        extension.views.forEach((name) => {
            const content = fs.readFileSync(`${extension.path}/views/${name}.html`, {encoding:'utf8', flag:'r'})
            const template = document.createElement('div');
            template.innerHTML = content;
            views[name] = template;
        })

        return views
    }

    startExtension = async (extentionId: string) => {
        const content = fs.readFileSync(`${this._extentionList[extentionId].path}/index.js`, {encoding:'utf8', flag:'r'})
        try {
            const views = await this._viewsPrepare(this._extentionList[extentionId])
            // eslint-disable-next-line no-new-func
            const func = new Function( `return ${content}`)()
            const startExtention = func({...this._context, views });
            this._extentionList[extentionId]['exec'] = startExtention ? new startExtention() : {};
            this._extentionList[extentionId]['isRunning'] = true;
        } catch(e) {
            this._extentionList[extentionId]['isRunning'] = false;
            this._extentionList[extentionId]['error'] = e;
        } finally {
            this._sendMessage(this._extentionList)
        }
    }

}

export default ExtensionService


