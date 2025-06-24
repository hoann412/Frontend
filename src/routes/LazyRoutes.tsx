import React, { lazy } from 'react';

// Client
export const HomaPage = lazy(()=>import("~/pages/client/HomePage"));


// Auth
export const RegisterPage = lazy(()=>import("~/pages/client/Auth/Register"));
export const LoginPage = lazy(()=>import("~/pages/client/Auth/Login"));
export const VerifyAccountPage = lazy(()=>import("~/pages/client/Auth/Email"));
export const ForgotPasswordPage = lazy(()=>import("~/pages/client/Auth/ForgotPassword"));

// Products and Cart
export const ProductsPage = lazy(()=>import("~/pages/client/ProductPage/ProductPage"));
export const ProductsDetailPage = lazy(()=>import("~/pages/client/ProductDetailsPage/Productdetails"));
export const CartDetailPage = lazy(()=>import("~/pages/client/CartDetail/CartDetail"));

// Checkout
export const ShippingPage = lazy(() => import('~/pages/client/Checkout/Shipping'));
export const PaymentMethodPage = lazy(() => import('~/pages/client/Checkout/PaymentMethod'));
export const CheckoutPage = lazy(() => import('~/pages/client/Checkout/CheckOut'));
export const OrderSuccessPage = lazy(() => import('~/pages/client/Checkout/OrderSuccess'));
export const OrderErrorPage = lazy(() => import('~/pages/client/Checkout/OrderError'));

// @ Account
export const ProfilePage = lazy(() => import('~/pages/client/Account/Profile'));
export const MyOrdersPage = lazy(
    () => import('~/pages/client/Account/MyOrders'),
);
export const MyOrderDetailsPage = lazy(
    () => import('~/pages/client/Account/MyOrders/OrderDetail/OrderDetailPage'),
);
export const WishlistPage = lazy(() => import('~/pages/client/WishList'));

// Admin
export const DashboardPage = lazy(() => import('~/pages/Admin/_dashboard_'));
// @Size
export const SizeList = lazy(() => import('~/pages/Admin/_size_/'));
export const CreateSize = lazy(() => import('~/pages/Admin/_size_/CreateSize'));
export const UpdateSize = lazy(() => import('~/pages/Admin/_size_/UpdateSize'));

// Category
export const CategoryList = lazy(() => import('~/pages/Admin/_category_'));
export const CreateCategory = lazy(() => import('~/pages/Admin/_category_/CreateCategory'));
export const UpdateCategory = lazy(() => import('~/pages/Admin/_category_/UpdateCategory'));

// Product
export const ProductList = lazy(() => import('~/pages/Admin/_product_'));
export const CreateProduct = lazy(() => import('~/pages/Admin/_product_/CreateProduct'));
export const UpdateProduct = lazy(() => import('~/pages/Admin/_product_/UpdateProduct'));

// Color
export const ColorList = lazy(() => import('~/pages/Admin/_color_'));
export const CreateColor = lazy(() => import('~/pages/Admin/_color_/CreateColor'));
export const UpdateColor = lazy(() => import('~/pages/Admin/_color_/UpdateColor'));

// Tag
export const TagList = lazy(() => import('~/pages/Admin/_tag_/'));
export const CreateTag = lazy(() => import('~/pages/Admin/_tag_/CreateTag'));
export const UpdateTag = lazy(() => import('~/pages/Admin/_tag_/UpdateTag'));

// Order admin
export const ManageOrders = lazy(() => import('~/pages/Admin/_order_/ManageOrder'));
export const OrdersDetails = lazy(() => import('~/pages/Admin/_order_/OrderDetails'));
export const ReviewsList = lazy(() => import('~/pages/Admin/_review_/ReviewList'));
export const ReviewDetailProduct = lazy(()=> import('~/pages/Admin/_review_/ReviewDetaillProduct'));
// Manage User
export const ListUser = lazy(() => import('~/pages/Admin/_user_/ManageUsers'));

// Vouvher
export const VoucherList = lazy(() => import('~/pages/Admin/voucher/List'));
export const FormVoucher = lazy(() => import('~/pages/Admin/voucher/FormVoucher'));

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<div>loading...</div>}>{children}</React.Suspense>;
};
