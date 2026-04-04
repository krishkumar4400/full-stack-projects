import { User } from "../Model/User.js";

export const getUserData = async (req,res) => {
    try {
        const {userId} = req.body;

        const user = await User.findById(userId);

        if(!user) {
            return res.json({
                message: "User Not Found",
                success: false 
            });
        }
        res.json({
          success: true,
          userData: {
            name: user.name,
            isAccountVerified: user.isAccountVerified,
          },
        });
    } catch (error) {
        return res.json({
            message: error.message,
            success: false 
        });
    }
}