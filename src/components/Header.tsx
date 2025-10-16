import Link from 'next/link'
import { Home, Info } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" />
              </svg>
              <span className="text-2xl font-bold text-gray-900">Appnity Blog</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Home className="w-5 h-5 mr-2"/>
                <span>Home</span>
              </div>
            </Link>
            <Link href="/about">
              <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Info className="w-5 h-5 mr-2"/>
                <span>About</span>
              </div>
            </Link>
          </nav>
          <div className="md:hidden">
            {/* Mobile menu button */}
          </div>
        </div>
      </div>
    </header>
  )
}
