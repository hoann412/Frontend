import TableDisplay from '~/components/_common/TableDisplay';
import { ADMIN_ROUTES } from '~/constants/router';
import useTable from '~/hooks/_common/useTable';
import useGetCategories from '~/hooks/categories/Queries/useGetCategories';
import useHideProduct from '~/hooks/Products/Mutations/useHideProduct';
import useShowProduct from '~/hooks/Products/Mutations/useShowProduct';
import useGetProducts from '~/hooks/Products/Queries/useGetProducts';
import useGetProductsForAdmin from '~/hooks/Products/Queries/useGetProductsForAdmin';
import useGetTags from '~/hooks/Tags/Queries/useGetTags';
import WrapperPageAdmin from '~/pages/Admin/_common/WrapperPageAdmin';
import { ProductsListColumns } from '~/pages/Admin/_product_/Helper/tableList';
import { IProduct } from '~/types/ProductNew';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

const ListAll = () => {
    const { onSelectPaginateChange, query, onFilter, getColumnSearchProps, getFilteredValue } = useTable<IProduct>();

    const currentPage = Number(query.page || 1);
    const { data: allProducts } = useGetProductsForAdmin(query);
    const { mutate: mutateHideProduct } = useHideProduct();
    const { mutate: mutateShowProduct } = useShowProduct();
    const { data: categories } = useGetCategories({ limit: '100000' });
    const { data: tags } = useGetTags({ limit: '100000' });

    const tagsFilter = tags?.data.tags.map((tag) => ({
        text: tag.name,
        value: tag._id,
    }));
    const categoriesFilter =
        categories?.data.categories.map((cate) => ({
            text: cate.name,
            value: cate._id,
        })) || [];

    const columns = ProductsListColumns({
        categoriesFilter,
        tagsFilter,
        query,
        getColumnSearchProps,
        getFilteredValue,
        mutateHideProduct,
        mutateShowProduct,
    }) as ColumnsType<IProduct>;

    return (
        <WrapperPageAdmin
            title='Quản lý sản phẩm'
            option={
                <Link to={ADMIN_ROUTES.PRODUCTS_CREATE}>
                    <Button icon={<PlusOutlined />} type='primary'>
                        Thêm mới sản phẩm
                    </Button>
                </Link>
            }
        >
            <TableDisplay<IProduct>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={allProducts?.data.products}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={allProducts?.data.totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default ListAll;
