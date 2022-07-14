import React, {useCallback, useState} from 'react';

import DrivePanel from "@components/drivePanel";
import FileList from "@components/fileList";

import {  fileSystemService } from '@services/index'

import './index.scss'

interface IPanelPropTypes {

}

const Panel: React.FC<IPanelPropTypes> = (props: IPanelPropTypes) => {
    const [selectDrive, setSelectDrive] = useState<string>('/');
    const [fileList, setFileList] = useState([]);
    const [currentDir, setCurrentDir] = useState<string>('');

    const handleChangePath = useCallback((path: string) => {
        const newFileList = fileSystemService.readDir(path);
        console.log(newFileList)
        setFileList(newFileList.files);
        setCurrentDir(newFileList.currentDirectory);
    }, [setSelectDrive, setCurrentDir])

    const handleClickBack = useCallback(() => {
        handleChangePath((currentDir !== '/' ? currentDir : '') + '/ ..')
    }, [currentDir])

    const handleDblClickFiles = useCallback((file: any) => {
        console.log(file)
        console.log(currentDir)
        console.log((currentDir !== '/' ? currentDir : '') + '/' + file.name)
        if (file.type === 'DIR') {
            try {
                handleChangePath((currentDir !== '/' ? currentDir : '') + '/' + file.name)
            } catch (e) {
                console.log(e)
            }
        }
    }, [currentDir])

    return (
        <div className='panel'>
            <DrivePanel onChange={handleChangePath}/>
            <FileList fileList={fileList} onClickBack={handleClickBack} onDblClick={handleDblClickFiles} />
        </div>
    );
}

export default Panel;
