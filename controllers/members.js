const {Member} = require("../models/index");

const membersController = {
    getMembers : async (req, res) => {
        try{
            let members = await Member.findAll();
            return res.status(200).json({ok: true, data: members});
        }catch(err){
            return res.status(500).json({ok: false, msg: err.message});
        }
    },
    createMember : async (req, res) => {
        try{
            let newUser = await Member.create(req.body);
            return res.status(201).json({ok: true, msg: `Member ${newUser.name} created successfully`, data: newUser});
        }catch(err){
            return res.status(500).json({ok: false, msg: err.message});
        }
    },
    deleteMember: async (req, res) => {
        const {id} = req.params;
        let memberExists = await Member.findByPk(id);
        if(memberExists){
            try{
                let deletedMember = await Member.destroy({where: {id}});
                return res.status(200).json({ok: true, data: deletedMember[0]});
            }catch(err){
                return res.status(500).json({ok: false, msg: err.message});
            }
        }

        return res.status(404).json({ok: false, msg: `Cannot find member with id ${id}`});
    },
    updateMember: async (req, res) => {
        const {id} = req.params;
        let memberExists = await Member.findByPk(id);
        if(memberExists){
            try{
                let updatedMember = await Member.update(req.body, {where: {id}});
                return res.status(200).json({ok: true, data: updatedMember[0]});
            }catch(err){
                return res.status(500).json({ok: false, msg: err.message});
            }
        }

        return res.status(404).json({ok: false, msg: `Cannot find member with id ${id}`});
    }

}

module.exports = membersController;