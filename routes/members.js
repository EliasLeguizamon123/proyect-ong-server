const express = require("express");
const router = express.Router();
const {getMembers, deleteMember, createMember, updateMember} = require("../controllers/members");
const { validate } = require('../middlewares/validate');
const memberSchema = require('../validation-schemas/member');


router.get("/", getMembers);
router.post("/", validate(memberSchema), createMember);
router.put("/:id",validate(memberSchema), updateMember);
router.delete("/:id", deleteMember);

module.exports = router;