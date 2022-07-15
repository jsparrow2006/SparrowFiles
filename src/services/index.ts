import ExtentionService from '@services/extensionService';
import DriveService from '@services/driveService';
import ModalService from "@services/modalService";
import FileSystemService from '@services/fileSystemService';
import currentOS from '@services/typeOSService';

export const driveService = new DriveService(currentOS, 1000);
export const fileSystemService = new FileSystemService(currentOS).fs();
export const modalService = new ModalService();

export const extensionService = new ExtentionService({modalService, currentOS, fileSystemService});

console.log(extensionService)


const MainService = () => {

}

export default MainService
