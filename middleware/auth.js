const jwt = require('jsonwebtoken');
const User = require('../models/User');



exports.protect=async (req,res,next)=>{
  let token;
  
  if(req.headers.authorization && req.header.authorization.startsWith('Bearer')){
  token = req.header.authorization.sprit(' ')[1];
  }

  if(!token){

    return res.status(401).json({success:false, massage: 'Not authorize to access this route'});
  }
  try{
    const decoded = jwt.verify(token.process.env.JWT_SECRET);
    console.log(decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch(err){
    console.log(err.stack);
    return res.status(401).json({success:false,massage: 'Not authorize to access this route'});
  }


}
exports.authorize=(...role)=>{
  return (req,res,next)=>{
    if(!role                .includes(req.user.role)){
      return res.status(403).json({success:false,message: `User role ${req.user.role} is not authorize to access this route`});
    }
    next();

  }
}

exports.modePee =(req,res,next)=>{
    if(req.user.mode!='pee'){
      return res.status(403).json({success:false,message: `User role ${req.user.mode} is not authorize to access this route`});
    }
    next();

  
}



exports.admin=(req,res,next)=>{
    if(req.user.role!='admin'){
      return res.status(403).json({success:false,message: `User role ${req.user.role} is not authorize to access this route`});
    }
    next();

  
}


exports.pee=(req,res,next)=>{
    if(!['pee','peto','admin'].includes(req.user.role)){
      return res.status(403).json({success:false,message: `User role ${req.user.role} is not authorize to access this route`});
    }
    next();

  
}
exports.authCamp=(req,res,next)=>{
    if(!req.user.authorizeId.includes(req.body.campId)&&req.user.role!='admin'){
      return res.status(403).json({success:false,message: `User role ${req.user.role} is not authorize to access this route`});
    }
    next();

  
}
exports.peto=(req,res,next)=>{
  if(!['peto','admin'].includes(req.user.role)){
    return res.status(403).json({success:false,message: `User role ${req.user.role} is not authorize to access this route`});
  }
  next();


}



