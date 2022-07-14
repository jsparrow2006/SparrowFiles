import React  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Extensions from '@components/extensions';
import WorkArea from '@components/workArea';
import Header from '@components/header';
import MainModal from '@components/mainModal';

import './main.scss';

interface IMainPropTypes {

}

const Main: React.FC<IMainPropTypes> = (props: IMainPropTypes) => {
    return (
        <div>
            <Header>
                <Extensions />
            </Header>
            <WorkArea />
            <MainModal />
        </div>
    );
}



function mapStateToProps(state: any) {
    return {
        main: state.main
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

