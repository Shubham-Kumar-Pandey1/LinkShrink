const urlModel = require("../model/url");
const shortid = require('shortid'); 

async function handleGetUserData(req,res){
    const shortID = req.params.id
    const userDetails = await urlModel.findOne({shortID});
    if(!userDetails){ return res.status(404).json({message:"Id not found"})}
    return res.redirect(userDetails.redirectUrl);

}

async function handleCreateNewUser(req,res){
    const shortID = shortid.generate();
    const body = req.body;
    if(!body.url){
        return res.status(400).json("url is required")
    }
    const data = await urlModel.create({
        shortID : shortID,
        redirectUrl: body.url
    });
    return res.render("home",{
        id:shortID,
    })
}


module.exports = {
    handleGetUserData,
    handleCreateNewUser,

}