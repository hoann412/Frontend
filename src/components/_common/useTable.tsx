import { useState, useCallback } from 'react';
import type { ColumnType } from 'antd/es/table';
import qs from 'query-string';

interface QueryParams {
  page?: string;
  [key: string]: any;
}

interface UseTableResult<T> {
  query: QueryParams;
  getColumnSearchProps: (dataIndex: keyof T) => ColumnType<T>;
  getFilteredValue: (key: keyof T) => string[] | undefined;
  getSortedInfo: (key: keyof T) => 'ascend' | 'descend' | undefined;
  onFilter: (filters: Record<string, any>) => void;
  onSelectPaginateChange: (page: number, pageSize?: number) => void;
}

export default function useTable<T>(): UseTableResult<T> {
  // Parse URL query string
  const [query, setQuery] = useState<QueryParams>(() => {
    const parsed = qs.parse(window.location.search);
    return parsed;
  });

  const updateQuery = useCallback(
    (newParams: QueryParams) => {
      const merged = { ...query, ...newParams };
      const str = qs.stringify(merged);
      window.history.replaceState(null, '', `?${str}`);
      setQuery(merged);
    },
    [query]
  );

  const getColumnSearchProps = useCallback(
    (dataIndex: keyof T): ColumnType<T> => ({
      // stub: add your search UI
      filterDropdown: undefined,
      filterIcon: undefined,
      onFilter: undefined,
    }),
    []
  );

  const getFilteredValue = useCallback(
    (key: keyof T): string[] | undefined => {
      const val = query[String(key)];
      return Array.isArray(val) ? val : val ? [String(val)] : undefined;
    },
    [query]
  );

  const getSortedInfo = useCallback(
    (key: keyof T): 'ascend' | 'descend' | undefined => {
      const order = query[`${String(key)}Order`];
      if (order === 'ascend' || order === 'descend') return order;
      return undefined;
    },
    [query]
  );

  const onFilter = useCallback(
    (filters: Record<string, any>) => {
      updateQuery(filters);
    },
    [updateQuery]
  );

  const onSelectPaginateChange = useCallback(
    (page: number, pageSize?: number) => {
      updateQuery({ page: String(page) });
    },
    [updateQuery]
  );

  return {
    query,
    getColumnSearchProps,
    getFilteredValue,
    getSortedInfo,
    onFilter,
    onSelectPaginateChange,
  };
}
