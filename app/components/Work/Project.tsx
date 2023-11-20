import Image from 'next/image'
import { StaticImageData } from 'next/image'

interface projectProps {
    order: number
    name: string
    company: string
    position: string
    tools: string[]
    description: string
    accomplishments: string[]
    image: StaticImageData
}

export default function Project({
    order,
    name,
    company,
    position,
    tools,
    description,
    accomplishments,
    image,
}: projectProps) {
    return (
        <div className="relative flex justify-between w-screen h-screen p-12 border-t">
            <div className="flex flex-col gap-6 w-1/2">
                <h1 className="text-8xl font-thin">
                    {order}. {name}
                </h1>
                <h2 className="text-4xl font-thin text-white/70">
                    {company} • {position}
                </h2>
                <div className="flex gap-4 items-end pt-4 font-thin">
                    <h2 className="text-4xl">Description</h2>
                    <h4 className="text-xl tracking-wide text-white/70">
                        [
                        {tools.map((tool, index) =>
                            index < tools.length - 1 ? (
                                <span> {tool}, </span>
                            ) : (
                                <span>{tool} </span>
                            )
                        )}
                        ]
                    </h4>
                </div>
                <p className="text-lg font-thin tracking-wide leading-relaxed">
                    {description}
                </p>
                <h2 className="text-4xl pt-4 font-thin">
                    Features and Accomplishments
                </h2>
                <ul className="list-disc text-lg font-thin tracking-wide leading-relaxed space-y-1 pl-4">
                    {accomplishments.map((accomplishment, index) => (
                        <li key={index}>{accomplishment}</li>
                    ))}
                </ul>
            </div>
            <div className="relative w-2/5 h-full">
                <Image
                    className="w-full h-full object-cover"
                    src={image}
                    alt=""
                />
            </div>
        </div>
    )
}
