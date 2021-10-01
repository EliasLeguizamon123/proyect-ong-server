const express = require("express");
const router = express.Router();
const {getMembers, deleteMember, createMember} = require("../controllers/members");
const { validate } = require('../middlewares/validate');
const memberSchema = require('../validation-schemas/member');


router.get("/", getMembers);
router.delete("/:id", deleteMember);
router.post("/", validate(memberSchema), createMember);

module.exports = router;