const { User } = require('../models/index');

const getUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll();
        res.status(200).json({
            ok: true,
            data: allUsers,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error.message,
        });
    }
};

module.exports = {
    getUsers,
}