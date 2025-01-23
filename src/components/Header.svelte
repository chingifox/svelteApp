<script>
  let pageHeader = "Chingifox";
</script>

<h1 class="header">{pageHeader}</h1>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap');

    .header {
        font-family: "Syne Mono", monospace; /* Chosen font */
        font-size: clamp(2rem, 8vw, 6rem); /* Dynamically resize text */
        font-style: italic;
        font-weight: 400;
        text-align: center; /* Center align the text */
        white-space: nowrap; /* Prevent text wrapping */
        margin: 0 auto; /* Center the header container */
        padding: 1rem;
        max-width: 100%; /* Ensure the header fits within the viewport */
        overflow: hidden; /* Prevent content from spilling out */
        line-height: 1.2; /* Adjust for readability */
        display: flex; /* Flexbox for horizontal alignment */
        justify-content: center; /* Center content horizontally */
        align-items: center; /* Center content vertically */
        height: fit-content; /* Allow height to adjust automatically */
    }


</style>