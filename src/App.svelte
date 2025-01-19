<script>
  let pageHeader = "Chingifox"
</script>

<h1 class="header">{pageHeader}</h1>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap');

  .header {
    font-size: clamp(3rem, 6rem, 8vw); /* Dynamically resize */
    font-family: "Syne Mono", monospace; 
    font-style: italic;
    font-weight: 400;
    text-align: center; /* Center align the text */
    white-space: nowrap; /* Prevent the text from wrapping */
    overflow: hidden; /* Hide overflow if text exceeds container */
    @REM text-overflow: ellipsis; /* Show ellipsis if text is truncated */
    margin: 0; /* Remove default margins */
    padding: 1rem; /* Add some spacing */
  }

</style>