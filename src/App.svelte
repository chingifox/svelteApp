<script>
  import Header from './components/Header.svelte';
  import LightSwitch from './components/ThemeToggle.svelte';
</script>

<main>
  <Header />
  <LightSwitch />
</main>

<style>

  main {
    font-family: 'Syne Mono', monospace;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>