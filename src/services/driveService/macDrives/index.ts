import IDrivesList from "@services/driveService/types/IDrivesList";

const {execSync} = window.require('child_process');
const iconv  = window.require('iconv-lite');

const DRIVE_CHAR = 'CDEFGHIJKLMNOPQRSTYWXYZ';

const macDrives: IDrivesList = () => {
    let result = execSync('df -k -l');
    result = iconv.decode(result, 'cp1125')
    let drt = result.split('\n');
    let drives: any[] = [];
    let counterDrive = 0;
    drt.map((item: string, index: number) => {
        let drivestemp = item.split(/\s\s*/g);
        let descSplit = drivestemp[8] ? drivestemp[8].split('/') : []
        const type = !descSplit.includes('Volumes') ? 'HDD' : 'FLASH'
        if (drivestemp[0] !== '' && index !== 0 && !descSplit.includes('System')){
            drives.push({
                name: DRIVE_CHAR[counterDrive],
                total: drivestemp[3],
                used: drivestemp[2],
                description: drivestemp[0],
                mount_point: drivestemp[8],
                type: type
            });
            counterDrive++;
        }
    });

    return drives
}

export default macDrives
