<script>
    import { parse } from 'date-fns'; 
    import { writable } from 'svelte/store';

    const date = '1 January, 2025';
    const datesArray = ["1 January, 2024", "3 January, 2024", "5 January, 2024", "6 January, 2024", "3 February, 2024", "4 February, 2024", "13 February, 2024", "22 February, 2024", "8 March, 2024", "16 March, 2024", "26 March, 2024", "1 January, 2025", "3 January, 2025", "5 January, 2025", "6 January, 2025", "3 February, 2025", "4 February, 2025", "13 February, 2025", "22 February, 2025", "8 March, 2025", "16 March, 2025", "26 March, 2025"];

    const parsedDates = datesArray.reduce((acc, dateStr) => {
        const parsedDate = parse(dateStr, 'd MMMM, yyyy', new Date()); // 'd MMMM, yyyy' is the format

        const year = parsedDate.getFullYear();
        const month = parsedDate.toLocaleString('default', { month: 'long' });
        const day = parsedDate.getDate();

        acc[year] = acc[year] || {};
        acc[year][month] = acc[year][month] || [];
        acc[year][month].push(day);

        return acc;
    }, {});
    const years = Object.keys(parsedDates).sort(); 
    let currentYear = years[0];
    let selectedDate = datesArray[0]; 
    const showSelector = writable(false);

    const toggleSelector = () => {
        showSelector.update((visible) => !visible);
    };

    const selectDate = (date) => {
        selectedDate = date;
        showSelector.set(false);
    };

    const switchYear = (direction) => {
        const currentIndex = years.indexOf(currentYear);
        const nextIndex = Math.max(0, Math.min(years.length - 1, currentIndex + direction));
        currentYear = years[nextIndex];
    };
</script>

<div class="datepicker-container">
    <button class="selected-date" on:click={toggleSelector} aria-expanded={$showSelector}>
        {date}
    </button>
</div>

{#if $showSelector}
    <div class="selector">
        <!-- Year Navigation -->
        <div class="year-display">
            <button class="arrow left" on:click={() => switchYear(-1)} aria-label="Previous Year">←</button>
            <span class="year">{currentYear}</span>
            <button class="arrow right" on:click={() => switchYear(1)} aria-label="Next Year">→</button>
        </div>
    </div>
{/if}

<style>
    .datepicker-container {
        display: flex;
        justify-content: flex-end;
        position: relative;
        font: inherit;
        border: solid;
    }

    .selected-date {
        font: inherit;
        color: var(--themefontcolor);
        background-color: var(--themebg);
        cursor: pointer;
        padding: 1rem;
        border: solid;
    }

    .selector {
        position: relative;
        margin-top: 0.5rem; 
        padding: 1rem;
        background-color: var(--themebg);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        z-index: 1000; 
        border: solid;
        min-width: 200px; 
    }

    .year-display {
        display: flex;
        justify-content: space-between; /* Spread arrows and year evenly */
        align-items: center;
        width: 100%;
        font-size: 1.25em;
    }

    .arrow {
        background-color: var(--themebg);
        color: var(--themefontcolor);
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        border: solid;
    }

    .arrow.left {
        justify-self: flex-start; /* Align left arrow to the start */
    }

    .arrow.right {
        justify-self: flex-end; /* Align right arrow to the end */
    }

    .year {
        text-align: center;
        flex: 1; /* Push the arrows to the sides, keeping the year centered */
    }
</style>
