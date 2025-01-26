<script>
    import { currentDate } from '../utils/stores';
    import { requestWriteup } from '../utils/api';

    $: $currentDate && fetchWriteup($currentDate);

    let currentWriteup = localStorage.getItem('lastReadWriteup') || "loading...";

    const fetchWriteup = async (date) => {
        const rawWriteup = await requestWriteup(date);
        currentWriteup = rawWriteup.replace(/\n/g, '<br>');
        localStorage.setItem('lastReadWriteup', currentWriteup);
    };
</script>

<p class="writeup-container">{@html currentWriteup}</p>