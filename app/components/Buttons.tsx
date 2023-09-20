export function SlideButton({ buttonText }: { buttonText: string }) {
    return (
        <div className="w-full h-24 flex items-center justify-center">
            <a
                href="https://github.com/ry-nl"
                className="relative inline-flex justify-center items-center py-6 px-12 overflow-hidden transition duration-300 ease-out border border-black/30 rounded-full shadow-md group"
            >
                <span className="absolute -inset-x-[1px] flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-dark rounded-full group-hover:translate-x-[1px] ease">
                    →
                </span>
                <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">
                    {buttonText}
                </span>
                <span className="relative invisible">{buttonText}</span>
            </a>
        </div>
    )
}
