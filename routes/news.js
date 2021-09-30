const { Router } = require('express');

const router = Router();


const { deleteEntries, postEntries } = require('../controllers/news.js');

router.delete('/', deleteEntries);
router.post('/', postEntries);

module.exports = router;