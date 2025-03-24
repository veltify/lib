<script lang="ts">
	import Base from '../Base.svelte';
	import { createEventDispatcher } from 'svelte';
	import DatePickerCalendar from './DatePickerCalendar.svelte';

	const dispatch = createEventDispatcher();

	let {
		value = $bindable<Date | null>(null),
		range = false,
		startDate = $bindable<Date | null>(null),
		endDate = $bindable<Date | null>(null),
		placeholder = 'Select date',
		format = 'MM/DD/YYYY',
		disabled = false,
		minDate = null as Date | string | null,
		maxDate = null as Date | string | null,
		firstDayOfWeek = 0, // 0 = Sunday, 1 = Monday
		...restProps
	} = $props();

	let isOpen = $state(false);
	let inputElement = $state<HTMLElement | null>(null);

	// Format date for display
	function formatDate(date: Date | null): string {
		if (!date) return '';
		
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		
		return format
			.replace('YYYY', year.toString())
			.replace('MM', month)
			.replace('DD', day);
	}

	// Format date range for display
	function formatDateRange(): string {
		if (!startDate && !endDate) return '';
		if (startDate && !endDate) return formatDate(startDate);
		if (!startDate && endDate) return formatDate(endDate);
		return `${formatDate(startDate)} - ${formatDate(endDate)}`;
	}

	// Get display value
	let displayValue = $derived(range ? formatDateRange() : formatDate(value));

	// Toggle calendar
	function toggleCalendar() {
		if (!disabled) {
			isOpen = !isOpen;
		}
	}

	// Close calendar when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (isOpen && inputElement && !inputElement.contains(event.target as Node)) {
			const calendar = document.querySelector('.date-picker-calendar');
			if (calendar && !calendar.contains(event.target as Node)) {
				isOpen = false;
			}
		}
	}

	// Handle date selection
	function handleDateSelect(event: CustomEvent) {
		if (range) {
			if (event.detail.type === 'range') {
				startDate = event.detail.startDate;
				endDate = event.detail.endDate;
				isOpen = false;
				dispatch('change', { startDate, endDate });
			}
		} else {
			value = event.detail.date;
			isOpen = false;
			dispatch('change', { date: value });
		}
	}

	// Set up click outside listener
	$effect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});

	let baseProps = $derived({
		name: 'date-picker',
		restProps,
		css: {}
	});
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && (isOpen = false)} />

<Base {baseProps}>
	<div 
		class="date-picker-input"
		on:click={toggleCalendar}
		bind:this={inputElement}
		tabindex="0"
		role="textbox"
		aria-haspopup="true"
		aria-expanded={isOpen}
		aria-disabled={disabled}
	>
		{displayValue || placeholder}
	</div>

	{#if isOpen}
		<div class="date-picker-calendar">
			<DatePickerCalendar
				{range}
				initialDate={value}
				initialStartDate={startDate}
				initialEndDate={endDate}
				{minDate}
				{maxDate}
				{firstDayOfWeek}
				on:select={handleDateSelect}
			/>
		</div>
	{/if}
</Base>
