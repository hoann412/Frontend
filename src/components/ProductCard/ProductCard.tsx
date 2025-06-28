import React, { memo } from 'react';
import { HeartFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface ProductVariant {
  image: string;
}

interface ProductItem {
  _id: string;
  name: string;
  price: number;
  discount: number;
  variants: ProductVariant[];
}

interface ProductCardProps {
  item: ProductItem;
}

// Stub DrawerAddCart component for UI only
interface DrawerAddCartProps {
  item: ProductItem;
  classNameBtn: string;
  children: React.ReactNode;
}
const DrawerAddCart: React.FC<DrawerAddCartProps> = ({ item, classNameBtn, children }) => (
  <button className={classNameBtn}>{children}</button>
);

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const originalPrice = item.discount
    ? item.price / (1 - item.discount / 100)
    : item.price;

  return (
    <div className="group w-full cursor-pointer">
      <div className="relative">
        <Link to={`/products/${item._id}`}>  {/* Navigate to product detail */}
          <img
            className="max-h-[320px] min-h-[320px] w-full object-cover"
            src={item.variants[0]?.image}
            alt={item.name}
          />
        </Link>

        <div className="absolute bottom-0 flex w-full items-center justify-between px-2 py-1 opacity-0 duration-300 group-hover:opacity-100">
          <DrawerAddCart
            item={item}
            classNameBtn="text-global hover:bg-hover px-10 duration-300 hover:text-white bg-white shadow-md flex justify-center w-full h-[32px] items-center rounded-md text-sm font-medium"
          >
            Thêm vào giỏ hàng
          </DrawerAddCart>

          <button
            onClick={() => { /* Add to wishlist */ }}
            className="hover:bg-opacity-80 cursor-pointer rounded-lg bg-black px-4 py-1 text-white duration-300 hover:text-red-500"
          >
            <HeartFilled />
          </button>
        </div>
      </div>

      <Link to={`/products/${item._id}`} className="text-primary text-sm">
        <h3 className="group-hover:text-primary mt-4 w-[90%] overflow-hidden font-semibold text-ellipsis whitespace-nowrap">
          {item.name}
        </h3>

        <div className="flex items-center gap-2">
          <p className="font-semibold">{item.price.toLocaleString()}</p>
          {item.discount !== 0 && (
            <div className="flex items-center gap-2">
              <span className="line-through">{originalPrice.toLocaleString()}</span>
              <span className="text-hover font-semibold">{item.discount}%</span>
            </div>
          )}
        </div>

        {item.discount !== 0 ? (
          <div className="mt-2">
            <span className="text-primary rounded-sm border-[1px] px-2 py-0.5 text-xs">
              Giá độc quyền Online
            </span>
          </div>
        ) : (
          <div className="mt-2">
            <span className="text-primary rounded-sm border-[1px] px-2 py-0.5 text-xs">
              Hàng chính Hãng
            </span>
          </div>
        )}
      </Link>
    </div>
  );
};

export default memo(ProductCard);
