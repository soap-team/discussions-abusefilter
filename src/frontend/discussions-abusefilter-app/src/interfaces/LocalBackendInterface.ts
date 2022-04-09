import type { Filter, FilterMetadata } from '@shared/filters';
import type { BackendInterface } from './BackendInterface';

export class LocalBackendInterface implements BackendInterface {
  filters: Filter[];
  filtersMetadata: FilterMetadata[];
  private static instance: LocalBackendInterface;

  private constructor() {
    this.filters = [];
    this.filtersMetadata = [];
  }

  getFilters(): FilterMetadata[] {
    return this.filtersMetadata;
  }

  getFilter(filterId: string): { filterDetails: Filter | undefined, filterMetadata: FilterMetadata | undefined } {
    return {
      filterDetails: this.filters.find(({ id }) => id === filterId),
      filterMetadata: this.filtersMetadata.find(({ id }) => id === filterId),
    };
  }

  createFilter(filter: Filter, filterMetadata: FilterMetadata) {
    this.filters.push(filter);
    this.filtersMetadata.push(filterMetadata);
  }

  updateFilter(filterId: string, filter: Filter, filterMetadata: FilterMetadata) {
    this.filters[this.filters.findIndex(f=> f.id === filterId)] = filter;
    this.filtersMetadata[this.filtersMetadata.findIndex(f => f.id === filterId)] = filterMetadata;
  }

  deleteFilter(filterId: string) {
    this.filters.splice(this.filters.findIndex(filter => filter.id === filterId), 1);
    this.filtersMetadata.splice(this.filtersMetadata.findIndex(filter => filter.id === filterId), 1);
  }

  static getInstance(): LocalBackendInterface {
    if (!LocalBackendInterface.instance) {
      LocalBackendInterface.instance = new LocalBackendInterface();
    }
    return LocalBackendInterface.instance;
  }
}
