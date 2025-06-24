function IconWithtext({ Icon, link, text }) {
    return (
        <div className="flex justify-start items-center gap-[8px] mt-[10px]">
            {Icon && <Icon className="text-blue-600 w-4 h-4 cursor-pointer" />}
            {
                link ? <a href={link} target="_blank" rel="noreferrer" className="text-blue-600" >{text}</a>
                    :
                    <p>{text}</p>
            }
        </div>
    )
}

export default IconWithtext;
