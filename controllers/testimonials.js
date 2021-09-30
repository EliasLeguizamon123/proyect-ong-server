/*
Imports
*/
const { Testimonial } = require('../models/index');

/* 
Controller's Testimonials 
*/
const postTestimonial = async (req, res) =>{
    try{
        const newTestimonial = {...req.body};
        const testimonial = await Testimonial.create(newTestimonial);
        res.status(200).json({
            ok: true,
            data: testimonial
        })
    }
    catch(err){
        res.status(500).json({
            ok: false,
            msg: 'Unknown error, contact admin',
            error,
        });
    }
};

module.exports = {postTestimonial};