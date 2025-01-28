<script>
  import Header from './components/Header.svelte';
  import LightSwitch from './components/ThemeToggle.svelte';
  import DatePicker from './components/DatePicker.svelte';
  import Writeup from './components/Writeup.svelte';
  import Blur from './components/TopBottomBlur.svelte';
</script> 

<main>
  <Header />
  <LightSwitch />
  <br>
  <DatePicker />
  <Writeup />
  <Blur />
</main>