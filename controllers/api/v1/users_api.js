const Users = require('../../../models/users');
const jwt = require('jsonwebtoken');

module.exports.signUp = async function(req,res){
    //
    try{
        const user = await Users.create(req.body);
        return res.status(200).json({
            success: true,
            message: "Users created successfully",
        });

    }catch(error){
        return res.status(200).json({
            success: false,
            message: error.message
        })
    }
}

module.exports.createSession = async function(req,res){
    
    try{
        let user = await Users.findOne({ email: req.body.email });

        if (!user || user.password != req.body.password) {
          return res.json(422, {
            message: "Invalid username or password",
          });
        }

        return res.status(200).json({
          message: "Sign in successful, here is your token please keep it safe",
          data: {
            token: jwt.sign(user.toJSON(), "api", { expiresIn: "100000000" }),
          },
        });

    }catch(err){
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}