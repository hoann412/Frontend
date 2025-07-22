import React from 'react';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Form, Input, Switch, Card, Typography, Divider } from 'antd';
import { FormInstance } from 'antd/lib/form';
import useGetProfile from '~/hooks/profile/Queries/useGetProfile';

const { Title, Text } = Typography;

interface ReceiverInfoProps {
    form: FormInstance;
}

const ReceiverInfo: React.FC<ReceiverInfoProps> = ({ form }) => {
    const [showReceiverInfo, setShowReceiverInfo] = React.useState(false);
    const toggleReceiverInfo = (checked: boolean) => {
        setShowReceiverInfo(checked);
    };
    const { data: customer } = useGetProfile();

    console.log(customer);
    React.useEffect(() => {
        if (customer) {
            form.setFieldsValue({
                customerName: customer.data.name,
                customerEmail: customer.data.email,
                customerPhone: customer.data.phone,
            });
        }
    }, [customer, form]);
    return (
        <Card className='w-full shadow-md transition-shadow duration-300 hover:shadow-lg'>
            <Title level={4} className='mb-6'>
                Thông tin khách hàng
            </Title>
            <Form.Item
                name='customerName'
                label='Tên khách hàng'
                rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
            >
                <Input prefix={<UserOutlined className='text-gray-400' />} />
            </Form.Item>
            <Form.Item
                name='customerEmail'
                label='Email'
                rules={[
                    { required: true, message: 'Vui lòng nhập email' },
                    { type: 'email', message: 'Email không hợp lệ' },
                ]}
            >
                <Input prefix={<MailOutlined className='text-gray-400' />} />
            </Form.Item>
            <Form.Item
                name='customerPhone'
                label='Số điện thoại'
                rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại' },
                    {
                        pattern: /^[0-9]{10}$/,
                        message: 'Số điện thoại không hợp lệ',
                    },
                ]}
            >
                <Input prefix={<PhoneOutlined className='text-gray-400' />} />
            </Form.Item>

            <Divider />

            <div className='mb-4 flex items-center justify-between'>
                <Text strong>Giao đến người nhận khác</Text>
                <Switch onChange={toggleReceiverInfo} checked={showReceiverInfo} />
            </div>

            {showReceiverInfo && (
                <>
                    <Form.Item
                        name='receiverName'
                        label='Tên người nhận'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên người nhận',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className='text-gray-400' />} />
                    </Form.Item>
                    <Form.Item
                        name='receiverEmail'
                        label='Email người nhận'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email người nhận',
                            },
                            { type: 'email', message: 'Email không hợp lệ' },
                        ]}
                    >
                        <Input prefix={<MailOutlined className='text-gray-400' />} />
                    </Form.Item>
                    <Form.Item
                        name='receiverPhone'
                        label='Số điện thoại người nhận'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại người nhận',
                            },
                            {
                                pattern: /^[0-9]{10}$/,
                                message: 'Số điện thoại không hợp lệ',
                            },
                        ]}
                    >
                        <Input prefix={<PhoneOutlined className='text-gray-400' />} />
                    </Form.Item>
                </>
            )}
        </Card>
    );
};

export default ReceiverInfo;
