import { queryOptions, QueryKey, UseQueryOptions } from "@tanstack/react-query";

export function createQueryOptions<TData>(
  key: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Partial<Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">>
): UseQueryOptions<TData> {
  return queryOptions({
    queryKey: key,
    queryFn,
    staleTime: 1000 * 60 * 5,
    enabled: true,
    ...options,
  });
}
