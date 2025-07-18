import { QUERY_KEY } from '~/constants/queryKey';
import { useGetWard } from '~/hooks/shipping/useGetWard';
import { setShippingAddress } from '~/store/slice/orderSlice';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const WardSelectList = ({ districtId }: { districtId: number }) => {
    const { data: wardList } = useGetWard(districtId);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const handleSelectChange = (value: string, option: any) => {
        dispatch(setShippingAddress({ wardCode: value, ward: option.label }));
    };

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.GET_WARD, districtId],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [districtId]);

    return (
        <Form.Item name='wardCode' rules={[{ required: true, message: <></> }]}>
            <Select options={wardList} allowClear onChange={handleSelectChange} />
        </Form.Item>
    );
};

export default WardSelectList;
