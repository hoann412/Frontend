import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Popconfirm, Radio, Row, Space, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VoucherModal from '~/components/voucherModal/VoucherModal';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useGetMyCart from '~/hooks/cart/Queries/useGetMyCart';
import { removeVoucher, setPaymentMethood } from '~/store/slice/orderSlice';
import { RootState, useTypedSelector } from '~/store/store';
import showMessage from '~/utils/ShowMessage';
import ProductItemsCheckout from './ProductItemsCheckout';

const { Title } = Typography;

const PaymentMethod = () => {
    useDocumentTitle('Thông tin giao hàng');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const paymentMethod = useTypedSelector((state) => state.order.paymentMethod);
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    const { shippingFee } = useSelector((state: RootState) => state.order);
    const onFinish = () => {
        navigate('/checkout');
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
    const handleChangePayment = (e: 'COD' | 'ONLINE') => {
        dispatch(setPaymentMethood(e));
    };
    const voucher = useTypedSelector((state) => state.order.voucher);
    const handleRemoveVoucher = () => {
        dispatch(removeVoucher());
    };
    return (
        <Card className='max-w-layout mx-auto my-8 min-h-[90vh] w-full shadow-lg'>
            <div className='mx-auto max-w-7xl'>
                <Title level={2} className='mb-6 text-center'>
                    Phương thức thanh toán
                </Title>
                <Row gutter={24}>
                    <Col xs={24} lg={12}>
                        <Space direction='vertical' className='w-full'>
                            {/* <ReceiverInfo form={form} /> */}
                            {/* <ShippingAddress /> */}
                            {/* <Form.Item label='Ghi chú đơn hàng (Tùy chọn)' name='description'>
                                <Input.TextArea rows={4} onChange={handleDescriptionChange} />
                            </Form.Item> */}
                            <h3 className='text-lg font-semibold text-[#333333] uppercase'>Phương thức vận chuyển</h3>
                            <div className='pr-24'>
                                <div className='flex cursor-pointer items-center justify-between rounded-md border border-gray-300 px-6 py-4'>
                                    <div className='flex items-center gap-2'>
                                        <Radio checked></Radio>
                                        <span className='text-sm text-[#737373]'>Giao hàng tận nơi</span>
                                    </div>
                                    {/* <span className='text-sm'>{formatCurrency(shippingFee)}</span> */}
                                </div>
                            </div>
                            <h3 className='mt-4 text-lg font-semibold text-[#333333] uppercase'>
                                Phương thức thanh toán
                            </h3>
                            <div className='pr-24'>
                                <Radio.Group className='w-full' value={paymentMethod}>
                                    <div
                                        onClick={() => handleChangePayment('COD')}
                                        className='flex cursor-pointer items-center gap-5 rounded-t-md border border-gray-300 px-6 py-4'
                                    >
                                        <Radio value={'COD'}></Radio>
                                        <div className='flex items-center gap-2'>
                                            <img
                                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Q9uFd9fU3kpQGS0-AD5O0m9J4yWocr1P0w&s'
                                                className='w-16'
                                                alt=''
                                            />
                                            <span className='text-sm text-[#737373]'>
                                                Thanh toán khi nhận hàng (COD)
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => handleChangePayment('ONLINE')}
                                        className='flex cursor-pointer items-center gap-5 rounded-b-md border-r border-b border-l border-gray-300 px-6 py-4'
                                    >
                                        <Radio value={'ONLINE'}></Radio>
                                        <div className='flex items-center gap-2'>
                                            <img
                                                src={
                                                    'https://vnpay.vn/s1/statics.vnpay.vn/2023/6/0oxhzjmxbksr1686814746087.png'
                                                }
                                                className='w-16'
                                                alt=''
                                            />
                                            <span className='text-sm text-[#737373]'>Thanh toán online VNPAY</span>
                                        </div>
                                    </div>
                                </Radio.Group>
                            </div>
                        </Space>
                        <Space direction='vertical' className='w-full'>
                            <h3 className='mt-4 text-lg font-semibold text-[#333333] uppercase'>
                                Áp dụng mã khuyến mãi
                            </h3>
                            <div className='pr-24'>
                                {voucher ? (
                                    <>
                                        <div className='flex cursor-pointer items-center justify-between rounded-md border border-gray-300 px-6 py-4'>
                                            <VoucherModal>
                                                <div className='flex items-center gap-5'>
                                                    <img
                                                        src='https://cdn-icons-png.flaticon.com/512/4649/4649082.png'
                                                        alt=''
                                                        className='w-6'
                                                    />
                                                    <span className='text-sm text-black capitalize'>
                                                        {voucher.name}
                                                    </span>
                                                </div>
                                            </VoucherModal>
                                            <Popconfirm
                                                placement='bottom'
                                                title={'Bạn có chắc không muốn sử dụng Voucher này'}
                                                description={'Giá trị đơn hàng sẽ bị thay đổi lại'}
                                                okText='Chắc chắn'
                                                onConfirm={handleRemoveVoucher}
                                                cancelText='Không'
                                            >
                                                <CloseOutlined />
                                            </Popconfirm>
                                        </div>
                                    </>
                                ) : (
                                    <VoucherModal>
                                        <div className='flex cursor-pointer items-center justify-between rounded-md border border-gray-300 px-6 py-4'>
                                            <div className='flex items-center gap-2'>
                                                <img
                                                    src='https://cdn-icons-png.flaticon.com/512/4649/4649082.png'
                                                    alt=''
                                                    className='w-6'
                                                />
                                                <span className='text-sm text-[#737373]'>Chọn mã khuyến mãi</span>
                                            </div>
                                        </div>
                                    </VoucherModal>
                                )}
                            </div>
                        </Space>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Card className='hidden h-full bg-gray-50'>
                            <Title level={4} className='mb-4'>
                                Phương thức vận chuyển
                            </Title>
                            {/* {districtId ? (
                                <DeliveryMethod districtId={districtId} />
                            ) : (
                                <Text type='secondary'>Vui lòng chọn địa chỉ giao hàng trước</Text>
                            )} */}
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
                            {/* {!districtId && <Text type='secondary'>Vui lòng chọn địa chỉ giao hàng trước</Text>} */}
                            <div className='mt-6'>
                                <Button
                                    onClick={onFinish}
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
            </div>
        </Card>
    );
};

export default PaymentMethod;
