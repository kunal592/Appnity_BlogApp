export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Appnity Blog</h2>
            <p className="text-gray-400 max-w-sm">A modern blog for the modern developer.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul>
                <li className="mb-2"><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-400 transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul>
                <li className="mb-2"><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul>
                <li className="mb-2"><a href="#" className="hover:text-blue-400 transition-colors">Twitter</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-400 transition-colors">GitHub</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; 2024 Appnity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
