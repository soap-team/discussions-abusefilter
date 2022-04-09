import type { Filter, FilterMetadata } from '@shared/filters';

export interface BackendInterface {
  getFilters: <T = any>() => Promise<T> | FilterMetadata[],
  getFilter: <T = any>(filterId: string) => Promise<T> | { filterDetails: Filter | undefined, filterMetadata: FilterMetadata | undefined },
  createFilter: (filter: Filter, filterMetadata: FilterMetadata) => void,
  updateFilter: (filterId: string, filter: Filter, filterMetadata: FilterMetadata) => void,
  deleteFilter: (filterId: string) => void,
}
