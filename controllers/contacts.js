/*
Imports
*/
const { Contact } = require('../models/index');

/* 
Controllers contacts
*/
const getContacts = async (req, res) => {
    try {
        const contactList = await Contact.findAll({ attributes: ['name', 'phone', 'email', 'message'] });
        res.status(200).json({
            ok: true,
            data: contactList
        })
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unknow error, contact admin',
            error,
        });
    }
};

module.exports = { getContacts };