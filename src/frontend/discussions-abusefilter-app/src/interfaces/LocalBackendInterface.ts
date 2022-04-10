import type { Filter, FilterMetadata } from '@shared/filters';
import type { BackendInterface, Error } from './BackendInterface';

export class LocalBackendInterface implements BackendInterface {
  filters: Record<string, Filter>;
  filtersMetadata: Record<string, FilterMetadata>;
  archivedFilters: string[];
  private static instance: LocalBackendInterface;

  private constructor() {
    this.filters = {};
    this.filtersMetadata = {};
    this.archivedFilters = [];
  }

  getFilters(): Promise<FilterMetadata[]> {
    return Promise.resolve(Object.values(this.filtersMetadata));
  }

  getFilter(filterId: string): Promise<{ filterDetails: Filter, filterMetadata: FilterMetadata }> | Error {
    return new Promise<{ filterDetails: Filter, filterMetadata: FilterMetadata}>((resolve, reject) => {
      if (this.filters[filterId] != null && this.filtersMetadata[filterId] != null) {
        resolve({ filterDetails: this.filters[filterId], filterMetadata: this.filtersMetadata[filterId] });
      } else {
        reject({
          error: {
            message: 'Filter ID does not exist',
          },
        });
      }
    });
  }

  createFilter(filter: Filter, filterMetadata: FilterMetadata) {
    this.filters[filter.id] = filter;
    this.filtersMetadata[filterMetadata.id] = filterMetadata;
  }

  updateFilter(filter: Filter, filterMetadata: FilterMetadata) {
    this.filters[filter.id] = filter;
    this.filtersMetadata[filter.id] = filterMetadata;
  }

  archiveFilter(filterId: string) {
    this.archivedFilters.push(filterId);
    delete this.filters[filterId];
    delete this.filtersMetadata[filterId];
  }

  static getInstance(): LocalBackendInterface {
    if (!LocalBackendInterface.instance) {
      LocalBackendInterface.instance = new LocalBackendInterface();
    }
    return LocalBackendInterface.instance;
  }
}
