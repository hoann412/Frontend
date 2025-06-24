import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import QueryProvider from './QueryProvider';
import ReduxProvider from './ReduxProvider';
import { ToastProvider } from './ToastProvider';
import AutoScrollToTop from './AutoScrollTop';
import { ToastContainer } from 'react-toastify';

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <BrowserRouter>
                <ToastProvider>
                    <ReduxProvider>
                        <QueryProvider>
                            <AutoScrollToTop>{children}</AutoScrollToTop>
                            <ToastContainer
                                position='bottom-center'
                                autoClose={1500}
                                hideProgressBar
                                draggable
                                toastClassName={'bg-global w-auto'}
                                className={'w-auto max-w-[390px]'}
                            />
                        </QueryProvider>
                    </ReduxProvider>
                </ToastProvider>
            </BrowserRouter>
        </>
    );
}
