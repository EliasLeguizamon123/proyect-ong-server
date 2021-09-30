const { Entry } = require('../models/index');

const postEntries = async (req, res) => {
    try {
        const newEntry = {
            ...req.body,
            type: 'news',
        };
        const entry = await Entry.create(newEntry);
        res.status(200).json({
            ok: true,
            data: entry,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message,
        });
    }
};

module.exports = {
    postEntries,
};