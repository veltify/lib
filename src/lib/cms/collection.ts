import type { Action, ServerLoadEvent } from '@sveltejs/kit';

async function getFormBody(event: any) {
	const body = await event.request.formData()
	const value = JSON.parse(body.get('value')?.toString() ?? '{}')

	return value
}

async function validate(fields: any, body: any) {
	let errors: any = {};

	for (let fieldName in fields) {
		const field = fields[fieldName];

		if (field.required && !body[fieldName]) {
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

export function collectionLoad(config: any) {
	return async (event: ServerLoadEvent) => {
        const db = event.locals.db

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

		if (config.hooks?.beforeLoad) {
			query = await config.hooks?.beforeLoad?.({ query, context, mode: 'list' });
		}

		// let items = await query.filter('_deleted', '!=', true).all();
		let items = await query.all();

		if (config.hooks?.afterLoad) {
			items = await config.hooks.afterLoad({ mode: 'list', context, value: items });
		}

		console.log({ items, context, config })
		return { items, context, config: JSON.parse(JSON.stringify(config)) };
	}
}

export function collectionInsert(config: any): Action {
	return async (event) => {
		let body = await getFormBody(event)
        const db = event.locals.db

		let states: any = {}

		if (config.hooks?.beforeAction) {
			body = await config.hooks.beforeAction({ db, mode: 'insert', value: body, states });
		}

		const validateResult = await validate(config.fields, body)
		if (validateResult) return validateResult


		let result = await db(config.name).insert(body);

		await config.hooks?.afterAction?.({ db, mode: 'insert', value: result, states });

		return true;
	}
}

export function collectionUpdate(config: any): Action {
	return async (event) => {
		let body = await getFormBody(event)
        const db = event.locals.db

		const validateResult = await validate(config.fields, body)
		if (validateResult) return validateResult

		let states: any = {}

		if (config.hooks?.beforeAction) {
			body = await config.hooks.beforeAction({ db, mode: 'update', value: body, states });
		}

		let result = await db(config.name).update(body);

		await config.hooks?.afterAction?.({ db, mode: 'update', value: result, states });
		return true;
	}
}

export function collectionRemove(config: any): Action {
	return async (event) => {
		let body = await getFormBody(event)
        const db = event.locals.db

		let states: any = {}

		if (config.hooks?.beforeAction) {
			body = await config.hooks.beforeAction({ db, mode: 'remove', value: body, states });
		}

		let result = await db(config.name).update({ ...body, _deleted: true });

		await config.hooks?.afterAction?.({ db, mode: 'remove', value: result, states });

		return true;
	}
}

export function collectionActions(config: any) {
	return {
		insert: collectionInsert(config),
		update: collectionUpdate(config),
		remove: collectionRemove(config),
	}
}