const { Entry } = require('../models/index');

const deleteEntries = async (req, res) => {
    const { id } = req.params;
    try {
        const newToDelete = await Entry.findByPk(id);
        if (newToDelete) {
            await newToDelete.destroy();
            res.status(200).json({
                ok: true,
            })
        } else {
            throw new Error('An entry with the id passed by parameter was not found');
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error.message,
        });
    }
}

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
    deleteEntries,
};