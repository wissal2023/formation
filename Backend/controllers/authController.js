const user = require("../db/models/user");

const signup = async(req,res,next)=> {
    const body = req.body;
    if (!['1', '2'].includes(body.role)){
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid user type'
        });
    }
    const newUser = await user.create({
        username: body.username ,
        email: body.email,
        mdp: body.mdp,
        role: body.role,
              
        
    });

    if (!newUser){
        return res.status(400).json({
            status: 'fail',
            message: ' failed to create a user'
        });
    }
    return res.status(200).json({
        status: 'success',
        data:newUser,
    })
}


module.exports = {signup};
