import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTypedSelector } from '~/store/store';

const AutoScrollToTop = ({ children }: { children: React.ReactNode }) => {
    const path = useLocation();
    const autoScroll = useTypedSelector((state) => state.autoScrollSlice);
    useEffect(() => {
        if (autoScroll.scroll === 'manual') {
            console.log(autoScroll.location);
            window.scrollTo({ top: autoScroll.location, left: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [path, autoScroll]);
    return <>{children}</>;
};

export default AutoScrollToTop;
