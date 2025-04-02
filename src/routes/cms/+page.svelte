<script>
	import {CollectionManager, fields} from "$lib/cms";

    let {data, form} = $props()

</script>
<CollectionManager {fields} {data} {form}/>