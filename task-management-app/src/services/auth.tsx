async function postAuthData(payload: any, mode: string) {
    const uri: string = `http://localhost:8080/${mode}`
    const formData = new URLSearchParams();
    formData.append('username', payload['username'])
    formData.append('password', payload['password'])
    const body = formData.toString()
    console.log(body, JSON.stringify(payload))
    try {
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'no-cors',
            body: body,
        });
        return response;
    } catch(error) {
        console.error('Error posting data:', error);
        // throw new Error('Failed to post data');
        window.alert("失敗したンゴ")
    }
}

export { postAuthData }