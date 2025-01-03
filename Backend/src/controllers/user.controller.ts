import { Request, Response } from 'express';
import response from '../helpers/response';
import { generateOTP } from '../utils/generateOTP';
import { userModel } from '../models/user.model';
import { nodeMailer } from '../helpers';
import { sendEmailVerificationTemplate } from '../templates/mailVerification';
import { studentModel } from '../models/student.model';
import { facultyModel } from '../models/faculty.model';
import { adminModel } from '../models/admin.model';
import mongoose from 'mongoose';
import { generateAccessToken } from '../utils/generateToken';

// Controller for sending the OTP on Email :-
const sendOTPOnEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    let isFirstTime = false;

    if (!email) {
      return response.error({
        res,
        code: 400,
        message: 'Email is not provided',
        data: null,
        error: true,
      });
    }

    // Check if user already Exist or not :-
    const isUserExist = await userModel.findOne({
      userEmail: email,
    });

    if (isUserExist) {
      isFirstTime = false;
    } else {
      isFirstTime = true;
    }

    // Generate the OTP :-
    const otp = generateOTP();

    // Sending the mail to the user :-
    const isMailSent = nodeMailer.sendEmail({
      receiver: email,
      subject: 'Mail for verification',
      html: sendEmailVerificationTemplate.replace('MYOTP', otp),
      text: 'Welcome',
    });

    if (!isMailSent) {
      return response.error({
        res,
        code: 500,
        message: 'Mail Could not be send',
        data: null,
        error: true,
      });
    }

    if (isUserExist) {
      const updatedExistingOne = await userModel.findOneAndUpdate(
        {
          userEmail: email,
        },
        { otp: otp, isVerified: false },
        { new: true }
      );

      if (!updatedExistingOne) {
        return response.error({
          res,
          code: 500,
          data: null,
          error: true,
          message: 'Otp in existing user could not get updated',
        });
      }

      return response.success({
        res,
        code: 200,
        data: {
          message: 'Updated Existing One',
          updatedExistingOne,
          isFirstTime,
          success : true
        },
        error: false,
        message: 'Mail sent to your email !',
      });
    } else {
      //  create New User :-
      const newUser = await userModel.create({
        userEmail: email,
        otp: otp,
      });
      if (!newUser) {
        return response.error({
          res,
          code: 500,
          data: null,
          error: true,
          message: 'New User could not get created',
        });
      }

      return response.success({
        res,
        code: 201,
        data: {
          message: 'New User',
          newUser,
          isFirstTime,
          success : true
        },
        error: false,
        message: 'New User Created SuccessFully & Mail sent to your email !',
      });
    }
  } catch (error) {
    return response.error({
      res,
      code: 500,
      error: true,
      data: null,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { otp, email, fullName, role, enroll } = req.body;

    if (!otp || !email) {
      return response.error({
        res,
        code: 400,
        data: null,
        error: true,
        message: 'Please Provide the complete details',
      });
    }

    //  Verify the email First :-
    const userDetails = await userModel.findOne({ userEmail: email });

    if (!userDetails) {
      return response.error({
        res,
        code: 404,
        data: null,
        error: true,
        message: 'User not found with this email address',
      });
    }

    if (userDetails.otp != otp) {
      return response.error({
        res,
        code: 400,
        data: null,
        error: true,
        message: 'Invalid OTP',
      });
    }

    // On the basis of role create an entry for it :-
    let dataEntry: mongoose.Document | null = null;
    if (role && fullName) {
      if (role == 'Student' && enroll) {
        //  Entry in student model
        dataEntry = await studentModel.create({
          studentName: fullName,
          userId: userDetails._id,
          enroll: enroll,
        });
      } else if (role == 'Faculty' && enroll) {
        //  Entry in Faculty model
        dataEntry = await facultyModel.create({
          facultyName: fullName,
          userId: userDetails._id,
          facultyEnroll: enroll,
        });
      } else {
        //  Entry in Admin model
        dataEntry = await adminModel.create({
          adminName: fullName,
          userId: userDetails._id,
        });
        console.log('Admin Data Entry ', dataEntry);
      }
    }

    let updatedUser;
    if (role) {
      updatedUser = await userModel.findOneAndUpdate(
        {
          userEmail: email,
        },
        { isVerified: true, otp: null, role: role },
        { new: true }
      );
    } else {
      updatedUser = await userModel.findOneAndUpdate(
        {
          userEmail: email,
        },
        { isVerified: true, otp: null },
        { new: true }
      );
    }
    if (!updatedUser) {
      return response.error({
        res,
        code: 500,
        data: null,
        error: true,
        message: 'User could not get verified',
      });
    }

    // Here Generate the Token (Access Token) :-

    const token = generateAccessToken({
      email: updatedUser.userEmail,
      userRole: updatedUser.role,
      userId: updatedUser?._id,
    });

    return response.success({
      res,
      code: 200,
      message: 'Email Verifed SuccessFully',
      data: {
        message: 'Email verified',
        updatedUser,
        token,
      },
      error: false,
    });
  } catch (error) {
    return response.error({
      res,
      code: 500,
      error: true,
      data: null,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};


const getMyRoleBasedProfile = async (req : Request , res : Response) =>{
  
    try {
      
      const {userId , role} = req.body;

      if (!userId || !role) {
          return response.error({
             res,
             code : 400,
             data : null,
             error : true,
             message : "Please Provide both userId as well as Role of User"
          })
      }

      
     let userDetails ;
      if (role == "Student") {
         userDetails = await studentModel.findOne({
           userId
         }).lean()
      }

      else if (role == "Admin") {
        userDetails = await adminModel.findOne({
          userId
        }).lean()
      }
      else if (role == "Faculty") {
        userDetails = await facultyModel.findOne({
          userId
        }).lean()
      }


      if (!userDetails) {
         return response.error({
          res,
          code : 404,
          data : null,
          error : true,
          message : "User Does not found"
         })
      }

      return response.success({
        res,
        code : 200,
        data : { 
          success : true,
          userDetails : {...userDetails , role}
        },
        error : false,
        message : "User Details"
      })
      

    }
    catch (error) {
       return response.error({
        res,
        code: 500,
        error: true,
        data: null,
        message: error instanceof Error ? error.message : 'Internal Server Error',
       })
    }

}

export { sendOTPOnEmail, verifyEmail , getMyRoleBasedProfile };
