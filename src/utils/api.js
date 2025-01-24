export const requestDates = async () => {
    try {
        const response = await fetch('https://theserver-pa9m.onrender.com/dates');
        if (!response.ok) {
            throw new Error('Failed to fetch dates');
        }
        const dates = await response.json();
        const updatedDates = dates.map(date => date.filename);
        return updatedDates;

    } catch (error) {
        console.log("Error: ", error);
        return [];
    }
};


export const requestWriteup = async (writeupDate) => {
    try {
        const writeupResponse = await fetch('https://theserver-pa9m.onrender.com/writeups', {
            method : 'GET',
            headers : {'Writeup-Date' : writeupDate},
            referrerPolicy: 'no-referrer'
        });     

        if (!writeupResponse.ok){
            throw new Error('Failed to fetch content');
        }    
        const content = await writeupResponse.json();
        return content.content ;
    }    
    catch (error) {
        console.log("Error: ", error);
        return null; 
    }``    
}     
