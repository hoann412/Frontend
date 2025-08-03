import FilterSidebar from '~/components/FilterSidebar/FilterSidebar';
import ProductCard from '~/components/ProductCard/ProductCard';
import useFilter from '~/hooks/common/useFilter';
import useGetProducts from '~/hooks/Products/Queries/useGetProducts';
import { DownOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Dropdown, Empty, Pagination, RadioChangeEvent, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import banner from '~/assets/img/Desktop_Homepage_Banner01.jpg';
import { CiGrid2H, CiGrid41 } from 'react-icons/ci';
import useWindowSize from '~/hooks/_common/useWindowSize';
import { useEffect } from 'react';
import clsx from 'clsx';
import SortPopupComponent from '~/components/SortPopup/SortPopup';

const ProductPage = () => {
    const limit = 10;
    const { query, updateQueryParam, reset, grid, updateGridUI } = useFilter();
    const { windowWidth } = useWindowSize();
    const queryKeys = Object.keys(query);
    let isResetFilter = false;
    const { data: productResponse, isLoading: isProductLoading } = useGetProducts({ ...query, isActive: true });
    const products = productResponse?.data.products;
    const totalProducts = products?.length;
    const totalDocs = productResponse?.data.totalDocs;

    // check if query key is have one
    if (
        (queryKeys.length === 1 && queryKeys.includes('category')) ||
        (queryKeys.length === 2 && queryKeys.includes('category') && queryKeys.includes('page'))
    ) {
        isResetFilter = false;
    } else if (queryKeys.length > 0) {
        isResetFilter = true;
    }

    const onChange = (e: RadioChangeEvent) => {
        updateQueryParam({ ...query, ['sort']: e.target.value });
    };

    const handleReset = () => {
        reset();
    };

    const onPageChange = (page: number) => {
        updateQueryParam({
            ...query,
            page: page.toString(),
            limit: String(limit),
        });
    };

    useEffect(() => {
        if (grid !== '') {
            updateGridUI('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth]);


    return (
        <div className='2xl:max-w-screen-default mx-4 w-full default:mx-auto'>
            <div className='flex gap-4'>
                <div className='mt-6 basis-1/4'>
                    <FilterSidebar />
                </div>
                <div className='mt-4 flex-1 px-2'>
                    <div className='breadcrumb'>
                        <Breadcrumb
                            className='py-4 text-base'
                            separator='>'
                            items={[
                                {
                                    title: <Link to={'/'}>Trang chủ</Link>,
                                },
                                {
                                    title: <Link to='/products'>Sản phẩm</Link>,
                                },
                            ]}
                        />
                    </div>
                    <div className='my-4 h-[400px]'>
                        <img src={'https://theme.hstatic.net/200000580329/1000937158/14/collection_banner.jpg?v=96'} alt='products banner' className='h-full w-full object-cover' />
                    </div>
                    <div className='border-opacity-5 my-5 flex justify-between border-b border-black/10 pb-4'>
                        <div className='flex items-center gap-1'>
                            <span className='font-medium'>{totalProducts}</span>
                            <span className='font-normal'>sản phẩm</span>
                        </div>
                        <div className='flex gap-3'>
                            <div className='flex items-center gap-3'>
                                <Dropdown
                                    placement='bottomLeft'
                                    trigger={['click']}
                                    dropdownRender={() => (
                                        <SortPopupComponent value={query?.sort} onChange={onChange} />
                                    )}
                                >
                                    <div className='flex cursor-pointer items-center gap-2'>
                                        <UnorderedListOutlined style={{ fontSize: 20 }} />
                                        <span className='font-medium'>Sắp xếp theo</span>
                                        <DownOutlined />
                                    </div>
                                </Dropdown>
                            </div>
                            {windowWidth > 1000 && (
                                <div className='flex items-center gap-2'>
                                    <CiGrid2H
                                        size={24}
                                        className='cursor-pointer'
                                        onClick={() => {
                                            updateGridUI('2');
                                        }}
                                    />
                                    <CiGrid41
                                        size={24}
                                        className='cursor-pointer'
                                        onClick={() => {
                                            updateGridUI('5');
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {isResetFilter && (
                        <Button htmlType='button' type='default' onClick={handleReset} className='mt-4'>
                            Đặt lại
                        </Button>
                    )}
                    <div className='my-4'>
                        <div
                            className={clsx('grid gap-4', {
                                'grid-cols-2': grid === '2',
                                'grid-cols-5': grid === '5',
                                'grid-cols-2 md:grid-cols-3 lg:grid-cols-4': !grid,
                            })}
                        >
                            {products?.map((item) => <ProductCard item={item} key={item._id} />)}
                        </div>

                        {products && products?.length === 0 && <Empty />}
                        {isProductLoading && <Skeleton />}
                        {products && products?.length > 0 && (
                            <div className='mt-10'>
                                <Pagination
                                    className='item-center flex justify-center'
                                    current={Number(query.page) || 1}
                                    pageSize={limit}
                                    total={totalDocs}
                                    onChange={onPageChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
