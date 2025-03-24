<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let {
		range = false,
		initialDate = null as Date | null,
		initialStartDate = null as Date | null,
		initialEndDate = null as Date | null,
		minDate = null as Date | string | null,
		maxDate = null as Date | string | null,
		firstDayOfWeek = 0 // 0 = Sunday, 1 = Monday
	} = $props();

	// State
	let currentMonth = $state(new Date());
	let secondMonth = $state(new Date(new Date().setMonth(new Date().getMonth() + 1)));
	let selectedDate = $state<Date | null>(initialDate ? new Date(initialDate) : null);
	let rangeStartDate = $state<Date | null>(initialStartDate ? new Date(initialStartDate) : null);
	let rangeEndDate = $state<Date | null>(initialEndDate ? new Date(initialEndDate) : null);
	let hoverDate = $state<Date | null>(null);
	
	// If no initial dates are provided, set current month
	$effect(() => {
		if (initialDate) {
			currentMonth = new Date(initialDate);
			secondMonth = new Date(new Date(initialDate).setMonth(initialDate.getMonth() + 1));
		} else if (initialStartDate) {
			currentMonth = new Date(initialStartDate);
			secondMonth = new Date(new Date(initialStartDate).setMonth(initialStartDate.getMonth() + 1));
		} else if (initialEndDate) {
			currentMonth = new Date(initialEndDate);
			secondMonth = new Date(new Date(initialEndDate).setMonth(initialEndDate.getMonth() + 1));
		}
	});

	// Calendar navigation
	function prevMonthHandler() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
		secondMonth = new Date(secondMonth.getFullYear(), secondMonth.getMonth() - 1, 1);
	}

	function nextMonthHandler() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
		secondMonth = new Date(secondMonth.getFullYear(), secondMonth.getMonth() + 1, 1);
	}

	// Format month and year
	let currentMonthYearDisplay = $derived(currentMonth.toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric'
	}));
	
	let secondMonthYearDisplay = $derived(secondMonth.toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric'
	}));

	// Get days for the current month view
	let currentCalendarDays = $derived(getCalendarDays(currentMonth, firstDayOfWeek));
	let secondCalendarDays = $derived(getCalendarDays(secondMonth, firstDayOfWeek));

	// Get weekday names
	let weekdays = $derived(getWeekdayNames(firstDayOfWeek));

	// Generate calendar days
	function getCalendarDays(date: Date, startDay: number) {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDayOfMonth = new Date(year, month, 1);
		const lastDayOfMonth = new Date(year, month + 1, 0);
		const daysInMonth = lastDayOfMonth.getDate();
		
		// Adjust for first day of week
		let firstDayOfCalendar = firstDayOfMonth.getDay() - startDay;
		if (firstDayOfCalendar < 0) firstDayOfCalendar += 7;
		
		const days = [];
		
		// Previous month days
		const prevMonthLastDay = new Date(year, month, 0).getDate();
		for (let i = firstDayOfCalendar - 1; i >= 0; i--) {
			days.push({
				date: new Date(year, month - 1, prevMonthLastDay - i),
				isCurrentMonth: false,
				isToday: false
			});
		}
		
		// Current month days
		const today = new Date();
		for (let i = 1; i <= daysInMonth; i++) {
			const date = new Date(year, month, i);
			days.push({
				date,
				isCurrentMonth: true,
				isToday: 
					date.getDate() === today.getDate() &&
					date.getMonth() === today.getMonth() &&
					date.getFullYear() === today.getFullYear()
			});
		}
		
		// Next month days
		const daysNeeded = 42 - days.length; // Always show 6 weeks
		for (let i = 1; i <= daysNeeded; i++) {
			days.push({
				date: new Date(year, month + 1, i),
				isCurrentMonth: false,
				isToday: false
			});
		}
		
		return days;
	}

	// Get weekday names
	function getWeekdayNames(startDay: number) {
		const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
		const reordered = [...weekdays.slice(startDay), ...weekdays.slice(0, startDay)];
		return reordered;
	}

	// Check if a date is disabled
	function isDisabled(date: Date) {
		if (minDate && date < new Date(minDate as string)) return true;
		if (maxDate && date > new Date(maxDate as string)) return true;
		return false;
	}

	// Check if a date is selected
	function isSelected(date: Date) {
		if (!range && selectedDate) {
			return date.getDate() === selectedDate.getDate() &&
				date.getMonth() === selectedDate.getMonth() &&
				date.getFullYear() === selectedDate.getFullYear();
		}
		return false;
	}

	// Check if a date is in the selected range
	function isInRange(date: Date) {
		if (!range || !rangeStartDate || !rangeEndDate) return false;
		
		return date > rangeStartDate && date < rangeEndDate;
	}

	// Check if a date is the start of the range
	function isRangeStart(date: Date) {
		if (!range || !rangeStartDate) return false;
		
		return date.getDate() === rangeStartDate.getDate() &&
			date.getMonth() === rangeStartDate.getMonth() &&
			date.getFullYear() === rangeStartDate.getFullYear();
	}

	// Check if a date is the end of the range
	function isRangeEnd(date: Date) {
		if (!range || !rangeEndDate) return false;
		
		return date.getDate() === rangeEndDate.getDate() &&
			date.getMonth() === rangeEndDate.getMonth() &&
			date.getFullYear() === rangeEndDate.getFullYear();
	}

	// Check if a date is in the hover range
	function isInHoverRange(date: Date) {
		if (!range || !rangeStartDate || !hoverDate || rangeEndDate) return false;
		
		return (date > rangeStartDate && date < hoverDate) ||
			(date < rangeStartDate && date > hoverDate);
	}

	// Handle date click
	function handleDateClick(date: Date) {
		if (isDisabled(date)) return;
		
		if (range) {
			if (!rangeStartDate || rangeEndDate) {
				// Start new selection
				rangeStartDate = date;
				rangeEndDate = null;
				// Don't dispatch yet, wait for end date
			} else {
				// Complete selection
				if (date < rangeStartDate) {
					rangeEndDate = rangeStartDate;
					rangeStartDate = date;
				} else {
					rangeEndDate = date;
				}
				// Dispatch when both dates are selected
				dispatch('select', { 
					type: 'range', 
					startDate: rangeStartDate, 
					endDate: rangeEndDate 
				});
			}
		} else {
			selectedDate = new Date(date);
			dispatch('select', { type: 'select', date: selectedDate });
		}
	}

	// Handle date hover
	function handleDateHover(date: Date) {
		if (range && rangeStartDate && !rangeEndDate) {
			hoverDate = new Date(date);
		}
	}

	// Get day class
	function getDayClass(day: any) {
		const classes = ['date-picker-day'];
		
		if (day.isCurrentMonth) {
			classes.push('date-picker-day-current-month');
		} else {
			classes.push('date-picker-day-other-month');
		}
		
		if (day.isToday) {
			classes.push('date-picker-day-today');
		}
		
		if (isDisabled(day.date)) {
			classes.push('date-picker-day-disabled');
		}
		
		if (isSelected(day.date)) {
			classes.push('date-picker-day-selected');
		}
		
		if (isRangeStart(day.date)) {
			classes.push('date-picker-day-range-start');
		}
		
		if (isRangeEnd(day.date)) {
			classes.push('date-picker-day-range-end');
		}
		
		if (isInRange(day.date) || isInHoverRange(day.date)) {
			classes.push('date-picker-day-in-range');
		}
		
		return classes.join(' ');
	}
</script>

<div class="date-picker-calendars">
	<div class="date-picker-calendar-container">
		<div class="date-picker-header">
			<button 
				type="button"
				class="date-picker-nav-button"
				on:click={prevMonthHandler}
				aria-label="Previous month"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="15 18 9 12 15 6"></polyline>
				</svg>
			</button>
			<span class="date-picker-month-year">{currentMonthYearDisplay}</span>
			{#if !range}
				<button 
					type="button"
					class="date-picker-nav-button"
					on:click={nextMonthHandler}
					aria-label="Next month"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</button>
			{:else}
				<span></span>
			{/if}
		</div>

		<div class="date-picker-weekdays">
			{#each weekdays as weekday}
				<div class="date-picker-weekday">{weekday}</div>
			{/each}
		</div>

		<div class="date-picker-days">
			{#each currentCalendarDays as day}
				<button
					type="button"
					class={getDayClass(day)}
					disabled={isDisabled(day.date)}
					on:click={() => handleDateClick(day.date)}
					on:mouseover={() => handleDateHover(day.date)}
					aria-label={day.date.toLocaleDateString()}
					aria-selected={isSelected(day.date) || isRangeStart(day.date) || isRangeEnd(day.date)}
				>
					{day.date.getDate()}
				</button>
			{/each}
		</div>
	</div>

	{#if range}
		<div class="date-picker-calendar-container">
			<div class="date-picker-header">
				<span></span>
				<span class="date-picker-month-year">{secondMonthYearDisplay}</span>
				<button 
					type="button"
					class="date-picker-nav-button"
					on:click={nextMonthHandler}
					aria-label="Next month"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</button>
			</div>

			<div class="date-picker-weekdays">
				{#each weekdays as weekday}
					<div class="date-picker-weekday">{weekday}</div>
				{/each}
			</div>

			<div class="date-picker-days">
				{#each secondCalendarDays as day}
					<button
						type="button"
						class={getDayClass(day)}
						disabled={isDisabled(day.date)}
						on:click={() => handleDateClick(day.date)}
						on:mouseover={() => handleDateHover(day.date)}
						aria-label={day.date.toLocaleDateString()}
						aria-selected={isSelected(day.date) || isRangeStart(day.date) || isRangeEnd(day.date)}
					>
						{day.date.getDate()}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
