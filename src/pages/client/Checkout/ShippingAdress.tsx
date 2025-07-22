import { useGetProvince } from '~/hooks/shipping/useGetProvince';
import { setShippingAddress } from '~/store/slice/orderSlice';
import { RootState } from '~/store/store';
import { Form, Input, Select, Space, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WardSelectList from './WardSelectList';
import DistrictSelectList from './DistrictSelectList';

const ShippingAddress = () => {
    const form = Form.useFormInstance();
    const { data: provinceList } = useGetProvince();
    const dispatch = useDispatch();
    const { shippingAddress, description, receiverInfo } = useSelector((state: RootState) => state.order);

    const handleSelectProvinceChange = (value: string, option: any) => {
        dispatch(setShippingAddress({ provinceId: +value, province: option.label }));
        dispatch(setShippingAddress({ district: '', districtId: null, ward: '', wardCode: '' }));
        form.setFieldsValue({
            districtId: null,
            wardCode: '',
            ward: '',
            district: '',
        });
    };

    const handleAddressChange = () => {
        dispatch(setShippingAddress({ address: form.getFieldValue('address') }));
    };

    useEffect(() => {
        form.setFieldsValue({
            country: 'vn',
            ...shippingAddress,
            description,
            ...receiverInfo,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Space direction='vertical' className='border-gray mt-5 w-full rounded-lg border p-3'>
            <Typography.Text className='text-[1.2rem] font-semibold'>Địa chỉ giao hàng</Typography.Text>

            <Form.Item label='Quốc gia' name='country' rules={[{ required: true }]}>
                <Select options={[{ value: 'vn', label: 'Viet Nam' }]} />
            </Form.Item>

            <Form.Item label='Tỉnh/Thành phố' name='provinceId' rules={[{ required: true, message: <></> }]}>
                <Select options={provinceList} allowClear onChange={handleSelectProvinceChange} />
            </Form.Item>

            <Form.Item
                label='Quận/Huyện'
                rules={[{ required: true, message: <></> }]}
                shouldUpdate={(prevValues: { provinceId: number }, currentValues: { provinceId: number }) =>
                    prevValues.provinceId !== currentValues.provinceId
                }
            >
                {({ getFieldValue }) => {
                    const provinceId = getFieldValue('provinceId');

                    if (provinceId) {
                        return <DistrictSelectList provinceId={provinceId} />;
                    }
                    return (
                        <Form.Item name='districtId' rules={[{ required: true, message: <></> }]}>
                            <Select options={[]} disabled />
                        </Form.Item>
                    );
                }}
            </Form.Item>

            <Form.Item
                label='Phường/Xã'
                rules={[{ required: true, message: <></> }]}
                shouldUpdate={(prevValues: { districtId: number }, currentValues: { districtId: number }) =>
                    prevValues.districtId !== currentValues.districtId
                }
            >
                {({ getFieldValue }) => {
                    const districtId = getFieldValue('districtId');

                    if (districtId) {
                        return <WardSelectList districtId={districtId} />;
                    }
                    return (
                        <Form.Item name='wardCode' rules={[{ required: true, message: <></> }]}>
                            <Select options={[]} disabled />
                        </Form.Item>
                    );
                }}
            </Form.Item>
            <Form.Item label='Địa chỉ chi tiết' name='address' rules={[{ required: true, message: <></> }]}>
                <Input onChange={handleAddressChange} />
            </Form.Item>
        </Space>
    );
};

export default ShippingAddress;
