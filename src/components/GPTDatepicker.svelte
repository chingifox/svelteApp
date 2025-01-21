<script>
  import { writable } from 'svelte/store';

  // Array of dates
  const datesArray = [
    '2023-03-08', '2023-03-18', '2023-03-06', '2024-01-15', '2024-11-13', '2024-02-05',
    '2023-10-02', '2024-12-05', '2023-07-27', '2023-12-25',
    '2024-05-03', '2023-09-18'
  ];

  // Map for month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Parse dates into a hierarchical structure: { [year]: { [month]: [dates] } }
  const parsedDates = datesArray.reduce((acc, dateStr) => {
    const [year, month, day] = dateStr.split('-');
    acc[year] = acc[year] || {};
    acc[year][month] = acc[year][month] || [];
    acc[year][month].push(day);
    console.log(acc)
    return acc;
  }, {});

  const years = Object.keys(parsedDates).sort(); // Sorted years for navigation

  // State stores
  let currentYear = years[0];
  let selectedDate = datesArray[0]; // Default to the first date in the array
  const showSelector = writable(false);

  // Change the year
  const switchYear = (direction) => {
    const currentIndex = years.indexOf(currentYear);
    const nextIndex = Math.max(0, Math.min(years.length - 1, currentIndex + direction));
    currentYear = years[nextIndex];
  };

  // Handle date click
  const selectDate = (date) => {
    selectedDate = date;
    showSelector.set(false);
  };

  // Toggle selector visibility
  const toggleSelector = () => {
    showSelector.update((visible) => !visible);
  };
</script>

<style>
  .datepicker-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
  }

  .selected-date {
    font-size: 1.5em;
    cursor: pointer;
    text-align: center;
    margin-bottom: 1rem;
  }

  .selector {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
    background-color: var(--themebg, #fff);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .year-display {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.25em;
  }

  .arrow {
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .months {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    text-align: center;
  }

  .month {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .month-header {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .dates {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
    gap: 0.25rem;
  }

  .date {
    padding: 0.25rem;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
    background-color: var(--themebg , #f0f0f0);
  }

  .date:hover {
    background-color: var(--hover-color, #ddd);
  }
</style>

<div class="datepicker-container">
  <div class="selected-date" on:click={toggleSelector}>
    {selectedDate}
  </div>

  {#if $showSelector}
    <div class="selector">
      <!-- Year Navigation -->
      <div class="year-display">
        <span class="arrow" on:click={() => switchYear(-1)}>←</span>
        {currentYear}
        <span class="arrow" on:click={() => switchYear(1)}>→</span>
      </div>

      <!-- Month and Dates -->
      <div class="months">
        {#each Object.keys(parsedDates[currentYear]) as month}
          <div class="month">
            <div class="month-header">
              {monthNames[parseInt(month, 10) - 1]}
            </div>
            <div class="dates">
              {#each parsedDates[currentYear][month] as day}
                <div 
                  class="date" 
                  on:click={() => selectDate(`${currentYear}-${month}-${day}`)}
                >
                  {day}
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
