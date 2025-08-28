import { useState } from "react";
import { useParams } from "react-router-dom";

const ProposalModal = ({setShowProposalModal, job, fetchJob=null}) => {
    const [proposalData, setProposalData] = useState({
        coverLetter: '',
        bidAmount: ''
    });
    let { id } = useParams();
    id = id || job?._id;

    const handleProposalSubmit = async () => {
        if (!id) {
            console.error("Job ID missing. Cannot submit proposal.");
            return;
        }

        try {
            const response = await fetch(`https://freelance-lite.onrender.com/api/client/job/${id||job?._id}/proposal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(proposalData),
            });

            const data = await response.json().catch(() => null); // Safe JSON parse

            if (response.ok) {
                setShowProposalModal(false);
                setProposalData({ coverLetter: '', bidAmount: '' });
                {fetchJob && fetchJob()}// Refresh job data
            } else {
                console.error('Failed to submit proposal:', data?.error || data);
                alert(data?.error || 'Failed to submit proposal');
            }
        } catch (error) {
            console.error('Error submitting proposal:', error);
            alert('Something went wrong. Please try again later.');
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Submit Proposal</h3>
                <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="font-medium mb-2">{job?.title}</h4>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Budget: ₹{job?.budget}</span>
                            <span>Duration: {job?.duration}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Bid Amount (₹)
                        </label>
                        <input
                            type="number"
                            value={proposalData.bidAmount}
                            onChange={(e) => setProposalData(prev => ({
                                ...prev,
                                bidAmount: Number(e.target.value)
                            }))}
                            placeholder="Enter your bid amount"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cover Letter
                        </label>
                        <textarea
                            value={proposalData.coverLetter}
                            onChange={(e) =>
                                setProposalData((prev) => ({
                                    ...prev,
                                    coverLetter: e.target.value,
                                }))
                            }
                            placeholder="Describe why you're the best fit for this job..."
                            rows={5}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowProposalModal(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleProposalSubmit}
                            disabled={!proposalData.coverLetter || !proposalData.bidAmount}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Submit Proposal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProposalModal;