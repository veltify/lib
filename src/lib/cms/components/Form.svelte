<script lang="ts">
	import { applyAction, deserialize } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";
	import { page } from "$app/state";
	import type { ActionResult } from "@sveltejs/kit";

	let {
		value = $bindable(),
		mode,
		onsubmit = undefined,
		onsuccess = undefined,
		children,
		action = page.url.pathname + (mode == "default" ? "" : "?/" + mode),
		...restProps
	} = $props();

	let submitting = $state(false);

	async function handleSubmit(event: any) {
		if (onsubmit) {
			onsubmit(event);
		} else {
			event.preventDefault();

			// const data = new FormData(event.currentTarget);
			submitting = true;

			const body = new FormData();
			body.set("value", JSON.stringify(value));
			// body.set('mode', mode);

			const response = await fetch(event.currentTarget.action, {
				method: "POST",
				body,
			});

			const result: ActionResult = deserialize(await response.text());
			console.log("result: ", result);

			if (result.type === "success") {
				await onsuccess?.(result);
				// rerun all `load` functions, following the successful update
				await invalidateAll();
			}
			if (result.type === "redirect") {
				goto(result.location);
			}
			submitting = false;

			applyAction(result);
		}
	}
</script>

<form
	{...restProps}
	method="POST"
	class:form-disabled={submitting}
	{action}
	novalidate
	onsubmit={handleSubmit}
>
	{@render children()}
</form>

<style>
	.form-disabled {
		opacity: 0.5;
		pointer-events: none;
	}
</style>
