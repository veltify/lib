<script>
	import Button from './components/Button.svelte';
	import TabHeader from './components/Tabs/TabHeader.svelte';
	import TabItem from './components/Tabs/TabItem.svelte';
	import TabPanel from './components/Tabs/TabPanel.svelte';
	import Tabs from './components/Tabs/Tabs.svelte';
	import ThemeButton from './components/ThemeButton.svelte';

	let { src, example, code } = $props();

	let copied = $state(false);
	function onCopy() {
		navigator.clipboard.writeText(src);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 3000);
	}

	let theme = $state('light');
</script>

<div class="rounded-t-lg py-4">
	<Tabs active="preview" class="!gap-0">
		<div
			class="bg-base-200 border-base-300 flex items-center justify-between rounded-t-lg border border-b-0 p-2"
		>
			<TabHeader>
				<TabItem name="preview">Preview</TabItem>
				<TabItem name="code">Code</TabItem>
			</TabHeader>
			<div>
				<ThemeButton local bind:value={theme} />
			</div>
		</div>

		<TabPanel name="preview">
			<div class="bg-base-200 border-base-300 rounded-b-lg border p-8 shadow {theme}">
				{@render example()}
			</div>
		</TabPanel>
		<TabPanel name="code">
			<div class="dark relative">
				<pre class="!rounded-0 rounded-b-lg">{@render code()}</pre>
				<Button onclick={onCopy} variant="ghost" size="sm" class="absolute end-6 top-2"
					>{copied ? 'Copied' : 'Copy'}</Button
				>
			</div>
		</TabPanel>
	</Tabs>
</div>
