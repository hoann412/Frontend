import { useTypedSelector } from '~/store/store';
import { ISize } from '~/types/Size';
import { memo } from 'react';

type SizeVariantItemProps = {
    item: ISize;
    updateQueryParam: (id: string) => void;
};

const SizeVariantItem = ({ item, updateQueryParam }: SizeVariantItemProps) => {
    const query = useTypedSelector((state) => state.filter.query);
    const queryValue = query['variants.size-arr']?.split(',') || [];

    return (
        <button
            onClick={() => updateQueryParam(item._id)}
            className={`text-opacity-90 block h-10 w-10 cursor-pointer text-sm text-[#777777] transition-colors duration-700 ${queryValue.includes(item._id) ? 'border-[#333333]' : 'border-[#d3d3d3] hover:border-[#333333]'} rounded-sm border-[1.5px]`}
        >
            {item.name}
        </button>
    );
};

export default memo(SizeVariantItem);
