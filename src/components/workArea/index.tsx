import React from 'react';
import SplitPane from 'react-split-pane';

import Panel from '@components/panel'

import './index.scss'

interface IWorkAreaPropTypes {

}

const WorkArea: React.FC<IWorkAreaPropTypes> = (props: IWorkAreaPropTypes) => {
    return (
        <div className='workAreaPanel' >
            <SplitPane className='split' split='vertical' defaultSize={window.innerWidth/2}>
                <Panel/>
                <Panel/>
            </SplitPane>
        </div>
    );
}

export default WorkArea;
