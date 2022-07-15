import React, { useState } from 'react';
import { Icon, Nav, Navbar, Drawer, Button } from 'rsuite';

import Settings from '@containers/settings'

import IPropsWithChildren from '@commonTypes/IPropsWithChildren'

import './index.scss'

interface IHeaderPropTypes extends IPropsWithChildren{

}

const Header: React.FC<IHeaderPropTypes> = (props: IHeaderPropTypes) => {
    const { children } = props;
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(true);

    const openDrawer = () => {
        setIsOpenDrawer(true);
    }

    const closeDrawer = () => {
        setIsOpenDrawer(false);
    }

    return (
        <>
            <Navbar>
                <Navbar.Body className='navPanel'>
                    {children}
                    <Nav pullRight>
                        <Nav.Item icon={<Icon icon="cog" />}
                                  onClick={openDrawer}>
                            Settings
                        </Nav.Item>
                    </Nav>
                </Navbar.Body>
            </Navbar>
            <Drawer
                full={true}
                backdrop='static'
                placement='bottom'
                show={isOpenDrawer}
                onHide={closeDrawer}
                className='settingsDialog'
            >
                <Drawer.Header>
                    <Drawer.Title>Settings</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body className='drawerBodyCustom'>
                    <Settings />
                </Drawer.Body>
            </Drawer>
        </>
    );
}

export default Header;
