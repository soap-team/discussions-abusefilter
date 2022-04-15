import type { Filter, FilterMetadata } from '@shared/filters';
import type { BackendInterface } from './BackendInterface';

const baseApiUrl = '';

export class ProductionBackendInterface implements BackendInterface {
  userToken: string;

  constructor( userToken: string) {
    this.userToken = userToken;
  }

  getFilters<T = any>(): Promise<T> {
    return fetch(`${baseApiUrl}/filters`, {
      method: 'GET',
      headers: {
        token: this.userToken,
      },
    })
      .then(res => res.json())
      .catch(e => console.log(e));
  }

  getFilter<T = any>(filterId: string): Promise<T> {
    return fetch(`${baseApiUrl}/filter/${filterId}`, {
      method: 'GET',
      headers: {
        token: this.userToken,
      },
    })
      .then(res => res.json())
      .catch(e => console.log(e));
  }

  createFilter(filter: Filter, filterMetadata: FilterMetadata) {
    console.log(filterMetadata);
    return fetch(`${baseApiUrl}/filter/new`, {
      method: 'POST',
      headers: {
        token: this.userToken,
      },
      body: JSON.stringify(filter),
    })
      .catch(e => console.log(e));
  }

  updateFilter(filter: Filter, filterMetadata: FilterMetadata) {
    console.log(filterMetadata);
    return fetch(`${baseApiUrl}/filter/${filter.id}`, {
      method: 'POST',
      headers: {
        token: this.userToken,
      },
      body: JSON.stringify(filter),
    })
      .catch(e => console.log(e));
  }

  archiveFilter(filterId: string) {
    return filterId;
  }

  enableFilter(filterId: string) {
    console.log(filterId);
  }

  disableFilter(filterId: string) {
    console.log(filterId);
  }
}
