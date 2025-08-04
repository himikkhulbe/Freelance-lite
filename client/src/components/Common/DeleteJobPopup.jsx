import React, { useState } from 'react';
import { Trash2, X, AlertTriangle } from 'lucide-react';

const DeleteServicePopup = ({ isOpen, onClose, jobId }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`https://freelance-lite.onrender.com/api/client/job/${jobId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            console.log("Job ID to delete:", jobId);
            console.log("Response status:", response);
            if (response.ok) {
                console.log("Job deleted successfully");
                onClose(); // Close the popup
                window.location.reload(); // Reload the page to reflect changes
            } else {
                console.error("Failed to delete Job");
            }
        } catch (error) {
            console.error("Error deleting Job:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blur Background Overlay */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Popup Container */}
            <div className="relative bg-white rounded-lg shadow-2xl p-6 mx-4 max-w-md w-full transform transition-all duration-200 scale-100">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Icon and Title */}
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="bg-[#e2bdc0] p-3 rounded-full mb-4">
                        <AlertTriangle className="text-[#D11A2A]" size={24} />
                    </div>

                    <h2 className="text-xl font-semibold text-black mb-2">
                        Delete Job
                    </h2>

                    <p className="text-gray-600">
                        Are you sure you want to delete this Job? This action cannot be undone.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-white border-2 border-bgrap-300 text-black rounded-lg transition-colors font-medium"
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex-1 px-4 py-2 bg-[#D11A2A] text-white rounded-lg hover:bg-[#a82828] transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDeleting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                <span>Deleting...</span>
                            </>
                        ) : (
                            <>
                                <Trash2 size={16} />
                                <span>Delete</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default DeleteServicePopup;