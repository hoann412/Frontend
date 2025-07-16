import { GetProp, UploadProps } from 'antd';

// @ Upload image type and size
export const ACCEPT_FILE_TYPE = ['image/png', 'image/jpeg', 'image/jpg'];
export const MAX_SIZE = 5000000;

// @ Upload antd type
export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// @ Get base64 image
export const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
