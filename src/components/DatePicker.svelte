<script>
    import { parse } from 'date-fns'; 
    import { writable } from 'svelte/store';

    let date = '1 January, 2025';
    const datesArray = ["1 January, 2024", "3 January, 2024", "5 January, 2024", "6 January, 2024","7 January, 2024", "9 January, 2024", "15 January, 2024", "16 January, 2024", "17 January, 2024", "18 January, 2024", "19 January, 2024", "20 January, 2024","3 February, 2024", "8 March, 2024", "16 March, 2024", "26 March, 2024", "3 April, 2025"];

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
    const showSelector = writable(false);

    const toggleSelector = () => {
        showSelector.update((visible) => !visible);
    };

    const selectDate = (newDate) => {
        date = newDate;
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
            <button class="arrow left" on:click={() => switchYear(-1)} aria-label="Previous Year">&lt;</button>
            <span class="year">{currentYear}</span>
            <button class="arrow right" on:click={() => switchYear(1)} aria-label="Next Year">&gt;</button>
        </div>

        <div class="month-display">
            {#each Object.keys(parsedDates[currentYear]) as month}
                <div class="month">
                    <div class="month-header">{month}</div>
                    <div class="dates">
                           {#each parsedDates[currentYear][month] as day}
                            <button 
                                class="date" 
                                on:click={() => selectDate(`${day} ${month}, ${currentYear}`)} 
                                type="button"
                            >
                                {day}
                            </button>
                        {/each}
                    </div>
                </div>
                {/each}
        </div>
    </div>
{/if}


<style>
    .datepicker-container {
        display: flex;
        justify-content: flex-end;
        position: relative;
        font: inherit;
        
    }

    .selected-date {
        font: inherit;
        cursor: pointer;
        padding: 0.5rem;
        border: none;
    }

    .selector {
        position: relative;
        margin-top: 0.5rem; 
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        z-index: 1000; 
        min-width: 200px; 
    }

    .year-display {
        display: flex;
        justify-content: space-evenly; 
        align-items: center;
        width: 100%;
        font-size: 3rem;
    }

    .arrow {
        border: none;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
    }

    .year {
        text-align: center;
        flex: 1; 
    }

    .month-display {
        display: flex;
        flex-wrap: wrap; 
        gap: 1rem;
        justify-content: center; 
        margin-top: 1rem;
    }

    .month {
        display: flex;
        flex-direction: column; 
        align-items: center; 
        padding: 0.5rem 1rem; 
        min-width: 100px;
        max-width: 160px; 
    }

    .month-header {
        font-size: 1.5rem;
        margin-bottom: 0.5rem; 
        text-align: center;

    }

    .dates {
        display: flex; 
        flex-wrap: wrap;
        gap: 0.25rem;
        justify-content: left; 
    }

    .date {
        cursor: pointer;
        border: 0.1px dotted var(--themefontcolor); 
        padding: 0.25rem 0.5rem;
        font-size: larger; 
        font-family: 'Courier New', Courier, monospace;
        font-weight: 500;
    }

    .date:hover {
        background-color: var(--themefontcolor);
        color: var(--themebg);
    }
</style>
