const peerflix = require('peerflix');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/stream', (req, res) => {
    const magnetURI = req.query.magnet;
    if (!magnetURI) {
        return res.status(400).send('Magnet link is required');
    }

    const engine = peerflix(magnetURI);

    engine.server.once('listening', () => {
        const port = engine.server.address().port;
        res.send(`http://localhost:${port}/`);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
