<script lang="ts">
	import Preview from '$lib/Preview.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/BaseIcon.svelte';
	import Tabs from '$lib/components/Tabs/Tabs.svelte';
	import TabHeader from '$lib/components/Tabs/TabHeader.svelte';
	import TabItem from '$lib/components/Tabs/TabItem.svelte';
	import TabContent from '$lib/components/Tabs/TabContent.svelte';
	import TabPanel from '$lib/components/Tabs/TabPanel.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import ModalContent from '$lib/components/Modal/ModalContent.svelte';
	import DropdownItem from '$lib/components/Dropdown/DropdownItem.svelte';
	import DropdownMenu from '$lib/components/Dropdown/DropdownMenu.svelte';
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import CarouselItem from '$lib/components/Carousel/CarouselItem.svelte';
	import Accordion from '$lib/components/Accordion/Accordion.svelte';
	import AccordionItem from '$lib/components/Accordion/AccordionItem.svelte';
	import SidebarMenu from '$lib/components/Sidebar/SidebarMenu.svelte';
	import SidebarItem from '$lib/components/Sidebar/SidebarItem.svelte';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import BaseIcon from '$lib/components/BaseIcon.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

	const icons = {
		lucideCirclePlus: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8m-4-4v8"/></g></svg>',
		lucideSunMedium: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707"/></g></svg>',
		elCheck: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1200 1200"><path fill="currentColor" d="M0 0v1200h1200V424.289l-196.875 196.875v381.961h-806.25v-806.25h381.961L775.711 0zm1030.008 15.161l-434.18 434.25L440.7 294.283L281.618 453.438L595.821 767.57l159.082-159.082l434.18-434.25l-159.082-159.081z"/></svg>',
		tablerAlien: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11 17a2.5 2.5 0 0 0 2 0"/><path d="M12 3C7.336 3 4.604 5.331 4.138 8.595a11.82 11.82 0 0 0 2 8.592a10.8 10.8 0 0 0 3.199 3.064c1.666 1 3.664 1 5.33 0a10.8 10.8 0 0 0 3.199-3.064a11.9 11.9 0 0 0 2-8.592C19.4 5.33 16.668 3 12.004 3zm-4 8l2 2m6-2l-2 2"/></g></svg>'
	}

	let dropdownOpen = $state(false);
	let dropdownValue: any = $state(undefined);

	let modalOpen = $state(false);
	function openModal() {
		modalOpen = true
	}

</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold">Components</h1>

	<Preview title="Alert">
		<Alert icon="T" title="Heads up!">You can add components to your app using the cli.</Alert>
		<br />
		<Alert variant="destructive" icon="T" title="Error">
			Your session has expired. Please log in again.
		</Alert>
	</Preview>

	<Preview title="Badge">
		<Badge>Default</Badge>
		<Badge variant="secondary">Secondary</Badge>
		<Badge variant="destructive">Destructive</Badge>
		<Badge variant="outline">Outline</Badge>
	</Preview>

	<Preview title="Button">
		<Button>Default</Button>
		<Button class="md:hidden" variant="secondary">Secondary</Button>
		<Button variant="outline">Outline</Button>
		<Button variant="ghost">Ghost</Button>
		<Button variant="link">Link</Button>
		<Button variant="destructive">Destructive</Button>

		<Button variant="primary" size="sm">Small</Button>
		<Button variant="primary" size="sm" icon>I</Button>
		<Button variant="primary" icon>I</Button>
	</Preview>

	<Preview title="Tabs">
		<Tabs active="General">
			<TabHeader>
				<TabItem name="General" />
				<TabItem name="SEO" />
				<TabItem name="Settings" />
			</TabHeader>
			<TabContent>
				<TabPanel name="General">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sequi excepturi reiciendis?
					Totam necessitatibus nisi dignissimos voluptatem iure esse culpa sint asperiores commodi
					rem inventore, cupiditate libero officia dolorem adipisci iusto sed saepe quasi. Nemo,
					sunt. Provident quo sit exercitationem quaerat illum numquam? Incidunt facere quasi minus
					sint ea? Possimus.
				</TabPanel>
				<TabPanel name="SEO">
					dipisicing elit. Ex sequi excepturi reiciendis? Totam necessitatibus nisi dignissimos
					voluptatem iure esse culpa sint asperiores commodi rem inventore, cupiditate libero
					officia dolorem adipisci iusto sed saepe quasi. Nemo, sunt. Provident quo sit
					exercitationem quaerat illum numquam? Incidunt facere quasi minus sint ea? Possimus.
				</TabPanel>
				<TabPanel name="Settings">
					Lorem ipsum dolor sit amet consectetur adidsf asdfasdofijasdf asdfasdfasdf
				</TabPanel>
			</TabContent>
		</Tabs>
	</Preview>
	<Preview title="Modal">
		<Button onclick={openModal}>Open modal</Button>
		<Modal bind:open={modalOpen}>
			<ModalContent>
				This is modal content
			</ModalContent>
		</Modal>
		
	</Preview>

	<Preview title="Carousel">
		<Carousel showDots dotCount={3}>
			<CarouselItem>
				<div class="flex items-center justify-center py-2xl border border-base-300 bg-base-100 text-content text-4xl">
					Item 1
				</div>
			</CarouselItem>
			<CarouselItem>
				<div class="flex items-center justify-center py-2xl border border-base-300 bg-base-100 text-content text-4xl">
					Item 2
				</div>
			</CarouselItem>
			<CarouselItem>
				<div class="flex items-center justify-center py-2xl border border-base-300 bg-base-100 text-content text-4xl">
					Item 3
				</div>
			</CarouselItem>
		</Carousel>
		
	</Preview>
	<Preview title="Accordion">
		<Accordion>
			<AccordionItem title="Item 1">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus soluta consectetur, quo hic sit, dolorum, vel a corporis suscipit cum eius recusandae expedita facere itaque ut fuga distinctio excepturi praesentium.
			</AccordionItem>
			<AccordionItem title="Item 2">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus soluta consectetur, quo hic sit, dolorum, vel a corporis suscipit cum eius recusandae expedita facere itaque ut fuga distinctio excepturi praesentium.
			</AccordionItem>
			<AccordionItem title="Item 3">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus soluta consectetur, quo hic sit, dolorum, vel a corporis suscipit cum eius recusandae expedita facere itaque ut fuga distinctio excepturi praesentium.
			</AccordionItem>
		</Accordion>
		
	</Preview>

	<Preview title="Sidebar">
		<Sidebar variant="icon">
			<SidebarMenu>
				<SidebarItem name="Item 1" href="/item-1">
					{#snippet icon()}
						<BaseIcon name="lucideCirclePlus" {icons} size="sm"/>
					{/snippet}
				</SidebarItem>
				<SidebarItem name="Item 2" href="/item-2">
					{#snippet icon()}
						<BaseIcon name="lucideCirclePlus" {icons} size="sm"/>
					{/snippet}
				</SidebarItem>
				<SidebarItem name="Item 3" href="/item-3">
					{#snippet icon()}
						<BaseIcon name="lucideCirclePlus" {icons} size="sm"/>
					{/snippet}
				</SidebarItem>
	
			</SidebarMenu>
		</Sidebar>
		
		<Sidebar variant="default">
			<SidebarMenu>
				<SidebarItem name="Item 1" href="/item-1">
					{#snippet icon()}
						<BaseIcon name="lucideCirclePlus" {icons} size="sm"/>
					{/snippet}
				</SidebarItem>
				<SidebarItem name="Item 2" href="/item-2">
					{#snippet icon()}
						<BaseIcon name="lucideCirclePlus" {icons} size="sm"/>
					{/snippet}
				</SidebarItem>
				<SidebarItem name="Item 3" href="/item-3">
					{#snippet icon()}
						<BaseIcon name="lucideCirclePlus" {icons} size="sm"/>
					{/snippet}
				</SidebarItem>
	
			</SidebarMenu>
		</Sidebar>
		
	</Preview>


	<Preview title="Tooltip">
		<Button>Open Tooltip</Button>
		<Tooltip placement="top">
			Hello World!
		</Tooltip>
	</Preview>


	<Preview title="Dropdown">
		<Button>Open Dropdown</Button>
		<DropdownMenu>
			<DropdownItem>Item 1</DropdownItem>
			<DropdownItem>Item 2</DropdownItem>
			<DropdownItem>Item 3</DropdownItem>
		</DropdownMenu>

		<Button variant="secondary">Open Dropdown top</Button>
		<DropdownMenu placement="top-start">
			<DropdownItem>Item 1</DropdownItem>
			<DropdownItem>Item 2</DropdownItem>
			<DropdownItem>Item 3</DropdownItem>
		</DropdownMenu>

		<Button variant="secondary">State ({dropdownOpen ? 'open' : 'closed'}) ({dropdownValue ?? '---'})</Button>
		<DropdownMenu bind:open={dropdownOpen} placement="top-start">
			<DropdownItem onclick={() => {dropdownOpen = false; dropdownValue = 1}}>Item 1</DropdownItem>
			<DropdownItem disabled onclick={() => {dropdownOpen = false; dropdownValue = 2}}>Item 2</DropdownItem>
			<DropdownItem onclick={() => {dropdownOpen = false; dropdownValue = 3}}>Item 3</DropdownItem>
		</DropdownMenu>
	</Preview>
	<Preview title="Icon">
		<span>You can use text color to set color of icon. and sizing classes of tailwind to resize icons</span>
		<br/>
		<br/>
		<Icon {icons} name="elCheck" />
		<Icon {icons} name="lucideCirclePlus" />
		<Icon {icons} name="tablerAlien" />
		<Icon {icons} name="lucideSunMedium" />
		<Icon {icons} size="lg" name="lucideSunMedium" />
		<Icon {icons} size="2xl" class="text-orange-500" name="lucideSunMedium" />
		<br/>
		<Icon {icons} size="xs" name="lucideSunMedium" />
		<Icon {icons} size="sm" name="lucideSunMedium" />
		<Icon {icons} size="md" name="lucideSunMedium" />
		<Icon {icons} size="lg" name="lucideSunMedium" />
		<Icon {icons} size="xl" name="lucideSunMedium" />
		<Icon {icons} size="2xl" name="lucideSunMedium" />
		<Icon {icons} size="3xl" name="lucideSunMedium" />
		<Icon {icons} size="4xl" name="lucideSunMedium" />
		<br/>

		<span>You should create your own icon component for your project and define icons in $lib/icons.ts file</span>

		<br/>
<span class="block pt-4 font-bold">$lib/components/Icon.svelte</span>
		<pre class="rounded border border-gray-300 bg-gray-200 p-2"><code>{'<'}script lang="ts"{'>'}
	import {'{'} BaseIcon {'}'} from 'owls-lib'
	import icons from '$lib/icons'

    let {'{'} name, ...restProps {'}'} = $props()
{'<'}/script{'>'}

{'<'}BaseIcon {'{'}...restProps{'}'} {'{'}icons{'}'} {'{'}name{'}'}/{'>'}</code></pre>

<span class="block pt-4 font-bold">icons.ts</span>
<pre class="rounded border border-gray-300 bg-gray-200 p-2"><code>export default {'{'}
	nameOfIcon: '{'<'}svg{'>'}...{'<'}/svg{'}'}',
	nameOfAnotherIcon: '{'<'}svg{'>'}...{'<'}/svg{'}'}',
{'}'}</Preview>
</div>
