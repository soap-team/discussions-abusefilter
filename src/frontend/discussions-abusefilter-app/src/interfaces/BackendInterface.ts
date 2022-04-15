import type { Filter, FilterMetadata } from '@shared/filters';

export type Error = {
  error: {
    message: string
  }
};

export const interfaceMode = 'local';

export interface BackendInterface {
  getFilters: () => Promise<FilterMetadata[]>,
  getFilter: (filterId: string) => Promise<{ filterDetails: Filter, filterMetadata: FilterMetadata }> | Error,
  createFilter: (filter: Filter, filterMetadata: FilterMetadata) => void,
  updateFilter: (filter: Filter, filterMetadata: FilterMetadata) => void,
  archiveFilter: (filterId: string) => void,
  enableFilter: (filterId: string) => void,
  disableFilter: (filterId: string) => void,
}
