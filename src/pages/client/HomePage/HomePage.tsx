import { Link } from 'react-router-dom';
import bannerOne from '~/assets/img/banner-phụ_2m-600x320.jpg';
import bannerTwo from '~/assets/img/Frontpage_img-background-Sale-off.jpg';
import WrapperList from '~/components/_common/wrapperList/WrapperList';
import Banner from '~/components/Banner';
import CarouselDisplay, { CarouselItem } from '~/components/CarouselDisplay';
import DefaultCard from '~/components/ProductCard/DefaultCard';
import ShowMoreList from '~/components/ShowMoreList';
import useWindowSize from '~/hooks/_common/useWindowSize';
import { useGetProductBest } from '~/hooks/Products/Queries/useGetProductBest';
import { useGetProductDiscount } from '~/hooks/Products/Queries/useGetProductDiscount';
import useGetProducts from '~/hooks/Products/Queries/useGetProducts';

export default function Homepage() {
    const { data: productBest } = useGetProductBest();
    const { data: productDiscount } = useGetProductDiscount();
    const { data: allProducts, isLoading: allProductLoading } = useGetProducts({ isActive: true });

    const { windowWidth } = useWindowSize();

    return (
        <div className='flex flex-col gap-3.5'>
            <Banner />
            <div className='mt-2 py-6 pb-10'>
                <div className='max-w-screen-default mx-7'>
                    <div className=''>
                        <div className='flex justify-between gap-10'>
                            <div className='w-[50%]'>
                                <Link to='/' className='block h-[450px]'>
                                    <img src={'https://res.cloudinary.com/dpplfiyki/image/upload/v1748442864/aca3af18-08eb-4508-9a40-531f68720d2a_w4psak.jpg'} alt='' className='block h-full w-full object-cover' />
                                </Link>
                                <Link
                                    to='/'
                                    className='mt-7 block text-[1.688rem] font-bold uppercase duration-300 hover:text-orange-500'
                                >
                                    black & black
                                </Link>
                                <p className='mt-2'>
                                    Mặc dù được ứng dụng rất nhiều, nhưng sắc đen lúc nào cũng toát lên một vẻ huyền bí
                                    không nhàm chán
                                </p>
                            </div>
                            <div className='w-[50%]'>
                                <Link to='/' className='block  h-[450px]'>
                                    <img src={'https://res.cloudinary.com/dpplfiyki/image/upload/v1748442788/dcf5e2ea-c7b9-4e8e-bf52-f54f9f088eee_wfm2eq.jpg'} alt='' className='block h-full w-full object-cover' />
                                </Link>
                                <Link
                                    to='/'
                                    className='mt-7 block text-[1.688rem] font-bold uppercase duration-300 hover:text-orange-500'
                                >
                                    OUTLET SALE
                                </Link>
                                <p className='mt-2'>
                                    Danh mục những sản phẩm bán tại "giá tốt hơn" chỉ được bán kênh online - Online
                                    Only, chúng đã từng làm mưa làm gió một thời gian và hiện đang rơi vào tình trạng bể
                                    size, bể số.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <WrapperList title='Sản phẩm nổi bật'>
                <div className='max-w-screen-default mx-4 my-4'>
                    <div className='2xl:max-w-screen-default mt-4 w-full'>
                        <CarouselDisplay className='mt-4'>
                            {productBest?.map((item, index: number) => {
                                return (
                                    <CarouselItem key={index}>
                                        <DefaultCard item={item} />
                                    </CarouselItem>
                                );
                            })}
                        </CarouselDisplay>
                    </div>
                </div>
            </WrapperList>
            <WrapperList title='Sản phẩm giá tốt'>
                <div className='max-w-screen-default mx-4 my-4'>
                    <div className='2xl:max-w-screen-default mt-4 w-full'>
                        <CarouselDisplay className='mt-4'>
                            {productDiscount?.map((item, index: number) => {
                                return (
                                    <CarouselItem key={index}>
                                        <DefaultCard item={item} />
                                    </CarouselItem>
                                );
                            })}
                        </CarouselDisplay>
                    </div>
                </div>
            </WrapperList>

            <WrapperList title='Tất cả sản phẩm' className='mt-4'>
                <div className='max-w-screen-default mx-4 mt-4'>
                    <div className='2xl:max-w-screen-default mt-4 w-full'>
                        {!allProductLoading && allProducts && (
                            <ShowMoreList
                                enableButton={{
                                    enable: true,
                                    hrefClick: '/products',
                                    limit: windowWidth < 1650 ? 6 : 8,
                                }}
                                data={allProducts.data.products}
                            />
                        )}
                    </div>
                </div>
            </WrapperList>
        </div>
    );
}
