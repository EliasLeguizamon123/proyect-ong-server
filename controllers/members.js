const {Member} = require("../models/index");

const membersController = {
    getMembers : async (req, res) => {
        try{
            let members = await Member.findAll();
            return res.status(200).json({status: true, data: members});
        }catch(err){
            return res.status(500).json({status: false, msg: "Something went wrong", err});
        }
    }
}

module.exports = membersController;