import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button } from 'rsuite';

import useSubscribe from '@hooks/useSubscribe';

import { modalService } from '@services/index'

import { IModalState } from '@services/modalService'

import './index.scss'

interface IMainModalPropTypes {

}

const MainModal: React.FC<IMainModalPropTypes> = (props: IMainModalPropTypes) => {

    const modalState = useSubscribe<IModalState>(modalService)
    console.log(modalState)

    const onClose = useCallback(() => {
        modalService.closeModal()
    }, [modalService])

    return (
        <Modal show={modalState.isOpen} onHide={onClose} backdrop={false} className='mainModal'>
            <Modal.Header>
                <Modal.Title>{modalState.caption}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div ref={(modalBody) => {modalBody && modalBody.appendChild(modalState.body)}}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} appearance="primary">
                    Ok
                </Button>
                <Button onClick={onClose} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MainModal;
