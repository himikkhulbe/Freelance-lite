import userModel from "../models/userModel.js";
import serviceModel from "../models/freelancerModels.js";

export const uploadServices = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            subcategory,
            tags,
            deliveryTime,
            price,
            images,
            faqs,
            requirements,
            revisions
        } = req.body;

        const userId = req.user._id;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== 'freelancer') {
            return res.status(403).json({ message: "Only freelancers can upload services." });
        }

        const service = await serviceModel.create({
            user: userId,
            title,
            description,
            category,
            subcategory,
            tags,
            deliveryTime,
            revisions,
            price,
            images,
            faqs,
            requirements
        });

        res.status(201).json({
            message: "Service uploaded successfully",
            service
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getServices = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });        
        }
        const services = await Service.find({ user: userId });
        res.status(200).json(services);
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
}
