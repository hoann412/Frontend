import SignImg from '~/assets/img/male-shoes.jpg';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import { useAuthRegister } from '~/hooks/Auth/Mutation/useAuthRegister';
import { Form, Input, Spin } from 'antd';
import { Link } from 'react-router-dom';

const Register = () => {
    useDocumentTitle('BITIS - Đăng ký');
    const [form] = Form.useForm();
    const { mutate, isPending } = useAuthRegister();

    const onFinish = (values: any) => {
        const { confirmPassword, ...data } = values;
        mutate(data);
    };

    return (
        <div className='md:max-w-standard mx-auto mt-12 w-full xl:max-w-7xl'>
            <div className='flex justify-between'>
                <div className='flex basis-[50%] justify-center'>
                    <img src={'https://res.cloudinary.com/dpplfiyki/image/upload/v1748442788/dcf5e2ea-c7b9-4e8e-bf52-f54f9f088eee_wfm2eq.jpg'} alt='Sign Image' className='w-full object-cover' />
                </div>
                <div className='flex basis-[40%] flex-col items-center justify-center gap-10'>
                    <h1 className='font-inter text-4xl font-medium'>Đăng ký</h1>
                    <p>Chào mừng bạn đến với BITIS</p>
                    <Form form={form} onFinish={onFinish} className='flex w-full flex-col' layout='vertical'>
                        <Form.Item
                            name='name'
                            label='Tên người dùng'
                            rules={[
                                { required: true, message: 'Vui lòng nhập tên người dùng!' },
                                { min: 2, message: 'Tên phải có ít nhất 2 ký tự!' },
                            ]}
                        >
                            <Input className='h-[48px]' placeholder='Nhập tên người dùng' />
                        </Form.Item>
                        <Form.Item
                            name='phone'
                            label='Số điện thoại'
                            rules={[
                                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                { pattern: /^[0-9]+$/, message: 'Số điện thoại chỉ được chứa số!' },
                            ]}
                        >
                            <Input className='h-[48px]' placeholder='Nhập số điện thoại' />
                        </Form.Item>
                        <Form.Item
                            name='email'
                            label='Email'
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không đúng định dạng!' },
                            ]}
                        >
                            <Input className='h-[48px]' placeholder='Địa chỉ email' />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='Mật khẩu'
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                            ]}
                        >
                            <Input.Password className='h-[48px]' placeholder='Mật khẩu' />
                        </Form.Item>
                        <Form.Item
                            name='confirmPassword'
                            label='Xác nhận mật khẩu'
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password className='h-[48px]' placeholder='Xác nhận lại mật khẩu' />
                        </Form.Item>
                        <Form.Item>
                            <button
                                disabled={isPending}
                                type='submit'
                                className='bg-global hover:bg-primary h-[48px] w-full cursor-pointer rounded-md font-medium text-white duration-300'
                            >
                                {isPending ? <Spin className='text-hover' /> : 'Đăng ký'}
                            </button>
                        </Form.Item>
                    </Form>

                    <p className='mx-auto text-gray-600'>
                        Bạn đã có tài khoản?
                        <Link to='/login' className='ml-2 font-medium hover:underline'>
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
