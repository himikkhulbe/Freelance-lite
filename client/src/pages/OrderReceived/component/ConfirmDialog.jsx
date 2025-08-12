import { useState } from 'react';


const ConfirmDialog = ({ order, type, onConfirm, onCancel }) => {
    const [rejectReason, setRejectReason] = useState('');
    const handleRejectOrder = (orderId) => {
        updateOrderStatus(orderId, 'rejected');
        setShowDialog(null);
        setRejectReason('');
    };


    return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {type === 'accept' ? 'Accept Order' : 'Reject Order'}
            </h3>
            <p className="text-gray-600 mb-4">
                {type === 'accept'
                    ? `Are you sure you want to accept the order from ${order.client.name}?`
                    : `Are you sure you want to reject the order from ${order.client.name}?`
                }
            </p>

            {type === 'reject' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason (Optional)
                    </label>
                    <textarea
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        placeholder="Provide a reason for rejection..."
                    />
                </div>
            )}

            <div className="flex gap-3 justify-end">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onConfirm(order.id)}
                    className={`px-4 py-2 text-white rounded-md transition-colors ${type === 'accept'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-red-600 hover:bg-red-700'
                        }`}
                >
                    {type === 'accept' ? 'Accept Order' : 'Reject Order'}
                </button>
            </div>
        </div>
    </div>
    )
}
export default ConfirmDialog;