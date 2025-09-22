import User from "../models/user.model.js";
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "userId is not Found" });
    }
    const user = await User.findOne({ _id: userId});
    if (!user) {
      return res.status(400).json({ message: "user is not Found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `getCurent user error ${error}` });
  }
};
