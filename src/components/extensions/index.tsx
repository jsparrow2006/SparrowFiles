import React, {useState, useEffect, useCallback} from 'react';
import { Button } from 'rsuite';

import useSubscribe from '@hooks/useSubscribe';

import { extensionService } from '@services/index';

import { IExtensionList } from '@services/extensionService';

import './index.scss'

interface IExtensionsPropTypes {

}

const Extensions: React.FC<IExtensionsPropTypes> = (props: IExtensionsPropTypes) => {
    let extensions = useSubscribe<IExtensionList>(extensionService);

    return (
        <div>
            {
                Object.keys(extensions).map((extension, i) => {
                    const click = extensions[extension].exec ? extensions[extension].exec['click'] :() => {console.log('not callback')}
                    return <Button appearance="ghost"
                                   style={{'backgroundImage': `url(data:image/png;base64,${extensions[extension].icon})`}}
                                   key={`ext-${extensions[extension].name}`}
                                   className='extension-icon'
                                   title={extensions[extension].name}
                                   onClick={click}
                    />
                })
            }
            <Button appearance="ghost"
                    style={{'backgroundImage': `url(data:image/png;base64,)`}}
                    className='extension-icon'
                    title={'ddd'}
                    onClick={extensionService.updateExtensionsList}
            />
        </div>
    );
}

export default Extensions;
