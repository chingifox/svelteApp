<script>
  let pageHeader = "Chingifox.Talk";

  const initialTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', initialTheme);
  let isDarkTheme = initialTheme === 'dark';

  const checkboxInput = () => {
    const theme = isDarkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };
</script>

<h1 class="header">{pageHeader}</h1>

<input 
  id="theme-toggle-checkbox" 
  type="checkbox"
  bind:checked={isDarkTheme}
  on:change={checkboxInput}
/>