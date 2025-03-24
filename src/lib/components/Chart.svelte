<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Base from './Base.svelte';

    const browser = typeof document !== 'undefined'

	type ChartType =
		| 'line'
		| 'bar'
		| 'pie'
		| 'doughnut'
		| 'radar'
		| 'polarArea'
		| 'bubble'
		| 'scatter';

	let {
		type = 'line' as ChartType,
		data = { labels: [], datasets: [] } as any,
		options = {},
		width = '100%',
		height = 'auto',
		locale = undefined,
		...restProps
	} = $props();

	let canvas: HTMLCanvasElement | null = $state(null);
	let chart: any = $state();

	let mergedOptions = $derived({
		responsive: true,
		maintainAspectRatio: true,
		...(locale == 'fa' && {
			locale: 'fa',
			scales: {
				x: {
					reverse: true,
					ticks: { direction: 'rtl' },
					...options?.scales?.x
				},
				...options?.scales
			},
			plugins: {
				legend: { rtl: true, ...options?.plugins?.legend },
				tooltip: { rtl: true, ...options?.plugins?.tooltip },
				...options?.plugins
			}
		}),
		...options
	});

	onMount(async () => {
		if (!browser || !canvas) return;
		const { default: ChartJS } = await import('chart.js/auto');
		chart = new ChartJS(canvas, { type, data, options: mergedOptions });
	});

	$effect(() => {
		if (chart) {
			chart.data = data;
			chart.update();
		}
	});
	$effect(() => {
		if (chart) {
			chart.options = mergedOptions;
			chart.update();
		}
	});

	onDestroy(() => {
		chart?.destroy();
	});

	let baseProps = $derived({
		...restProps,
		tag: 'canvas',
		name: 'chart',
		style: `width: ${width}; height: ${height};`
	});
</script>

<Base bind:element={canvas} {baseProps} />
