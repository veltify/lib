<script>
	import DropdownItem from "./Dropdown/DropdownItem.svelte";


	import DropdownMenu from "./Dropdown/DropdownMenu.svelte";

    let { onchoose, value } = $props()

    let open = $state(false)

</script>
<DropdownMenu bind:open class="max-h-96 overflow-auto">
    <DropdownItem
        onclick={() => onchoose('base-100', true)}
        class="{value === 'base-100'} flex items-center"
    >
        <span class="bg-base-100 me-2 inline-block h-4 w-4 rounded-md"></span>
        <span>Base 100</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('base-200', true)}
        class="{value === 'base-200'} flex items-center"
    >
        <span class="bg-base-200 me-2 inline-block h-4 w-4 rounded-md"></span>
        <span>Base 200</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('base-300', true)}
        class="{value === 'base-300'} flex items-center"
    >
        <span class="bg-base-300 me-2 inline-block h-4 w-4 rounded-md"></span>
        <span>Base 300</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('content', true)}
        class="{value === 'content'} flex items-center"
    >
        <span class="bg-content me-2 inline-block h-4 w-4 rounded-md"></span>
        <span>Content</span>
    </DropdownItem>

    <DropdownItem
        onclick={() => onchoose('muted', true)}
        class="{value === 'muted'} flex items-center"
    >
        <span class="bg-muted me-2 inline-block h-4 w-4 rounded-md"></span>
        <span>Muted</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('primary-base', true)}
        class="{value === 'primary-base'} flex items-center"
    >
        <span class="bg-primary-base me-2 inline-block h-4 w-4 rounded-md"></span>
        <span>Primary Base</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('primary', true)}
        class="{value === '"primary'} flex items-center"
    >
        <span class="bg-primary me-2 inline-block h-4 w-4 rounded-md"></span>
        <span>Primary</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('primary-hover', true)}
        class="{value === 'primary-hover'} flex items-center"
    >
        <span class="bg-primary-hover me-2 inline-block h-4 w-4 rounded-md"></span>
        <span>Primary Hover</span>
    </DropdownItem>
    <div class="border-base-300 my-3 border"></div>
    <DropdownItem
        onclick={() => onchoose('#1A56DB')}
        class="{value === '#1A56DB'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#1A56DB]"></span>
        <span>Blue</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#0E9F6E')}
        class="{value === '#0E9F6E'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#0E9F6E]"></span>
        <span>Green</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#FACA15')}
        class="{value === '#FACA15'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#FACA15]"></span>
        <span>Yellow</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#F05252')}
        class="{value === '#F05252'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#F05252]"></span>
        <span>Red</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#FF8A4C')}
        class="{value === '#FF8A4C'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#FF8A4C]"></span>
        <span>Orange</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#0694A2')}
        class="{value === '#0694A2'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#0694A2]"></span>
        <span>Teal</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#B4C6FC')}
        class="{value === '#B4C6FC'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#B4C6FC]"></span>
        <span>Light indigo</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#8DA2FB')}
        class="{value === '#8DA2FB'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#8DA2FB]"></span>
        <span>Indigo</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#5145CD')}
        class="{value === '#5145CD'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#5145CD]"></span>
        <span>Purple</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#771D1D')}
        class="{value === '#771D1D'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#771D1D]"></span>
        <span>Brown</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#FCD9BD')}
        class="{value === '#FCD9BD'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#FCD9BD]"></span>
        <span>Light orange</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#99154B')}
        class="{value === '#99154B'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#99154B]"></span>
        <span>Bordo</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#7E3AF2')}
        class="{value === '#7E3AF2'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#7E3AF2]"></span>
        <span>Dark Purple</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#CABFFD')}
        class="{value === '#CABFFD'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#CABFFD]"></span>
        <span>Light</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#D61F69')}
        class="{value === '#D61F69'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#D61F69]"></span>
        <span>Dark Pink</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#F8B4D9')}
        class="{value === '#F8B4D9'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#F8B4D9]"></span>
        <span>Pink</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#F6C196')}
        class="{value === '#F6C196'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#F6C196]"></span>
        <span>Cream</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#A4CAFE')}
        class="{value === '#A4CAFE'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#A4CAFE]"></span>
        <span>Light Blue</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#5145CD')}
        class="{value === '#5145CD'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#5145CD]"></span>
        <span>Dark Blue</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#B43403')}
        class="{value === '#B43403'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#B43403]"></span>
        <span>Orange Brown</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#FCE96A')}
        class="{value === '#FCE96A'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#FCE96A]"></span>
        <span>Light Yellow</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#1E429F')}
        class="{value === '#1E429F'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#1E429F]"></span>
        <span>Navy Blue</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#768FFD')}
        class="{value === '#768FFD'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#768FFD]"></span>
        <span>Light Purple</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#BCF0DA')}
        class="{value === '#BCF0DA'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#BCF0DA]"></span>
        <span>Light Green</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#EBF5FF')}
        class="{value === '#EBF5FF'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#EBF5FF]"></span>
        <span>Sky Blue</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#16BDCA')}
        class="{value === '#16BDCA'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#16BDCA]"></span>
        <span>Cyan</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#E74694')}
        class="{value === '#E74694'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#E74694]"></span>
        <span>Pink</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#83B0ED')}
        class="{value === '#83B0ED'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#83B0ED]"></span>
        <span>Darker Sky Blue</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#03543F')}
        class="{value === '#03543F'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#03543F]"></span>
        <span>Forest Green</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#111928')}
        class="{value === '#111928'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#111928]"></span>
        <span>Black</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#4B5563')}
        class="{value === '#4B5563'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#4B5563]"></span>
        <span>Stone</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#6B7280')}
        class="{value === '#6B7280'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#6B7280]"></span>
        <span>Gray</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#D1D5DB')}
        class="{value === '#D1D5DB'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#D1D5DB]"></span>
        <span>Light Gray</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#F3F4F6')}
        class="{value === '#F3F4F6'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#F3F4F6]"></span>
        <span>Cloud Gray</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#F3F4F6')}
        class="{value === '#F3F4F6'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#F3F4F6]"></span>
        <span>Cloud Gray</span>
    </DropdownItem>
    <DropdownItem
        onclick={() => onchoose('#F9FAFB')}
        class="{value === '#F9FAFB'} flex items-center"
    >
        <span class="me-2 inline-block h-4 w-4 rounded-md bg-[#F9FAFB]"></span>
        <span>Heaven Gray</span>
    </DropdownItem>
</DropdownMenu>