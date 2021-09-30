const { Entry } = require('../models/index');

const postEntries = async (req, res) => {
    try {
        const newEntry = {
            ...req.body,
            type: 'news' ,
        };
        const entry = await Entry.create(newEntry);
        res.status(200).json({
            ok: true,
            data: entry,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unknown error, contact admin',
            error
        });
    }
};

module.exports = {
    postEntries,
};