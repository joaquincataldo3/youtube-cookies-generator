import express from 'express';
import bodyParser from 'body-parser';
import { getYoutubeCookies, formatCookiesToNetscapeFormat } from './utils.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/download', async (req, res, attempt = 1) => {
    
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: 'URL is required.' });
    }

    try {

        const cookies = await getYoutubeCookies();

        const cookieFormatedString = formatCookiesToNetscapeFormat(cookies);

        return res.status(200).json({
            message: 'succesfully obtained cookies',
            data: cookieFormatedString
        })

    } catch (error) {
        console.error('Error obtaining cookies:', error);
        return res.status(500).json({ message: 'Error obtaining cookies', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});