import React, { useState } from "react";

const defaultFaq = { question: "", answer: "" };

export default function UploadServiceForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        subcategory: "",
        tags: [],
        deliveryTime: 1,
        price: 0,
        revisions: 1,
        images: [],
        faqs: [defaultFaq],
        requirements: [""]
    });

    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleArrayChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value.split(",").map(i => i.trim()) }));
    };

    const handleFaqChange = (index, field, value) => {
        const updatedFaqs = [...formData.faqs];
        updatedFaqs[index][field] = value;
        setFormData({ ...formData, faqs: updatedFaqs });
    };

    const handleRequirementChange = (index, value) => {
        const updated = [...formData.requirements];
        updated[index] = value;
        setFormData({ ...formData, requirements: updated });
    };

    const addFaq = () => setFormData({ ...formData, faqs: [...formData.faqs, defaultFaq] });
    const addRequirement = () => setFormData({ ...formData, requirements: [...formData.requirements, ""] });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8000/api/freelancer/service", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Failed to create service");

            const data = await response.json();
            console.log(data);
            setStatus("success");
        } catch (err) {
            console.error(err);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow space-y-6">
            <h1 className="text-3xl font-bold text-center">Upload New Service</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="input" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <input className="input" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
                <input className="input" name="subcategory" placeholder="Subcategory" value={formData.subcategory} onChange={handleChange} required />
                <input className="input" name="tags" placeholder="Tags (comma separated)" value={formData.tags.join(", ")} onChange={(e) => handleArrayChange("tags", e.target.value)} required />
                <input className="input" name="images" placeholder="Image URLs (comma separated)" value={formData.images.join(", ")} onChange={(e) => handleArrayChange("images", e.target.value)} required />
                <input className="input" type="number" name="deliveryTime" placeholder="Delivery Time (days)" value={formData.deliveryTime} onChange={handleChange} required />
                <input className="input" type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                <input className="input" type="number" name="revisions" placeholder="Revisions" value={formData.revisions} onChange={handleChange} required />
            </div>

            <textarea className="input" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows={4} />

            <div>
                <h3 className="font-semibold mb-2">FAQs</h3>
                {formData.faqs.map((faq, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        <input className="input" placeholder="Question" value={faq.question} onChange={(e) => handleFaqChange(index, "question", e.target.value)} />
                        <input className="input" placeholder="Answer" value={faq.answer} onChange={(e) => handleFaqChange(index, "answer", e.target.value)} />
                    </div>
                ))}
                <button type="button" onClick={addFaq} className="btn">+ Add FAQ</button>
            </div>

            <div>
                <h3 className="font-semibold mb-2">Requirements</h3>
                {formData.requirements.map((req, index) => (
                    <input key={index} className="input mb-2" placeholder="Requirement" value={req} onChange={(e) => handleRequirementChange(index, e.target.value)} />
                ))}
                <button type="button" onClick={addRequirement} className="btn">+ Add Requirement</button>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Uploading..." : "Upload Service"}</button>

            {status === "success" && <p className="text-green-600 font-medium text-center">Service uploaded successfully!</p>}
            {status === "error" && <p className="text-red-600 font-medium text-center">Failed to upload service.</p>}
        </form>
    );
}

/* TailwindCSS utility classes */
/* Add these to global styles or tailwind config */
/*
.input {
  @apply w-full p-2 border border-gray-300 rounded-md;
}
.btn {
  @apply mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm;
}
.btn-primary {
  @apply mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700;
}
*/
