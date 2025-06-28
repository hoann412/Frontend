import SignImg from '~/assets/img/male-shoes.jpg';
import { MAIN_ROUTES } from '~/constants/router';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import { useAuthLogin } from '~/hooks/Auth/Mutation/useAuthLogin';
import { Form, Input, Spin } from 'antd';
import { Link } from 'react-router-dom';

const Login = () => {
    useDocumentTitle('BITIS - Đăng nhập');
    const [form] = Form.useForm();
    const { mutate, isPending } = useAuthLogin();

    const onFinish = (values: { email: string; password: string }) => {
        mutate(values);
    };

    return (
        <div className='md:max-w-standard mx-auto mt-12 w-full xl:max-w-7xl'>
            <div className='flex justify-between'>
                <div className='flex basis-[50%] justify-center'>
                    <img src={'https://res.cloudinary.com/dpplfiyki/image/upload/v1748442788/dcf5e2ea-c7b9-4e8e-bf52-f54f9f088eee_wfm2eq.jpg'} alt='Sign Image' className='w-full object-cover' />
                </div>
                <div className='flex basis-[40%] flex-col items-center justify-center gap-10'>
                    <h1 className='font-inter text-4xl font-medium'>Đăng nhập</h1>
                    <p>Chào mừng bạn đến với BITIS</p>
                    <Form form={form} onFinish={onFinish} layout='vertical' className='flex w-full flex-col'>
                        <Form.Item
                            name='email'
                            label='Email'
                            rules={[
                                { required: true, message: 'Vui lòng nhập email' },
                                { type: 'email', message: 'Vui lòng nhập email hợp lệ' },
                            ]}
                        >
                            <Input className='h-[48px]' placeholder='Địa chỉ email' />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='Mật khẩu'
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                            ]}
                        >
                            <Input.Password className='h-[48px]' placeholder='Mật khẩu' />
                        </Form.Item>

                        <Form.Item>
                            <button
                                disabled={isPending}
                                type='submit'
                                className='bg-global hover:bg-primary mt-4 h-[48px] w-full cursor-pointer rounded-md font-medium text-white duration-300'
                            >
                                {isPending ? <Spin className='text-white' /> : 'Đăng nhập'}
                            </button>
                        </Form.Item>
                        <div className='text-center'>
                            <Link
                                to={MAIN_ROUTES.FORGOT_PASSWORD}
                                className='text-global hover:text-primary duration-300'
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
