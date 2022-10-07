// import dns module
const dns = require("dns");
const Url = require('../database/url.model');

const validateHostName = async (host) => {
    return new Promise((resolve, reject) => {
        dns.lookup(host, err => {
            if (err) reject(err);
            resolve('Ok');
        });
    });
};

const validateUrl = async (req, res, next) => {
    const { url } = req.body;

    const protocol = new RegExp('https://');
    const isBelongs = protocol.test(url);

    if (!url || !isBelongs) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    const hostName = url.trim().split('/')[2];
    try {
        await validateHostName(hostName);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    next();
};

const insertURL = async (req, res) => {
    const { url } = req.body;

    try {
        const exisUrl = await Url.findOne({ url });

        if (exisUrl) {
            return res.status(200).json({
                original_url: exisUrl.url,
                short_url: exisUrl.id
            });
        };

        const count = await Url.countDocuments();
        const id = count + 1;

        const sortUrl = new Url({ url, id });

        const result = await sortUrl.save();

        res.status(201).json({
            original_url: result.url,
            short_url: result.id
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'error, with DB server' });
    }
};

const getURL = async (req, res) => {
    const { id } = req.params;
    try {
        const exisUrl = await Url.findOne({ id });

        if (!exisUrl) {
            return res.status(401).json({ msg: "this short URL does not exist" });
        }

        res.redirect(exisUrl.url);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'error, with DB server' });
    };
};

module.exports = {
    insertURL,
    getURL,
    validateUrl
};