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
    }

    #theme-toggle-checkbox {
        bottom: 2rem;  
        right: 1.3rem; 
    }

    @media (max-width: 768px) {  
        #theme-toggle-checkbox {
            bottom: 1rem; 
            right: 0.3rem; 
        }
    }

    #theme-toggle-checkbox:checked {
        background-image: url('src/images/switchOff.png'); 
    }
</style>