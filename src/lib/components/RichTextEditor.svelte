<script lang="ts">
	import { Editor } from '@tiptap/core';
	import { BubbleMenu } from '@tiptap/extension-bubble-menu';
	import StarterKit from '@tiptap/starter-kit';
	import TextAlign from '@tiptap/extension-text-align';
	import { onMount } from 'svelte';
	import RichTextEditorButton from './RichTextEditorButton.svelte';
	import { DropdownItem, DropdownMenu } from '../index.js';
	import Color from '@tiptap/extension-color';
	import TextStyle from '@tiptap/extension-text-style';
	import Link from '@tiptap/extension-link';
	// import { modalStore } from '$lib/stores/modal';
	import Image from '@tiptap/extension-image';
	import Highlight from '@tiptap/extension-highlight';
	import Underline from '@tiptap/extension-underline';
	import icons from './richTextIcons.js';

	import Icon from './BaseIcon.svelte';
	import RichTextColorsMenu from './RichTextColorsMenu.svelte';
	// import InputModal from './InputModal.svelte';
	// import ImageModal from './ImageModal.svelte';

	let { value = $bindable(), inline = false } = $props();

	let element: any = $state(null);

	let colorDropdownOpen = $state(false);

	let editor: any = $state(null);
	let menuEl: any = $state(null);

	let actions: any = $state({});

	function toggleTextColor(color: string, system = false) {
		if (system) {
			editor.chain().focus().setColor(`var(--color-${color})`).run();
		} else {
			editor.chain().focus().setColor(color).run();
		}

		colorDropdownOpen = false;
	}

	function toggleTextSize(size: any) {
		// editor.chain().focus().setSize(size).run();
	}

	// function toggleLink() {
	// 	modalStore.open(InputModal, {
	// 		placeholder: 'Enter link...',
	// 		title: 'Link',
	// 		onsubmit: (value) => {
	// 			editor.chain().focus().toggleLink({ href: value }).run();
	// 		}
	// 	});
	// }

	// function setImage() {
	// modalStore.open(ImageModal, {
	// 	placeholder: 'Upload image...',
	// 	title: 'Upload Image',
	// 	onsubmit: (value) => {
	// 		editor
	// 			.chain()
	// 			.focus()
	// 			.setImage({ src: '/files/' + value })
	// 			.run();
	// 	}
	// });
	// }

	function toggle(action: string) {
		if (action === 'bold') editor.chain().focus().toggleBold().run();
		else if (action === 'italic') editor.chain().focus().toggleItalic().run();
		else if (action === 'underline') editor.chain().focus().toggleUnderline().run();
		else if (action === 'strike') editor.chain().focus().toggleStrike().run();
		else if (action === 'paragraph') editor.chain().focus().setParagraph().run();
		else if (action === 'heading1') editor.chain().focus().toggleHeading({ level: 1 }).run();
		else if (action === 'heading2') editor.chain().focus().toggleHeading({ level: 2 }).run();
		else if (action === 'heading3') editor.chain().focus().toggleHeading({ level: 3 }).run();
		else if (action === 'heading4') editor.chain().focus().toggleHeading({ level: 4 }).run();
		else if (action === 'heading5') editor.chain().focus().toggleHeading({ level: 5 }).run();
		else if (action === 'heading6') editor.chain().focus().toggleHeading({ level: 6 }).run();
		else if (action === 'alignLeft') editor.chain().focus().setTextAlign('left').run();
		else if (action === 'alignCenter') editor.chain().focus().setTextAlign('center').run();
		else if (action === 'alignRight') editor.chain().focus().setTextAlign('right').run();
		else if (action === 'highlight') {
			editor
				.chain()
				.focus()
				.toggleHighlight({
					color: editor.isActive('highlight') ? undefined : '#ffc078' // if is already highlighted，unset the highlight color
				})
				.run();
		} else if (action === 'code') editor.chain().focus().toggleCode().run();
		else if (action === 'unsetLink') editor.chain().focus().unsetLink().run();
	}

	function onTransaction(ev: any) {
		actions.bold = editor.isActive('bold');
		actions.italic = editor.isActive('italic');
		actions.underline = editor.isActive('underline');
		actions.strike = editor.isActive('strike');
		actions.paragraph = editor.isActive('paragraph');
		actions.alignLeft = editor.isActive({ textAlign: 'left' });
		actions.alignCenter = editor.isActive({ textAlign: 'center' });
		actions.alignRight = editor.isActive({ textAlign: 'right' });
		actions.heading1 = editor.isActive('heading', { level: 1 });
		actions.heading2 = editor.isActive('heading', { level: 2 });
		actions.heading3 = editor.isActive('heading', { level: 3 });
		actions.heading4 = editor.isActive('heading', { level: 4 });
		actions.heading5 = editor.isActive('heading', { level: 5 });
		actions.heading6 = editor.isActive('heading', { level: 6 });
		actions.highlight = editor.isActive('highlight');
		actions.code = editor.isActive('code');
		actions.link = editor.isActive('link');
	}

	onMount(() => {
		editor = new Editor({
			element,
			content: inline ? undefined : value,
			extensions: [
				StarterKit,
				TextAlign.configure({
					types: ['heading', 'paragraph']
				}),
				BubbleMenu.configure({
					element: menuEl,
					tippyOptions: {
						maxWidth: 800
						// updateDuration: 100
					}
				}),
				TextStyle,
				Color.configure({
					types: ['textStyle']
				}),
				Highlight,
				Underline,
				// Subscript,
				// Superscript,

				Link.configure({
					openOnClick: false,
					autolink: true,
					defaultProtocol: 'https'
				}),
				Image
			],
			onUpdate({ editor }) {
				value = editor.getHTML();
			},
			editorProps: {
				attributes: {
					class: 'html'
				}
			},
			onTransaction
		});

		return () => {
			if (editor) {
				editor.destroy();
				editor = null;
			}
		};
	});

	$effect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value);
		}
	});
</script>

{#if inline}
	<div class="text-start text-base leading-normal tracking-normal">
		<div
			class:hidden={!editor}
			class="bg-base-200 border-base-300 w-full max-w-[800px] min-w-[300px] rounded-md border p-2"
			bind:this={menuEl}
		>
			{@render toolbar()}
		</div>
		<div bind:this={element}></div>
		{#if !editor}
			<div class="html">
				{@html value}
			</div>
		{/if}
	</div>
{:else}
	<div class="rich-text-editor border-base-300 bg-base-200 flex w-full flex-col rounded-lg border"
	>
		<div class="border-base-300 border-b px-3 py-2">
			<div class="flex flex-wrap items-center">
				{@render toolbar()}
			</div>
		</div>
		<div onfocus={element.focus} tabindex="0" class="h-full flex-1 overflow-auto rounded-b-lg bg-base-200">
			<div
				bind:this={element}
				class="tiptap-wrapper block w-full border-0 bg-base-200 text-sm text-content focus:ring-0 placeholder-muted"
			>
        </div>
		</div>
	</div>
{/if}
{#snippet toolbar()}
	<div class="flex flex-wrap items-center gap-1 rtl:space-x-reverse">
		<button
			data-active={actions.heading1 ||
				actions.heading2 ||
				actions.heading3 ||
				actions.heading4 ||
				actions.heading5 ||
				actions.heading6}
			class="rich-text-editor-toolbar-button !px-3 !py-1.5"
			type="button"
		>
			Heading
			<Icon {icons} name="flowbiteChevronDown" class="ms-1.5 -me-0.5 h-3.5 w-3.5 !text-base" />
		</button>

		<DropdownMenu autoclose>
			<DropdownItem
				onclick={() => toggle('paragraph')}
				class={actions.paragraph ? 'bg-base-100' : ''}
				>Paragraph
			</DropdownItem>
			<DropdownItem
				onclick={() => toggle('heading1')}
				class={actions.heading1 ? 'bg-base-100' : ''}
			>
				Heading 1
			</DropdownItem>
			<DropdownItem
				onclick={() => toggle('heading2')}
				class={actions.heading2 ? 'bg-base-100' : ''}
			>
				Heading 2
			</DropdownItem>
			<DropdownItem
				onclick={() => toggle('heading3')}
				class={actions.heading3 ? 'bg-base-100' : ''}
			>
				Heading 3
			</DropdownItem>
			<DropdownItem
				onclick={() => toggle('heading4')}
				class={actions.heading4 ? 'bg-base-100' : ''}
			>
				Heading 4
			</DropdownItem>
			<DropdownItem
				onclick={() => toggle('heading5')}
				class={actions.heading5 ? 'bg-base-100' : ''}
			>
				Heading 5
			</DropdownItem>
			<DropdownItem
				onclick={() => toggle('heading6')}
				class={actions.heading6 ? 'bg-base-100' : ''}
			>
				Heading 6
			</DropdownItem>
		</DropdownMenu>
		<div class="ps-1.5">
			<span class="block h-4 w-px bg-muted/40"></span>
		</div>
		<RichTextEditorButton
			icon="flowbiteBold"
			text="Bold"
			onclick={() => toggle('bold')}
			active={actions.bold}
		/>
		<RichTextEditorButton
			icon="flowbiteItalic"
			text="Italic"
			onclick={() => toggle('italic')}
			active={actions.italic}
		/>
		<RichTextEditorButton
			icon="flowbiteUnderline"
			text="Underline"
			onclick={() => toggle('underline')}
			active={actions.underline}
		/>
		<RichTextEditorButton
			icon="flowbiteStrike"
			text="Strike"
			onclick={() => toggle('strike')}
			active={actions.strike}
		/>
		<div class="px-0.5">
			<span class="block h-4 w-px bg-muted/40"></span>
		</div>
		<RichTextEditorButton
			icon="flowbiteAlignLeft"
			text="Align Left"
			onclick={() => toggle('alignLeft')}
			active={actions.alignLeft}
		/>
		<RichTextEditorButton
			icon="flowbiteAlignCenter"
			text="Align Center"
			onclick={() => toggle('alignCenter')}
			active={actions.alignCenter}
		/>
		<RichTextEditorButton
			icon="flowbiteAlignRight"
			text="Align Right"
			onclick={() => toggle('alignRight')}
			active={actions.alignRight}
		/>
		<div class="px-0.5">
			<span class="block h-4 w-px  bg-muted/40"></span>
		</div>

		<RichTextEditorButton
			icon="flowbiteHighlight"
			text="Highlight"
			onclick={() => toggle('highlight')}
			active={actions.highlight}
		/>
		<RichTextEditorButton
			icon="flowbiteCode"
			text="Code"
			onclick={() => toggle('code')}
			active={actions.code}
		/>

		<!-- <RichTextEditorButton
			icon="flowbiteLink"
			text="Link"
			onclick={() => toggleLink()}
			active={actions.link}
		/> -->
		<RichTextEditorButton
			icon="flowbiteRemoveLink"
			text="Remove Link"
			onclick={() => toggle('unsetLink')}
			active={actions.unsetLink}
		/>
		<!-- <RichTextEditorButton
			icon="flowbiteAddImage"
			text="Add Image"
			onclick={() => setImage()}
			active={actions.image}
		/> -->

		<RichTextEditorButton icon="flowbiteTextSize" />
		<DropdownMenu autoclose>
			<DropdownItem
				onclick={() => toggleTextSize(16)}
				class={actions.textSize == 16 ? 'bg-base-100' : ''}>16px (Default)</DropdownItem
			>
			<DropdownItem
				onclick={() => toggleTextSize(12)}
				class={actions.textSize == 12 ? 'bg-base-100' : ''}>12px (Tiny)</DropdownItem
			>
			<DropdownItem
				onclick={() => toggleTextSize(14)}
				class={actions.textSize == 14 ? 'bg-base-100' : ''}>14px (Small)</DropdownItem
			>
			<DropdownItem
				onclick={() => toggleTextSize(18)}
				class={actions.textSize == 18 ? 'bg-base-100' : ''}>18px (Lead)</DropdownItem
			>
			<DropdownItem
				onclick={() => toggleTextSize(24)}
				class={actions.textSize == 24 ? 'bg-base-100' : ''}>24px (Large)</DropdownItem
			>
			<DropdownItem
				onclick={() => toggleTextSize(36)}
				class={actions.textSize == 36 ? 'bg-base-100' : ''}>36px (Huge)</DropdownItem
			>
		</DropdownMenu>

		<RichTextEditorButton icon="flowbiteTextColor" />
        <RichTextColorsMenu onchoose={toggleTextColor} value={actions.color}/>
		
	</div>
{/snippet}
