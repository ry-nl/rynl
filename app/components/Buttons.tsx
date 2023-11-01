export function SlideButtonLightRight({
    buttonText,
    link,
    popupText,
}: {
    buttonText: string
    link: string
    popupText: string
}) {
    return (
        <div className="w-full h-24 flex items-center justify-center">
            <a
                href={link}
                target="_blank"
                className="relative inline-flex justify-center items-center py-6 px-12 overflow-hidden transition duration-300 ease-out border border-black/30 rounded-full shadow-md group"
            >
                <span className="absolute -inset-x-[1px] flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-dark rounded-full group-hover:translate-x-[1px] ease">
                    {popupText}
                </span>
                <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 bg-white text-black/65 transform group-hover:translate-x-full ease">
                    {buttonText}
                </span>
                <span className="relative invisible">{buttonText}</span>
            </a>
        </div>
    )
}

export function SlideButtonDarkUp({
    buttonText,
    link,
    popupText,
}: {
    buttonText: string
    link: string
    popupText: string
}) {
    return (
        <div className="w-full h-24 flex items-center justify-center">
            <a
                href={link}
                target="_blank"
                className="relative inline-flex justify-center items-center py-4 px-12 overflow-hidden transition duration-300 ease-out border border-white/30 rounded-full shadow-md group"
            >
                <span className="absolute -inset-y-[0px] flex items-center justify-center w-full h-full text-black duration-300 translate-y-full bg-white rounded-full group-hover:-translate-y-[0px] ease">
                    {popupText}
                </span>
                <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:-translate-y-full ease">
                    {buttonText}
                </span>
                <span className="relative invisible">{buttonText}</span>
            </a>
        </div>
    )
}
