import useGetAllOrders from '~/hooks/orders/Queries/useGetAllOrders';
import useTable from '~/hooks/_common/useTable';
import OrderTable from './OrderTable';
import WrapperPageAdmin from '~/pages/Admin/_common/WrapperPageAdmin';

const ManageOrder = () => {
    const { query } = useTable();
    const { data } = useGetAllOrders(query);
    const ordersList = data?.data?.orders;
    const totalDocs = data?.data?.totalDocs;

    return (
        <WrapperPageAdmin title='Quản lý đơn hàng'>
            <OrderTable ordersList={ordersList} totalDocs={totalDocs} />
        </WrapperPageAdmin>
    );
};
export default ManageOrder;
