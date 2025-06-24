import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import { useTypedSelector } from '~/store/store';

const AuthProtected = ({ children }: { children: ReactNode }) => {
    const user = useTypedSelector((state) => state.auth.user);
    const isAuthenticate = useTypedSelector((state) => state.auth.authenticate);
    const location = useLocation();
    const isAuthPage =
        location.pathname === MAIN_ROUTES.LOGIN ||
        location.pathname === MAIN_ROUTES.REGISTER ||
        location.pathname === MAIN_ROUTES.FORGOT_PASSWORD;

    if (isAuthenticate && isAuthPage) {
        return <Navigate to={'/'} replace />;
    }
    if (!user && !isAuthPage) {
        return <Navigate to={'/'} replace />;
    }
    if (user && isAuthPage) {
        return <Navigate to={'/'} replace />;
    }
    return <>{children}</>;
};

export default AuthProtected;
