import { Users } from 'lucide-react'
import Image from 'next/image'

const team = [
    {
        name: 'Jane Doe',
        role: 'Founder & Editor-in-Chief',
        imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    {
        name: 'John Smith',
        role: 'Lead Writer',
        imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    },
    {
        name: 'Samuel Green',
        role: 'Technology Editor',
        imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    },
];

export default function AboutPage() {
    return (
        <div className="bg-white font-sans">
            {/* Hero Section */}
            <div className="bg-gray-900 text-white">
                <div className="container mx-auto px-6 py-24 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">About Appnity Blog</h1>
                    <p className="text-xl text-gray-400 mt-4 max-w-3xl mx-auto">Your go-to source for the latest in web development, design, and technology.</p>
                </div>
            </div>

            {/* Our Mission */}
            <div className="py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            At Appnity, we believe in the power of shared knowledge. Our mission is to create a community where developers, designers, and tech enthusiasts can learn, grow, and stay inspired. We are committed to providing high-quality content that is both informative and engaging, helping our readers to stay at the forefront of the ever-evolving world of technology.
                        </p>
                    </div>
                </div>
            </div>

            {/* Meet the Team */}
            <div className="bg-gray-100 py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <Users className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                        <h2 className="text-4xl font-bold text-gray-900">Meet the Team</h2>
                        <p className="text-lg text-gray-600 mt-4">The passionate individuals behind the content.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {team.map((member) => (
                            <div key={member.name} className="text-center">
                                <Image width={128} height={128} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg" src={member.imageUrl} alt={member.name} />
                                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                <p className="text-gray-600">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
