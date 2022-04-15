import type { BackendInterface } from '../interfaces/BackendInterface';

export class FiltersController {
  constructor(private readonly backendInterface: BackendInterface) {}

  getFilters() {
    return this.backendInterface.getFilters();
  }
}

