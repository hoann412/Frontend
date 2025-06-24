import { ADMIN_ROUTES } from '~/constants/router';
import AdminLayout from '~/layouts/AdminLayout';
import {
    CategoryList,
    ColorList,
    CreateCategory,
    CreateColor,
    CreateProduct,
    CreateSize,
    CreateTag,
    DashboardPage,
    FormVoucher,
    ListUser,
    ManageOrders,
    OrdersDetails,
    ProductList,
    ReviewDetailProduct,
    ReviewsList,
    SizeList,
    Suspense,
    TagList,
    UpdateCategory,
    UpdateColor,
    UpdateProduct,
    UpdateSize,
    UpdateTag,
    VoucherList,
} from './LazyRoutes';
import { Outlet } from 'react-router-dom';

export const PrivateRoutes = [
    {
        path: ADMIN_ROUTES.DASHBOARD,
        element: (
            // <ProtectedRoute>
            <AdminLayout />
            // </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense>
                        <DashboardPage />
                    </Suspense>
                ),
            },
            // @Category
            {
                path: ADMIN_ROUTES.CATEGORIES,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <CategoryList />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.CATEGORIES_CREATE,
                        element: (
                            <Suspense>
                                <CreateCategory />
                            </Suspense>
                        ),
                    },
                    {
                        path: `${ADMIN_ROUTES.CATEGORIES_EDIT}/:id`,
                        element: (
                            <Suspense>
                                <UpdateCategory />
                            </Suspense>
                        ),
                    },
                ],
            },
            // @Size
            {
                path: ADMIN_ROUTES.SIZES,
                element: (
                    <Suspense>
                        <Outlet />
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <SizeList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <SizeList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateSize />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'edit/:id',
                        element: (
                            <Suspense>
                                <UpdateSize />
                            </Suspense>
                        ),
                    },
                ],
            },
            // @Product
            {
                path: ADMIN_ROUTES.PRODUCTS,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ProductList />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.PRODUCTS_CREATE,
                        element: (
                            <Suspense>
                                <CreateProduct />
                            </Suspense>
                        ),
                    },
                    {
                        path: `${ADMIN_ROUTES.PRODUCTS_EDIT}/:id/edit`,
                        element: (
                            <Suspense>
                                <UpdateProduct />
                            </Suspense>
                        ),
                    },
                ],
            },
             // @Color
             {
                path: ADMIN_ROUTES.COLORS,
                element: (
                    <Suspense>
                        <Outlet />
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ColorList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <ColorList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateColor />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'edit/:id',
                        element: (
                            <Suspense>
                                <UpdateColor />
                            </Suspense>
                        ),
                    },
                ],
            },
             // @Tag
             {
                path: ADMIN_ROUTES.TAGS,
                element: (
                    <Suspense>
                        <Outlet />
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <TagList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <TagList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateTag />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'edit/:id',
                        element: (
                            <Suspense>
                                <UpdateTag />
                            </Suspense>
                        ),
                    },
                ],
            },
            // @order
            {
                path: ADMIN_ROUTES.ORDERS,
                element: (
                    <Suspense>
                        <ManageOrders />
                    </Suspense>
                ),
            },
            // @Order-detail
            {
                path: `${ADMIN_ROUTES.ORDERS}/:id/detail`,
                element: (
                    <Suspense>
                        <OrdersDetails />
                    </Suspense>
                ),
            },
             // @ Review
            {
                path: ADMIN_ROUTES.REVIEW,
                element: (
                    <Suspense>
                        <ReviewsList />
                    </Suspense>)

            },
             {
                path: `${ADMIN_ROUTES.REVIEW}/products/:id`,
                element: (
                    <Suspense>
                        <ReviewDetailProduct />
                    </Suspense>)

            },
            // @user
            {
                path: ADMIN_ROUTES.USERS,
                element: (
                    <Suspense>
                        <ListUser />
                    </Suspense>
                ),
            },
             // @Voucher
            { path: ADMIN_ROUTES.VOUCHER, element: <Suspense><Outlet /> </Suspense>,
                children: [
                    { index: true, element:  <Suspense><VoucherList /></Suspense>,},
                    { path: ADMIN_ROUTES.VOUCHER, element:  <Suspense><VoucherList /></Suspense>,},
                    { path: ADMIN_ROUTES.VOUCHER_CREATE, element:  <Suspense><FormVoucher /></Suspense>,},
                    { path: `${ADMIN_ROUTES.VOUCHER_EDIT}/:id`, element:  <Suspense><FormVoucher /></Suspense>,},
                ],
            },
        ],
    },
];
