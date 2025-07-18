import { QuestionCircleOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Checkbox,
    CheckboxProps,
    Divider,
    Image,
    List,
    Row,
    Space,
    Tag,
    Tooltip,
    Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PolicyModal from '~/components/PolicyModal';
import { useToast } from '~/context/ToastProvider';
import useGetMyCart from '~/hooks/cart/Queries/useGetMyCart';
import { useCreateOrder } from '~/hooks/orders/Mutations/useCreateOrder';
import { useVnPayOrder } from '~/hooks/orders/Mutations/useVnPayOrder';
import { useVoucherUser } from '~/hooks/voucher/useGetVoucherUser';
import { setCheckOutTotalPrice } from '~/store/slice/orderSlice';
import { RootState, useTypedSelector } from '~/store/store';
import showMessage from '~/utils/ShowMessage';

const { Text, Title } = Typography;

const ProductItemsCheckout = ({ hiddenBtn = false }: { hiddenBtn?: boolean }) => {
    const navigate = useNavigate();
    const { data: cartUser, refetch } = useGetMyCart();
    const paymentMethod = useTypedSelector((state) => state.order.paymentMethod);
    const cartItems = useTypedSelector((state) => state.cartReducer.items);
    const voucher = useTypedSelector((state) => state.order.voucher);
    const [policyAgreed, setPolicyAgreed] = useState<boolean>(false);
    const createOrderVnPay = useVnPayOrder();
    const { data: voucherData } = useVoucherUser();
    const { description, receiverInfo, shippingAddress, tax, shippingFee } = useSelector(
        (state: RootState) => state.order
    );
    const userId = useTypedSelector((state) => state.auth.user?._id);
    const subTotal = cartItems?.reduce((acc: any, item: any) => acc + +item.price * item.quantity, 0) || 0;
    const discount =
        voucher?.discountType === 'percentage'
            ? Math.min(
                  subTotal * ((voucher?.voucherDiscount ?? 0) / 100),
                  voucher?.maxDiscountAmount ?? Infinity // Giới hạn tối đa
              )
            : (voucher?.voucherDiscount ?? 0);

    const calTotalPriceWithVoucher = subTotal - discount;

    const totalPrice = subTotal + shippingFee;
    const createOrder = useCreateOrder();
    const dispatch = useDispatch();
    useEffect(() => {
        const idProductCart = cartItems.map((item: any) => item.productId) || [];
        const idProductCartCheckout = cartUser?.items.map((item) => item.productId) || [];

        const hasProductHide = idProductCart.some((item) => !idProductCartCheckout.includes(item));
        if (hasProductHide) {
            refetch();
            navigate('/cart');
        }
    });
    const toast = useToast();
    const handleCheckout = () => {
        if (paymentMethod === 'COD') {
            createOrder.mutate(
                {
                    items: cartItems as [],
                    customerInfo: receiverInfo.customer,
                    receiverInfo: receiverInfo.addReceiver,
                    description: description ?? '',
                    shippingAddress: {
                        province: shippingAddress.province,
                        district: shippingAddress.district,
                        ward: shippingAddress.ward,
                        address: shippingAddress.address,
                        provinceId: shippingAddress.provinceId!,
                        districtId: shippingAddress.districtId!,
                        wardCode: shippingAddress.wardCode,
                    },
                    voucherCode: voucher?.code,
                    totalPrice,
                    tax,
                    shippingFee,
                    paymentMethod: 'cash',
                },
                {
                    onSuccess: (data) => {
                        console.log(data.data);
                        navigate(`/success/${data.data.data._id}?vnp_ResponseCode=00`);
                    },
                    onError: (error: any) => {
                        toast('error', `${error.message}`);
                    },
                }
            );
        } else if (paymentMethod === 'ONLINE') {
            createOrderVnPay.mutate(
                {
                    userId: userId,
                    items: cartItems as [],
                    customerInfo: receiverInfo.customer,
                    receiverInfo: receiverInfo.addReceiver,
                    description: description ?? '',
                    shippingAddress: {
                        province: shippingAddress.province,
                        district: shippingAddress.district,
                        ward: shippingAddress.ward,
                        address: shippingAddress.address,
                        provinceId: shippingAddress.provinceId!,
                        districtId: shippingAddress.districtId!,
                        wardCode: shippingAddress.wardCode,
                    },
                    totalPrice,
                    tax,
                    shippingFee,
                    voucherCode: voucher?.code,
                    paymentMethod: 'card',
                },
                {
                    onError: (err: any) => {
                        toast('error', `${err.message}`);
                    },
                }
            );
        } else {
            showMessage('Vui lòng chọn phương thức thanh toán', 'warning');
        }
    };

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);

    const onChange: CheckboxProps['onChange'] = (e) => {
        setPolicyAgreed(e.target.checked);
    };
    const { data } = useGetMyCart();
    useEffect(() => {
        dispatch(setCheckOutTotalPrice(subTotal));
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
    const isValidVoucher = () => {
        if (!voucherData) return false;
        const foundVoucher = voucher && voucherData.find((item) => item.code === voucher.code);
        if (!foundVoucher) return false;
        const isRemainingQuantityVoucher = foundVoucher.remainingQuantity === 0;
        if (isRemainingQuantityVoucher) return true;
        const isAmountValid = subTotal < foundVoucher.minimumOrderPrice;
        if (isAmountValid) return true;
        const isUsageValid = foundVoucher.usagePerUser === foundVoucher.usedCount;

        return isUsageValid;
    };

    return (
        <div className='flex h-full flex-col'>
            <Title level={4} className='mb-4'>
                Đơn hàng của bạn
            </Title>

            <div className='mb-4 flex-grow overflow-auto' style={{ maxHeight: '400px' }}>
                <List
                    itemLayout='horizontal'
                    dataSource={cartItems}
                    renderItem={(item: any) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Image width={60} src={item.image} preview={false} />}
                                title={<Text strong>{item.name}</Text>}
                                description={
                                    <>
                                        <Space wrap>
                                            <Tag color='blue'>Màu sắc: {item.color}</Tag>
                                            <Tag color='blue'>Kích cỡ: {item.size}</Tag>
                                        </Space>
                                        <div className='mt-2'>
                                            <Text>Đơn giá: {formatCurrency(item.price)}</Text>
                                            <Text className='ml-4'>Số lượng: {item.quantity}</Text>
                                        </div>
                                    </>
                                }
                            />
                            <div>
                                <Text strong>{formatCurrency(item.price * item.quantity)}</Text>
                            </div>
                        </List.Item>
                    )}
                />
            </div>

            <div>
                <Divider />

                <Space direction='vertical' className='w-full'>
                    {hiddenBtn ? (
                        <>
                            {voucher && (
                                <div className='flex justify-between'>
                                    <Text>Giảm giá:</Text>
                                    <Text>{formatCurrency(discount)}</Text>
                                </div>
                            )}
                            <Row justify='space-between' align='middle'>
                                <h3 className='text-2xl font-semibold'>Tạm tính:</h3>
                                <h3 className='text-2xl font-semibold text-red-500'>
                                    {voucher ? formatCurrency(calTotalPriceWithVoucher) : formatCurrency(subTotal)}
                                </h3>
                            </Row>
                        </>
                    ) : (
                        <>
                            <div className='flex justify-between'>
                                <Text>Tạm tính:</Text>
                                <Text>{formatCurrency(subTotal)}</Text>
                            </div>
                        </>
                    )}
                    {!hiddenBtn && (
                        <>
                            <div className='flex justify-between'>
                                <Text>Phí vận chuyển:</Text>
                                <Text>{formatCurrency(shippingFee)}</Text>
                            </div>
                            {voucher && (
                                <div className='flex justify-between'>
                                    <span className='flex items-center gap-3'>
                                        Giảm giá:
                                        <Tooltip
                                            title='Mã giảm giá không tính vào phí vận chuyện'
                                            className='cursor-pointer'
                                        >
                                            <span>
                                                <QuestionCircleOutlined />
                                            </span>
                                        </Tooltip>
                                    </span>
                                    <Text>{formatCurrency(discount)}</Text>
                                </div>
                            )}
                            <Row justify='space-between' align='middle'>
                                <h3 className='text-2xl font-semibold'>Tổng cộng:</h3>
                                <h3 className='text-2xl font-semibold text-red-500'>
                                    {voucher ? formatCurrency(totalPrice - discount) : formatCurrency(totalPrice)}
                                </h3>
                            </Row>
                        </>
                    )}
                    {/* 
                    <div className='mt-2'>
                        <h3 className='text-lg font-semibold'>Phương thức thanh toán</h3>
                        <div className='mt-2'>
                            <Radio.Group
                                className='flex flex-col gap-2'
                                defaultValue={paymentMethod}
                                onChange={onChangePaymentMethod}
                            >
                                <Radio value={0}>Thanh toán khi nhận hàng</Radio>
                                <Radio value={1}>Thanh toán online qua VNPay</Radio>
                            </Radio.Group>
                        </div>
                    </div> */}
                </Space>

                {!hiddenBtn && (
                    <>
                        <Checkbox onChange={onChange} defaultChecked={false} className='mt-4 cursor-default'>
                            Tôi đồng ý với <PolicyModal />
                        </Checkbox>
                        <Card className='mt-4 border-blue-200 bg-blue-50'>
                            <Tooltip
                                title={
                                    isValidVoucher()
                                        ? ''
                                        : policyAgreed
                                          ? ''
                                          : 'Bạn cần đồng ý với điều khoản và chính sách của chúng tôi để tiếp tục đặt hàng'
                                }
                                color='blue'
                            >
                                {isValidVoucher() ? (
                                    <div className='flex flex-col items-center justify-center'>
                                        <p className='mb-2 text-center text-xs text-red-500'>
                                            Voucher hiện không khả dụng
                                        </p>
                                        <button
                                            onClick={() => navigate('/payment')}
                                            className='h-12 w-full cursor-pointer rounded-md border border-red-500 text-lg font-semibold text-red-500 duration-300 hover:bg-red-500 hover:text-white'
                                            // disabled={!policyAgreed || createOrderVnPay.isSuccess}
                                        >
                                            Chọn lại voucher
                                        </button>
                                    </div>
                                ) : (
                                    <Button
                                        type='primary'
                                        loading={createOrder.isPending || createOrderVnPay.isPending}
                                        size='large'
                                        block
                                        onClick={handleCheckout}
                                        className='h-12 text-lg font-semibold'
                                        disabled={!policyAgreed || createOrderVnPay.isSuccess}
                                    >
                                        Đặt hàng
                                    </Button>
                                )}
                            </Tooltip>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductItemsCheckout;
