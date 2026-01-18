import fetch from "node-fetch";

export const hello = () => (req, res) => res.send("Hello World!");

export const apiNames = () => async (req, res) => {
    const url = 'https://www.usemodernfullstack.dev/api/v1/users';
    let data;

    try{
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        data = await response.json();
    } catch(error){
        return res.status(502).send(`Failed to fetch data: ${error.message}`);
    }
    const rows = (Array.isArray(data) ? data : [])
        .map(u => `${u.username} (ID: ${u.id})`)
        .join('<br>');
        
    res.send(rows || 'No users found.');
}