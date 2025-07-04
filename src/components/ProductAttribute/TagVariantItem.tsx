import { memo } from 'react';
import { useTypedSelector } from '~/store/store';
import { ITag } from '~/types/Tag';

type ITagVariantItemProps = {
    updateQueryParam: (id: string) => void;
    item: ITag;
};

const TagVariantItem = ({ item, updateQueryParam }: ITagVariantItemProps) => {
    const query = useTypedSelector((state) => state.filter.query);
    const queryValue = query['tags']?.split(',') || [];
    return (
        <button
            onClick={() => updateQueryParam(item._id)}
            className={`text-opacity-90 block h-10 w-full min-w-20 cursor-pointer text-sm text-[#777777] transition-colors duration-700 ${queryValue.includes(item._id) ? 'border-[#333333]' : 'border-[#d3d3d3] hover:border-[#333333]'} rounded-sm border-[1.5px]`}
        >
            {item.name}
        </button>
    );
};

export default memo(TagVariantItem);
