import { Button, Card, Col, Form, Input, Row, Space, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useGetMyCart from '~/hooks/cart/Queries/useGetMyCart';
import DeliveryMethod from '~/pages/client/Checkout/DeliveryMethod';
import ReceiverInfo from '~/pages/client/Checkout/ReceiverInfo';
import ShippingAddress from '~/pages/client/Checkout/ShippingAdress';
import { setDescription, setReceiver } from '~/store/slice/orderSlice';
import { useTypedSelector } from '~/store/store';
import showMessage from '~/utils/ShowMessage';
import ProductItemsCheckout from './ProductItemsCheckout';

const { Title, Text } = Typography;

const Shipping: React.FC = () => {
    useDocumentTitle('Thông tin giao hàng');

    const [form] = Form.useForm();
    const districtId = Form.useWatch('districtId', form);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setDescription({ description: e.target.value }));
    };

    const onFinish = (values: any) => {
        console.log(values);
        dispatch(
            setReceiver({
                customer: {
                    name: values.customerName,
                    email: values.customerEmail,
                    phone: values.customerPhone,
                },
                receiver: {
                    name: values.receiverName || values.customerName,
                    email: values.receiverEmail || values.customerEmail,
                    phone: values.receiverPhone || values.customerPhone,
                },
            })
        );

        navigate('/payment');
    };
    const cartItems = useTypedSelector((state) => state.cartReducer.items);
    const { data } = useGetMyCart();
    useEffect(() => {
        if (data && cartItems) {
            const isAnyItemRemoved = cartItems.some(
                (item) => !data.items.some((cartDataItem) => cartDataItem._id === item._id)
            );
            if (isAnyItemRemoved) {
                navigate('/');
                showMessage('Có sự thay đổi về sản phẩm vui lòng kiểm tra lại giỏ hàng', 'info', 3000);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    return (
        <Card className='max-w-layout mx-auto my-8 w-full shadow-lg'>
            <div className='mx-auto max-w-7xl'>
                <Title level={2} className='mb-6 text-center'>
                    Thông tin giao hàng
                </Title>
                <Form layout='vertical' form={form} onFinish={onFinish} className='space-y-8'>
                    <Row gutter={24}>
                        <Col xs={24} lg={12}>
                            <Space direction='vertical' className='w-full'>
                                <ReceiverInfo form={form} />
                                <ShippingAddress />
                                <Form.Item label='Ghi chú đơn hàng (Tùy chọn)' name='description'>
                                    <Input.TextArea rows={4} onChange={handleDescriptionChange} />
                                </Form.Item>
                            </Space>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card className='hidden h-full bg-gray-50'>
                                <Title level={4} className='mb-4'>
                                    Phương thức vận chuyển
                                </Title>
                                {districtId ? (
                                    <DeliveryMethod districtId={districtId} />
                                ) : (
                                    <Text type='secondary'>Vui lòng chọn địa chỉ giao hàng trước</Text>
                                )}
                                <Form.Item>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        size='large'
                                        block
                                        className='h-12 text-lg font-semibold'
                                    >
                                        Tiếp tục thanh toán
                                    </Button>
                                </Form.Item>
                            </Card>
                            <Card className='h-full bg-gray-50'>
                                <ProductItemsCheckout hiddenBtn />
                                {!districtId && <Text type='secondary'>Vui lòng chọn địa chỉ giao hàng trước</Text>}
                                <div className='mt-6'>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        size='large'
                                        block
                                        className='h-12 text-lg font-semibold'
                                    >
                                        Tiếp tục thanh toán
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Card>
    );
};

export default Shipping;
