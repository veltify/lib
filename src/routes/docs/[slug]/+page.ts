export async function load({params}) {
    const module = await import(`../${params.slug}.md`)

    return {
        component: module.default,
        props: module.metadata
    }

}