import type { Action, ServerLoadEvent } from '@sveltejs/kit';

async function getFormBody(event: any) {
	const body = await event.request.formData()
	const value = JSON.parse(body.get('value')?.toString() ?? '{}')

	return value
}

async function validate(fields: any, body: any, mode = 'insert') {
	let errors: any = {};

	for (let fieldName in fields) {
		const field = fields[fieldName];

		if (mode == 'insert' && field.required && !body[fieldName]) {
			errors[fieldName] = `${field.label} is required`;
			continue;
		}

		if (field.min && body[fieldName] && body[fieldName].length < field.min) {
			errors[fieldName] = `${field.label} must be at least ${field.min} characters`;
			continue;
		}

		if (field.max && body[fieldName] && body[fieldName].length > field.max) {
			errors[fieldName] = `${field.label} must be at most ${field.max} characters`;
			continue;
		}

		if (field.validate) {
			let res = await field.validate();
			if (typeof res === 'string') {
				errors[fieldName] = res;
			}
		}
	}

	if (Object.keys(errors).length > 0) {
		return { errors, body };
	}
}

export function collectionLoad(config: any, hooks: any = {}) {
	
	return async (event: ServerLoadEvent) => {
        const db = event.locals.db

		if(config.type == 'form') {
			const value = await db(config.name).query().first() ?? {}
			return { value, config: JSON.parse(JSON.stringify(config)) };
		}

		// TODO: Think about parameters and return type
		let query = db(config.name).query()
		let context: any = {}

		for (let fieldName in config.fields) {
			const field = config.fields[fieldName]
			if (field.type === 'relation') {
				// load data of relation
				// .filter('_deleted', '!=', true)
				const items = await db(field.collection).query().all();
				context[fieldName] = items
			}
		}

		if (hooks.beforeLoad) {
			await hooks.beforeLoad({ query, context });
		}

		// let items = await query.filter('_deleted', '!=', true).all();
		let items = await query.all();

		if (hooks.afterLoad) {
			await hooks.afterLoad({ context, value: items });
		}

		return { items, context, config: JSON.parse(JSON.stringify(config)) };
	}
}

export function collectionInsert(config: any, hooks: any = {}): Action {
	return async (event) => {
		let body = await getFormBody(event)
        const db = event.locals.db

		if (hooks.beforeInsert) {
			await hooks.beforeInsert({ db, value: body });
		}

		const validateResult = await validate(config.fields, body)
		if (validateResult) return validateResult


		let result = await db(config.name).insert(body);

		if(hooks.afterInsert) {
			await hooks.afterInsert({ db, value: result });
		}

		return true;
	}
}

export function collectionUpdate(config: any, hooks: any = {}): Action {
	return async (event) => {
		let body = await getFormBody(event)
        const db = event.locals.db

		if(config.type == 'form') {

			// insert for first time
			const data = await db(config.name).query().first()
			if (hooks.beforeUpdate) {
				await hooks.beforeUpdate({ db, value: body });
			}
			let result;
			if(data) {
				const validateResult = await validate(config.fields, body)
				if (validateResult) return validateResult
	
				body.id = data.id
				result = await db(config.name).update(body)
			} else {
				const validateResult = await validate(config.fields, body, 'update')
				if (validateResult) return validateResult
	
				result = await db(config.name).insert(body)
			}

			if(hooks.afterUpdate) {
				await hooks.afterUpdate({ db, value: result });
			}
		} else {
			const validateResult = await validate(config.fields, body, 'update')
			if (validateResult) return validateResult

			if (hooks.beforeUpdate) {
				await hooks.beforeUpdate({ db, value: body });
			}

			let result = await db(config.name).update(body);

			if(hooks.afterUpdate) {
				await hooks.afterUpdate({ db, value: result });
			}
		}

		return true;
	}
}

export function collectionRemove(config: any, hooks: any = {}): Action {
	return async (event) => {
		let body = await getFormBody(event)
        const db = event.locals.db

		if (hooks.beforeRemove) {
			await hooks.beforeAction({ db, mode: 'remove', value: body });
		}

		let result = await db(config.name).update({ ...body, _deleted: true });

		if(hooks.afterRemove) {
			await hooks.afterRemove({ db, mode: 'remove', value: result });
		}

		return true;
	}
}

export function collectionActions(config: any, hooks: any) {
	return {
		insert: collectionInsert(config, hooks),
		update: collectionUpdate(config, hooks),
		remove: collectionRemove(config, hooks),
	}
}