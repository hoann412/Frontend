import { FileImageOutlined } from '@ant-design/icons';

const UploadButtonVariant = () => {
    return (
        <div className='ant-upload-list-item ant-upload-list-item-undefined h-14 w-14'>
            <span className='h-full w-full cursor-pointer '>
                <FileImageOutlined className='h-full w-full text-[3.4rem] opacity-15' />
            </span>
        </div>
    );
};

export default UploadButtonVariant;
