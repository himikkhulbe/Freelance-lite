import React from 'react'
import {Loader} from 'lucide-react'


function Loading() {
  return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Please Wait...</p>
                </div>
            </div>
        )
}

export default Loading