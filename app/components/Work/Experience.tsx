import Image from 'next/image'
import { StaticImageData } from 'next/image'

interface experienceProps {
    company: string
    position: string
    dates: string
    image: StaticImageData
}

export default function Experience({
    company,
    position,
    dates,
    image,
}: experienceProps) {
    var borderStyle = company === 'Kite' ? 'y' : 't'
    return (
        <div
            className={`relative flex justify-between items-center h-fit p-24 border-${borderStyle} border-white`}
        >
            <div className="relative w-[25%]">
                <Image
                    className="aspect-square rounded-full object-cover"
                    src={image}
                    alt=""
                />
            </div>
            <div className="flex flex-col gap-12 w-3/5">
                <h4 className="text-4xl font-thin text-white/70">{dates}</h4>
                <h1 className="text-7xl font-thin">{company}</h1>
                <h2 className="text-5xl font-thin">{position}</h2>
            </div>
        </div>
    )
}
