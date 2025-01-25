<script>
    import { currentDate } from '../utils/stores';
    import { requestWriteup } from '../utils/api';

    $: $currentDate && fetchWriteup($currentDate);

    let currentWriteup;

    const fetchWriteup = async (date) => {
        console.log(`Requesting writeup for: ${date}`);
        const rawWriteup = await requestWriteup(date);

        // Replace line breaks with <br> tags
        currentWriteup = rawWriteup.replace(/\n/g, '<br>');
        console.log(currentWriteup);
    };
</script>

<p>{@html currentWriteup}</p>
