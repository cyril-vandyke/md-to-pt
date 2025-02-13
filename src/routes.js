const express = require('express');
const { convertMarkdownToPortableText } = require('./convert');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/convert', (req, res) => {
    const data = req.body;
    if (!Array.isArray(data)) {
        return res.status(400).send('Invalid input');
    }

    console.log('data\n');
    console.log(data);

    const result = data.map(item => {
        if (typeof item.id !== 'string' || typeof item.markdown !== 'string') {
            return { error: 'Invalid object format' };
        }

        const portableText = convertMarkdownToPortableText(item.markdown);

        return { id: item.id, portableText: portableText };
    });

    console.log('result\n');
    console.log(result);

    res.json(result);
});

module.exports = router;