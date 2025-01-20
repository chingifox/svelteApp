<script>
  const initialTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', initialTheme);
  let isDarkTheme = initialTheme === 'dark';

  const checkboxInput = () => {
    const theme = isDarkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };
</script>

<input 
  id="theme-toggle-checkbox" 
  type="checkbox"
  bind:checked={isDarkTheme}
  on:change={checkboxInput}
/>
<input 
  id="theme-toggle-checkbox" 
  type="checkbox"
  bind:checked={isDarkTheme}
  on:change={checkboxInput}
/>

<style>
    #theme-toggle-checkbox {
        position: fixed;
        z-index: 100;
        width: 3.6rem;  
        height: 3.6rem;  
        -webkit-appearance: none;
        appearance: none;
        border: none;
        cursor: pointer;
        background-image: url('src/images/switchOn.png');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        transition: background-image 0.2s ease;
    }

    #theme-toggle-checkbox {
        bottom: 2rem;  /* Enough space for larger screens */
        right: 1.3rem;  /* Enough space for larger screens */
    }

    @media (max-width: 768px) {  /* Apply styles for screens smaller than 768px (tablets and phones) */
        #theme-toggle-checkbox {
            bottom: 1rem;  /* Less space on smaller screens */
            right: 0.3rem;   /* Less space on smaller screens */
        }
    }

    #theme-toggle-checkbox:checked {
        background-image: url('src/images/switchOff.png'); /* Image for checked state */
    }
</style>