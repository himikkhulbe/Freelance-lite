import mongoose from "mongoose";
import User from "../models/userModel.js";
import Service from "../models/freelancerModels.js";

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

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== 'freelancer') {
            return res.status(403).json({ message: "Only freelancers can upload services." });
        }

        const service = await Service.create({
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


export const getMyServices = async (req, res) => {
    // Get the user id from the loggedin user
    const userId = req.user._id;
    try {
        // Find the user in the database
        const user = await User.findById(userId);
        // If the user is not found, return a 404 status code with a message
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Find the services associated with the user
        const services =  await Service.find({ user: userId });
        // Return the services with a 200 status code
        res.status(200).json(services);
    }catch(error){
        // If there is an error, return a 500 status code with a message
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getServices = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    try {
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(404).json({ message: "Invalid User Id" });
        }
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

export const getservice = async (req, res) => {
    const serviceId = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(serviceId)){
            return res.status(404).json({ message: "Invalid Service Id" });
        }
        const service = await Service.findById(serviceId);
        if(!service){
            return res.status(404).json({ message: "Service not found" });        
        }
        res.status(200).json(service);
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteService = async (req, res) => {
    const serviceId = req.params.id;
    const userId = req.user._id;
    try {
        if(!mongoose.Types.ObjectId.isValid(serviceId)){
            return res.status(404).json({ message: "Invalid Service Id" });
        }
        const service = await Service.findById(serviceId);
        if(!service){
            return res.status(404).json({ message: "Service not found" });        
        }
        if(service.user.toString() !== userId.toString()){
            return res.status(403).json({ message: "You are not authorized to delete this service" });
        }
        await Service.findByIdAndDelete(serviceId);
        res.status(200).json({ message: "Service deleted successfully" });
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
        }
}