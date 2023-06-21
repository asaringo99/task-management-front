async function postData(payload: any) {
    const token: string = ''
    try {
        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        return data;
    } catch(error) {
        console.error('Error posting data:', error);
        throw new Error('Failed to post data');
    }
}

export { postData }