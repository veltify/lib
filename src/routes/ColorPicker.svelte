<script lang="ts">
	import ModalContent from '$lib/components/Modal/ModalContent.svelte';
	import { onMount } from 'svelte';

	let { key } = $props();

	let input: any = $state();

	function onColorChange(e) {
		const { h, s, l } = hexToHSL(e.target.value);
		console.log('color change', { h, s, l });

        document.body.style.setProperty('--color-' + key, `hsl(${h} ${s} ${l})`)
	}

	function hexToHSL(hex) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		let r = parseInt(result[1], 16);
		let g = parseInt(result[2], 16);
		let b = parseInt(result[3], 16);

		(r /= 255), (g /= 255), (b /= 255);
		let max = Math.max(r, g, b),
			min = Math.min(r, g, b);
		let h,
			s,
			l = (max + min) / 2;

		if (max == min) {
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}

			h /= 6;
		}

		h = Math.round(h * 360);
		s = Math.round(s * 100);
		l = Math.round(l * 100);

		return { h, s, l };
	}

    function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}


    function openColorPicker() {
        const color = getComputedStyle(input).getPropertyValue('--color-' + key)
        console.log(color)

        const [h, s, l] = color.slice(4, -1).split(' ').map(x => x.replace('%', ''))
        input.value = hslToHex(h, s, l)

        input.click()
    }

</script>

<div class="relative">
	<div
		style="background-color: var(--color-{key});"
		onclick={() => openColorPicker()}
		class="border-base-300 h-12 w-40 rounded border"
	></div>

	<input
		bind:this={input}
		style="width: 0; height: 0; position: absolute;"
		type="color"
		oninput={onColorChange}
	/>
</div>
