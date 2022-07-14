import React, {useCallback, useState} from 'react';

import DrivePanel from "@components/drivePanel";

import {  fileSystemService } from '@services/index'

import './index.scss'

interface IFileListPropTypes {
    fileList: any[];
    onDblClick: (file: any) => void;
    onClickBack: () => void;
}

const FileList: React.FC<IFileListPropTypes> = (props: IFileListPropTypes) => {
    const { fileList, onDblClick, onClickBack } = props;

    const handleDblClick = useCallback((index: number) => {
        // @ts-ignore
        // event.stopPropagation();
        onDblClick(fileList[index]);
    }, [fileList])

    return (
        <>
            <div className='file' onDoubleClick={onClickBack}>
                {/*<div className='icon' style={{'backgroundImage': `url(data:image/png;base64,${file.icon})`}} />*/}
                <div>..</div>
            </div>
            <div className='fileList'>
                {
                    fileList.map((file, i) => {
                        // @ts-ignore
                        return file.isView ? <div key={`file-${i}`} id={String(i)} className='file' onDoubleClick={() => handleDblClick(i)}>
                            <div className='icon' style={{'backgroundImage': `url(data:image/png;base64,${file.icon})`}} />
                            <div>{`${file.name}${file.ext ? `.${file.ext}` : ''}`}</div>
                        </div> : null
                    })
                }
            </div>
        </>
    );
}

export default FileList;
