import { getId, makeQuery, applyFilters } from './utils.js';
import type { QueryParams } from './utils.js';

export async function createIndexedDb({ name, version }: { name: string; version: number }) {
  // should run only on client side
  if(typeof indexedDB === 'undefined') return;
  
  const openRequest = indexedDB.open(name, version);

  return new Promise<(collectionName: string) => any>((resolve, reject) => {
    openRequest.onerror = () => reject(openRequest.error);

    openRequest.onsuccess = () => {
      const db = openRequest.result;

      resolve(<T>(collectionName: string) => {
        return {
          query: makeQuery(async ({ filters, sort, mappers, ...more }: QueryParams<T>) => {
            return new Promise((resolve, reject) => {

              const transaction = db.transaction('content', 'readonly');
              const store = transaction.objectStore('content');
              const index = store.index('type')
              const range = IDBKeyRange.only(collectionName)

              const request = index.getAll(range)

              request.onsuccess = (event) => {
                
                let results = request.result.map(item => {
                  const { id, data, ...rest } = item;
                  return { id, ...data, ...rest };
                });

                if (filters) results = applyFilters(results, filters);

                if (sort) {
                  results.sort((a, b) => {
                    if (sort.order === 'ASC') return a[sort.field] > b[sort.field] ? 1 : -1;
                    return a[sort.field] < b[sort.field] ? 1 : -1;
                  });
                }

                for (const mapper of mappers) {
                  results = results.map(item => mapper(item));
                }

                if (more.mode === 'first') resolve(results[0] || undefined);
                else if (more.mode === 'all') resolve(results);
                else if (more.mode === 'paginate') {
                  more.page ??= 1;
                  more.perPage ??= 10;
                  const start = (more.page - 1) * more.perPage;
                  const end = start + more.perPage;

                  resolve({
                    data: results.slice(start, end),
                    page: more.page,
                    perPage: more.perPage,
                    total: results.length
                  });
                }
              };

              request.onerror = () => reject(request.error);
            });
          }),

          async insert<T>(data: T) {
            if (!db.objectStoreNames.contains('content')) {
              db.createObjectStore('content', { keyPath: 'id' });
            }

            return new Promise((resolve, reject) => {
              const id = getId();
              const item = {
                id,
                type: collectionName,
                data,
                createdAt: new Date().valueOf(),
                updatedAt: 0
              };
              console.log('insert, ', data, collectionName)
              const transaction = db.transaction('content', 'readwrite');
              const store = transaction.objectStore('content');
              console.log(item)
              const request = store.add(item);

              request.onsuccess = () => resolve({ id, ...data });
              request.onerror = () => reject(request.error);
            });
          },

          async update<T>(data: T & any) {
            return new Promise((resolve, reject) => {
              const { id, createdAt, ...payload } = data;

              const transaction = db.transaction('content', 'readwrite');
              const store = transaction.objectStore('content');
              const getRequest = store.get(id);
              console.log('getRequest', id)

              getRequest.onsuccess = () => {
                const item = {
                  ...getRequest.result,
                  data: {...getRequest.result, ...payload},
                  createdAt: getRequest.result.createdAt,
                  updatedAt: new Date().valueOf()
                };

                const updateRequest = store.put(item);
                updateRequest.onsuccess = () => {
                  const { _id, ...rest } = item;
                  resolve({ id, ...rest });
                };
                updateRequest.onerror = () => reject(updateRequest.error);
              };
              getRequest.onerror = () => reject(getRequest.error);
            });
          },

          async remove(id: string) {
            return new Promise<boolean>((resolve, reject) => {
              const transaction = db.transaction('content', 'readwrite');
              const store = transaction.objectStore('content');
              const request = store.delete(id);

              request.onsuccess = () => resolve(true);
              request.onerror = () => reject(request.error);
            });
          }
        };
      });
    };

    openRequest.onupgradeneeded = (event) => {
      console.log('onupgrade needed', event)
      const db = openRequest.result;
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains('content')) {
        let store = db.createObjectStore('content', { keyPath: 'id' });
        store.createIndex('type', 'type', { unique: false })
      }
    };
  });
}