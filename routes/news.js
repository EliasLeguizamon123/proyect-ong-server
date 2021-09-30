const { Router } = require('express');
const router = Router();

const { postEntries } = require('../controllers/news.js');

router.post('/', postEntries);

module.exports = router;