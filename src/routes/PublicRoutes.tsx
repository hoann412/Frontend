import MainLayout from '~/layouts/MainLayout/MainLayout';
import {
    CartDetailPage,
    CheckoutPage,
    ForgotPasswordPage,
    HomaPage,
    LoginPage,
    MyOrderDetailsPage,
    MyOrdersPage,
    OrderErrorPage,
    OrderSuccessPage,
    PaymentMethodPage,
    ProductsDetailPage,
    ProductsPage,
    ProfilePage,
    RegisterPage,
    ShippingPage,
    Suspense,
    VerifyAccountPage,
    WishlistPage,
} from './LazyRoutes';
import { MAIN_ROUTES } from '~/constants/router';
import AuthProtected from '~/layouts/Protected/AuthProtected';
import { Navigate } from 'react-router-dom';
import NotFound from '~/pages/NotFound';
import AccountLayout from '~/layouts/AccountLayout';

const PublicRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: (
                    <Suspense>
                        <HomaPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.VERIFY,
                element: (
                    <Suspense>
                        <VerifyAccountPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.FORGOT_PASSWORD,
                element: (
                    <Suspense>
                        <ForgotPasswordPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.REGISTER,
                element: (
                    <Suspense>
                        <AuthProtected>
                            <RegisterPage />
                        </AuthProtected>
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.LOGIN,
                element: (
                    <Suspense>
                        <AuthProtected>
                            <LoginPage />
                        </AuthProtected>
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.PRODUCTS,
                element: (
                    <Suspense>
                        <ProductsPage />
                    </Suspense>
                ),
            },
            {
                path: `${MAIN_ROUTES.PRODUCTS}/:id`,
                element: (
                    <Suspense>
                        <ProductsDetailPage />
                    </Suspense>
                ),
            },
            // @Wishlist
            {
                path: MAIN_ROUTES.WISH_LIST,
                element: (
                    <Suspense>
                        <AuthProtected>
                            <WishlistPage />
                        </AuthProtected>
                    </Suspense>
                ),
            },
            // @Account
            {
                element: (
                    <Suspense>
                        <AuthProtected>
                            <AccountLayout />
                        </AuthProtected>
                    </Suspense>
                ),
                children: [
                    {
                        path: `${MAIN_ROUTES.PROFILE}`,
                        element: <ProfilePage />,
                    },
                    {
                        path: `${MAIN_ROUTES.MY_ORDERS}`,
                        element: <MyOrdersPage />,
                    },
                    {
                        path: `${MAIN_ROUTES.MY_ORDERS_DETAIL}`,
                        element: <MyOrderDetailsPage />,
                    },
                ],
            },
            // @CheckOut
            {
                path: MAIN_ROUTES.CART,
                element: (
                    <Suspense>
                        <AuthProtected>
                            <CartDetailPage />
                        </AuthProtected>
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.SHIPPING,
                element: (
                    <Suspense>
                        <ShippingPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.PAYMENT,
                element: (
                    <Suspense>
                        <PaymentMethodPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.CHECKOUT,
                element: (
                    <Suspense>
                        <CheckoutPage />
                    </Suspense>
                ),
            },
        ],
    },
    {
            path: `${MAIN_ROUTES.SUCCESS_ORDER}/:id`,
            element: (
                <Suspense>
                    <OrderSuccessPage />
                </Suspense>
            ),
    },
    {
            path: MAIN_ROUTES.ERROR_ORDER,
            element: (
                <Suspense>
                    <OrderErrorPage />
                </Suspense>
            ),
    },
    { path: '/404', element: <NotFound /> },
    { path: '*', element: <Navigate to={'/404'} /> },
];

export default PublicRoutes;
