import React from 'react'
import { Edit } from 'lucide-react'
import IconWithtext from '../IconWithtext/IconWithtext'

function ContactSection({title , data}) {
  return (
                        <div className="w-full min-h-[120px] p-[30px] border-[0.5px] border-slate-500 bg-slate-50 rounded-lg">
                            <div className="w-full flex justify-between items-center">
                                <p className="text-black text-lg font-semibold">
                                    {title}
                                </p>
                                {}
                                <Edit className="text-blue-600 w-4 h-4 cursor-pointer" />
                            </div>
                            <div className="mt-[20px]">
                                {data?.map((item, index) => (
                                    <div key={index} className="flex items-center gap-[10px] mb-[10px]">
                                        <IconWithtext
                                            key={index}
                                            Icon={item.Icon}
                                            text={item.text}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
)
}

export default ContactSection