import userModel from "../models/userModel.js";
import serviceModel from "../models/serviceModel.js";

const uploadServices = async (req, res) => {
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

        // ✅ Check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Role check: Only freelancers allowed to post services
        if (user.role !== 'freelancer') {
            return res.status(403).json({ message: "Only freelancers can upload services." });
        }

        // ✅ Create new service
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

export default uploadServices;
