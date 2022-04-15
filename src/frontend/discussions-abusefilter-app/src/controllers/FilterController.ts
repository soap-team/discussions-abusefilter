import type { Filter, FilterMetadata } from '@shared/filters';
import type { BackendInterface } from '../interfaces/BackendInterface';

export class FilterController {
  constructor(private readonly backendInterface: BackendInterface) {}

  getFilter(filterId: string) {
    return this.backendInterface.getFilter(filterId);
  }

  createFilter(filter: Filter, filterMetadata: FilterMetadata) {
    this.backendInterface.createFilter(filter, filterMetadata);
  }

  updateFilter(filter: Filter, filterMetadata: FilterMetadata) {
    this.backendInterface.updateFilter(filter, filterMetadata);
  }

  archiveFilter(filterId: string) {
    this.backendInterface.archiveFilter(filterId);
  }

  enableFilter(filterId: string) {
    return this.backendInterface.enableFilter(filterId);
  }

  disableFilter(filterId: string) {
    return this.backendInterface.disableFilter(filterId);
  }
}

