import { readFile, writeFile } from 'fs/promises';
import { applyFilters, debounce, getId, makeQuery } from './utils.js';
import { existsSync } from 'fs';

export async function createFileDb({ path }: { path: string }) {
	let _data: Record<string, any[]> = {};

	async function load() {
		if (!existsSync(path)) {
			try {
				await writeFile(path, '{}');
			} catch(err) {
				// 
			}
		}
		const fileContent = await readFile(path, 'utf-8');
		
		try {
			_data = JSON.parse(fileContent);
		} catch (err) {
			_data = {};
		}
	}

	const saveDebounced = debounce(save, 1000);

	async function save() {
		try {
			await writeFile(path, JSON.stringify(_data, null, 4), 'utf-8');
		} catch(err) {
			// read only file system
			console.log(err)
		}
	}
	//

	await load();

	return (collectionName: string) => {
		if (!_data[collectionName]) {
			_data[collectionName] = [];
		}

		return {
			query: makeQuery(({ filters, sort, page, perPage, mappers, mode }: any) => {
				let results = structuredClone(_data[collectionName]);
				results = applyFilters(results, filters);

				if (sort && sort.field) {
					results = results.sort((a, b) => {
						if (a[sort.field] < b[sort.field]) return sort.order === 'ASC' ? -1 : 1;
						if (a[sort.field] > b[sort.field]) return sort.order === 'ASC' ? 1 : -1;
						return 0;
					});
				}

				if (mode === 'all') {
					return Promise.resolve(
						results.map((x) => {
							for (let mapper of mappers) {
								x = mapper(x);
							}
							return x;
						})
					);
				}

				if (mode === 'first') {
					let result = results[0];

					for (let mapper of mappers) {
						result = mapper(result);
					}

					return Promise.resolve(result);
				}
				if (mode === 'paginate') {
					let total = results.length;

					let data = results.slice((page - 1) * perPage, page * perPage);

					return Promise.resolve({
						data,
						page,
						perPage,
						total
					});
				}
			}),
			async insert(data: any) {
				data = {
					id: getId(),
					...data,
					createdAt: new Date().valueOf(),
					updatedAt: 0
				};

				_data[collectionName].push(data);
				saveDebounced();
				return Promise.resolve(data);
			},
			async update(data: any) {
				let result;
				_data[collectionName] = _data[collectionName].map((x) => {
					if (x.id === data.id) {
						result = {
							id: data.id,
							...x,
							...data,
							createdAt: x.createdAt,
							updatedAt: new Date().valueOf()
						};
						return result;
					}
					return x;
				});

				saveDebounced();

				return Promise.resolve(result);
			},
			async remove(id: string) {
				_data[collectionName] = _data[collectionName].filter((x) => x.id !== id);

				saveDebounced();
				return Promise.resolve(true);
			}
		};
	};
}
