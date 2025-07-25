import { ADMIN_ROUTES } from '~/constants/router';
import { useMutationCreateSize } from '~/hooks/Sizes/Mutations/useCreateSize';
import { ISizeFormData } from '~/types/Size';
import { sizeNameValidator } from '~/validation/size/validator';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input } from 'antd';
import { Link } from 'react-router-dom';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';

const CreateSize = () => {
    const [form] = Form.useForm<ISizeFormData>();
    const { mutate: createSize, isPending } = useMutationCreateSize();

    const onFinish: FormProps<ISizeFormData>['onFinish'] = (values) => {
        createSize(values);
    };

    const onFinishFailed: FormProps<ISizeFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <WrapperPageAdmin
            title='Tạo mới kích cỡ'
            option={
                <Link to={ADMIN_ROUTES.SIZES} className='underline'>
                    Quay lại
                </Link>
            }
        >
            <Form
                form={form}
                layout='vertical'
                className='grid grid-cols-12'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className='col-span-8'>
                    <div className='w-full rounded-lg p-2 px-4'>
                        <Form.Item<ISizeFormData>
                            label='Tên kích cỡ'
                            name='name'
                            className='font-medium text-[#08090F]'
                            rules={sizeNameValidator}
                        >
                            <Input placeholder='Nhập tên cho kích cỡ...' />
                        </Form.Item>
                    </div>
                </div>
                <div className='border-opacity-20 col-span-4 flex flex-col justify-between border-s border-black px-4'>
                    <div className='border-opacity-5 sticky right-0 bottom-0 my-2 flex justify-end border-t-2 border-black p-4'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            icon={<PlusSquareOutlined />}
                            loading={isPending}
                            disabled={isPending}
                            size='large'
                        >
                            Thêm mới
                        </Button>
                    </div>
                </div>
            </Form>
        </WrapperPageAdmin>
    );
};

export default CreateSize;
