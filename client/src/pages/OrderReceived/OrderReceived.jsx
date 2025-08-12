import { useState } from 'react';
import { User, Star, Phone, Mail, Clock, CheckCircle, XCircle, PlayCircle, FileCheck } from 'lucide-react';
// import ConfirmDialog from './component/ConfirmDialog';


const OrderReceived = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            client: {
                name: "John Smith",
                avatar: "JS",
                rating: 4.8,
                email: "john.smith@email.com",
                phone: "+1 (555) 123-4567"
            },
            service: "Web Development",
            requirements: "Need a responsive e-commerce website with payment integration and admin panel. Should support mobile devices and have SEO optimization.",
            budget: "$2,500",
            deadline: "2025-09-15",
            status: "new"
        },
        {
            id: 2,
            client: {
                name: "Sarah Johnson",
                avatar: "SJ",
                rating: 4.9,
                email: "sarah.j@company.com",
                phone: "+1 (555) 987-6543"
            },
            service: "Logo Design",
            requirements: "Modern minimalist logo for tech startup. Need vector files and brand guidelines. Colors should be professional and tech-focused.",
            budget: "$800",
            deadline: "2025-08-25",
            status: "accepted"
        },
        {
            id: 3,
            client: {
                name: "Mike Wilson",
                avatar: "MW",
                rating: 4.7,
                email: "mike.wilson@gmail.com",
                phone: "+1 (555) 456-7890"
            },
            service: "Content Writing",
            requirements: "20 blog articles about digital marketing. Each article should be 1500+ words with SEO optimization and relevant keywords.",
            budget: "$1,200",
            deadline: "2025-09-30",
            status: "in_progress"
        },
        {
            id: 4,
            client: {
                name: "Emily Davis",
                avatar: "ED",
                rating: 5.0,
                email: "emily.davis@startup.io",
                phone: "+1 (555) 321-0987"
            },
            service: "Mobile App UI",
            requirements: "Design UI/UX for fitness tracking mobile app. Need wireframes, mockups, and interactive prototypes for iOS and Android.",
            budget: "$3,000",
            deadline: "2025-08-20",
            status: "completed"
        }
    ]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [showDialog, setShowDialog] = useState(null);


    const statusConfig = {
        new: { label: 'New', color: 'bg-gray-100 text-gray-800', icon: Clock },
        accepted: { label: 'Accepted', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
        in_progress: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-800', icon: PlayCircle },
        completed: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: FileCheck },
        rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle }
    };

    const filteredOrders = orders.filter(order =>
        filterStatus === 'all' || order.status === filterStatus
    );

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const handleAcceptOrder = (orderId) => {
        updateOrderStatus(orderId, 'accepted');
        setShowDialog(null);
    };

    const handleRejectOrder = (orderId) => {
        updateOrderStatus(orderId, 'rejected');
        setShowDialog(null);
        setRejectReason('');
    };

    const handleStartWork = (orderId) => {
        updateOrderStatus(orderId, 'in_progress');
    };

    const handleCompleteWork = (orderId) => {
        updateOrderStatus(orderId, 'completed');
    };


    const OrderCard = ({ order }) => {
        const StatusIcon = statusConfig[order.status].icon;

        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                            {order.client.avatar}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">{order.client.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{order.client.rating}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusConfig[order.status].color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig[order.status].label}
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">{order.service}</h4>
                    <p className="text-gray-600 text-sm line-clamp-3">{order.requirements}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                        <span className="text-gray-500">Budget:</span>
                        <span className="font-semibold text-gray-900 ml-1">{order.budget}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Deadline:</span>
                        <span className="font-semibold text-gray-900 ml-1">{order.deadline}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>{order.client.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>{order.client.phone}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    {order.status === 'new' && (
                        <>
                            <button
                                onClick={() => setShowDialog({ order, type: 'accept' })}
                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                            >
                                Accept Order
                            </button>
                            <button
                                onClick={() => setShowDialog({ order, type: 'reject' })}
                                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors font-medium"
                            >
                                Reject Order
                            </button>
                        </>
                    )}

                    {order.status === 'accepted' && (
                        <button
                            onClick={() => handleStartWork(order.id)}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                        >
                            Start Work
                        </button>
                    )}

                    {order.status === 'in_progress' && (
                        <button
                            onClick={() => handleCompleteWork(order.id)}
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
                        >
                            Mark as Complete
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen mt-[65px] bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Received</h1>
                    <p className="text-gray-600">Manage your incoming orders and track their progress</p>
                </div>

                {/* Filter Tabs */}
                <div className="bg-white rounded-lg border border-gray-200 p-1 mb-6 flex gap-1 overflow-x-auto">
                    {[
                        { key: 'all', label: 'All Orders' },
                        { key: 'new', label: 'New' },
                        { key: 'accepted', label: 'Accepted' },
                        { key: 'in_progress', label: 'In Progress' },
                        { key: 'completed', label: 'Completed' },
                        { key: 'rejected', label: 'Rejected' }
                    ].map(filter => (
                        <button
                            key={filter.key}
                            onClick={() => setFilterStatus(filter.key)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${filterStatus === filter.key
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Orders Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredOrders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>

                {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-600">No orders match the selected filter criteria.</p>
                    </div>
                )}

                {/* Confirmation Dialog */}
                {showDialog && (
                    <ConfirmDialog
                        order={showDialog.order}
                        type={showDialog.type}
                        onConfirm={showDialog.type === 'accept' ? handleAcceptOrder : handleRejectOrder}
                        onCancel={() => {
                            setShowDialog(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default OrderReceived;