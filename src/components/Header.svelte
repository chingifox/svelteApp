<script>
  let pageHeader = "Chingifox.Talk";
</script>

<h1 class="header">{pageHeader}</h1>

<style>
    .header {
        font-family: "Syne mono", monospace;
        font-size: clamp(3rem, 6rem, 8vw);
        font-style: italic;
        font-weight: 400;
        text-align: center; /* Center align the text */
        white-space: nowrap; /* Prevent text from wrapping */
        overflow: visible; /* Ensure text isn't cut off */
        margin: 0;
        padding: 1rem;
        max-width: 100vw; /* Ensure the header fits within the viewport */
        line-height: 1.2; /* Improve readability */
    }

    /* Responsive Adjustments (Mobile-first) */
    @media (max-width: 768px) {
        .header {
            font-size: clamp(3rem, 10vw, 6rem); /* Smaller size for small devices */
        }
    }
</style>