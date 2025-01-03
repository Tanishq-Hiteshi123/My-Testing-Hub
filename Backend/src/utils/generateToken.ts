import jwt from 'jsonwebtoken'

export function generateAccessToken (userDetails : {userId : string | unknown, email : string, userRole : string}) {
    console.log(userDetails , "USer DFtails")
  return jwt.sign(userDetails , process.env.JWT_SECRET! , {expiresIn : "30d"})

} 