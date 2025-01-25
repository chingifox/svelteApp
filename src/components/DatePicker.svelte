<script>
    import { parse, isValid } from 'date-fns';
    import { writable } from 'svelte/store';
    import { requestDates } from '../utils/api.js'; 
    import { onMount } from 'svelte'; 
    import { currentDate } from '../utils/stores.js';


    let datesArray = [];
    let parsedDates = { valid: {}, others: [] }; 
    currentDate.set('1 January, 2025');
    const showSelector = writable(false);
    let currentYear = null;  

    const toggleSelector = () => {
        showSelector.update((visible) => !visible);
    };

    const selectDate = (newDate) => {
        showSelector.set(false);
        currentDate.set(newDate);
    };

    const switchYear = (direction) => {
        const years = Object.keys(parsedDates.valid).sort((a, b) => (a === "Others" ? 1 : b === "Others" ? -1 : a - b));
        const currentIndex = years.indexOf(currentYear);
        const nextIndex = Math.max(0, Math.min(years.length - 1, currentIndex + direction));
        currentYear = years[nextIndex];
    };

    const initializeDateArray = async () => {
        try {
            datesArray = await requestDates();
            parsedDates = datesArray.reduce(
                (acc, dateStr) => {
                    const parsedDate = parse(dateStr, 'd MMMM, yyyy', new Date());
                    if (isValid(parsedDate)) {
                        const year = parsedDate.getFullYear();
                        const month = parsedDate.toLocaleString('default', { month: 'long' });
                        const day = parsedDate.getDate();

                        acc.valid[year] = acc.valid[year] || {};
                        acc.valid[year][month] = acc.valid[year][month] || [];
                        acc.valid[year][month].push(day);
                    } else {
                        acc.others.push(dateStr);
                    }
                    return acc;
                },
                { valid: {}, others: [] }
            );

            if (parsedDates.others.length > 0) {
                parsedDates.valid["Others"] = {};
                parsedDates.others.forEach((other) => {
                    parsedDates.valid["Others"][other] = null; 
                });
            }

            const years = Object.keys(parsedDates.valid).sort((a, b) => (a === "Others" ? 1 : b === "Others" ? -1 : a - b));
            currentYear = years[0];
        } catch (error) {
            console.error("Error fetching dates:", error);
        }
    };

    onMount(() => {
        initializeDateArray();
    });
</script>

<div class="datepicker-container">
    <button class="selected-date" on:click={toggleSelector} aria-expanded={$showSelector}>
        {$currentDate}
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
            <!-- Valid Dates -->
            {#each Object.keys(parsedDates.valid[currentYear] || {}) as month}
                {#if currentYear === "Others"}
                    <!-- "Others" Section -->
                    <div class="special-section-container">
                        <button 
                            class="invalid-month clickable" 
                            on:click={() => selectDate(month)}
                            >
                            {month}
                        </button>
                    </div>
                {:else}
                    <!-- Regular Valid Months -->
                    <div class="month">
                        <div class="month-header">{month}</div>
                        {#if parsedDates.valid[currentYear][month].length > 0}
                            <div class="dates">
                                {#each parsedDates.valid[currentYear][month].sort((a, b) => a - b) as day}
                                    <button 
                                        class="date" 
                                        on:click={() => selectDate(`${day} ${month}, ${currentYear}`)} 
                                        type="button"
                                    >
                                        {day}
                                    </button>
                                {/each}
                            </div>
                        {/if}
                    </div>
                {/if}
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
        padding: 1rem 1rem;
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
    
    .special-section-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px; 
        width: 100%; 
        padding: 0.5rem;
    }

    .invalid-month {
        border: 1px dotted var(--themefontcolor);
        background: transparent;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        font-size: larger;
        font-family: 'Courier New', Courier, monospace;
        font-weight: 500;
        text-align: center;
    }

    .invalid-month:hover {
        background-color: var(--themefontcolor);
        color: var(--themebg);
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
