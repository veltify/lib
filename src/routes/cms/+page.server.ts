import { collectionLoad, collectionActions, collectionInsert, collectionRemove, collectionUpdate } from "$lib/cms";
import { getId } from "$lib/db/utils.js";

const config = {
    name: 'blogs',
    mode: 'crud', // 'form', 'crud-modal', // 'list'
    singular: 'Blog',
    plural: 'Blogs',
    fields: {
        title: {},
        slug: {},
        content: { type: 'rich-text', },
    },
    form: [['title', 'slug'], 'content'],
    table: ['title', 'slug']
}

export const load = collectionLoad(config, {})
export const actions = collectionActions(config, {
    async save({request}) {
        console.log('save')
    }
})
