const {Member} = require("../models/index");

const membersController = {
    getMembers : async (req, res) => {
        try{
            let members = await Member.findAll();
            return res.status(200).json({ok: true, data: members});
        }catch(err){
            return res.status(500).json({ok: false, msg: err.message});
        }
    }
}

module.exports = membersController;