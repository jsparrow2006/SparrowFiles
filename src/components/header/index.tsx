import React, { useState } from 'react';
import { Icon, Nav, Navbar, Drawer, Button } from 'rsuite';

import IPropsWithChildren from '@commonTypes/IPropsWithChildren'

import './index.scss'

interface IHeaderPropTypes extends IPropsWithChildren{

}

const Header: React.FC<IHeaderPropTypes> = (props: IHeaderPropTypes) => {
    const { children } = props;
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

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
            >
                <Drawer.Header>
                    <Drawer.Title>Drawer Title</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    dfgdfgdfgg
                </Drawer.Body>
                <Drawer.Footer>
                    <Button onClick={closeDrawer} appearance="primary">Confirm</Button>
                    <Button onClick={closeDrawer} appearance="subtle">Cancel</Button>
                </Drawer.Footer>
            </Drawer>
        </>
    );
}

export default Header;
