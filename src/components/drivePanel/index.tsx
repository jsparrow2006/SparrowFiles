import React, { useState, useEffect } from 'react';
import { Button, Badge, Loader, Icon } from 'rsuite';

import { bToGb } from '@libs/sizeConverters'

import IDrive from "@services/driveService/types/IDrive";

import { driveService } from '@services/index'

import './index.scss'

interface IDrivePanelPropTypes {
    onChange: (drivePath: string) => void
}

const DrivePanel: React.FC<IDrivePanelPropTypes> = (props: IDrivePanelPropTypes) => {

    const [driveList, setDriveList] = useState<IDrive[]>([])
    const [activeDrive, setActiveDrive] = useState<number>(0)

    useEffect(() => {
        const driveSubscriber = driveService.subscribe(setDriveList);

        return () => {
            driveService.unsubscribe(driveSubscriber)
        }
    }, []);

    const handleClickButtonDrive = (event: React.SyntheticEvent) => {
        const { onChange } = props;
        const element = event.currentTarget as HTMLInputElement
        onChange(element.title)
        setActiveDrive(+element.id)
    }

    return (
        <div className='drivePanel'>
            {
                driveList.length === 0 && <Loader />
            }
            <div>
                {
                    driveList.map((drive, index) => {
                        return <Badge content={drive.name} key={`drive_${drive.name}_${index}`}>
                            <Button color='blue'
                                    appearance={activeDrive === index ? 'primary' : 'ghost'}
                                    id={index}
                                    active={activeDrive === index}
                                    onClick={handleClickButtonDrive}
                                    className='buttonDrive'
                                    title={drive.mount_point}
                            >
                                {
                                    drive.type === 'FLASH' ? <Icon icon='microchip' /> : <Icon icon='server' />
                                 }
                            </Button>
                        </Badge>
                    })
                }
            </div>
            <div>
                {
                    driveList[activeDrive] &&
                    <Badge content={`${bToGb(driveList[activeDrive].used)}Gb / ${bToGb(driveList[activeDrive].total)}Gb`} />
                }
            </div>
        </div>
    );
}

export default DrivePanel;
