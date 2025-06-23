"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react" // Use `lucide-react` or replace with emoji/icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { label: "Home", href: "/" },
    { label: "TodoConsole", href: "/todo1" },
    { label: "TodoShow", href: "/todo2" },
    { label: "TodoDelete", href: "/todo3" },
    { label: "TodoMark", href: "/todo4" },
    { label: "TodoEdit", href: "/todo5" },
    { label: "TodoLocalStore", href: "/todo6" },
    { label: "TodoDBSstore", href: "/todo7" },
  ]

  return (
    <nav className="bg-gray-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-2xl font-bold">
          <Link href="/" className="hover:text-gray-300">smsali Todo</Link>
        </h1>

        {/* Mobile Toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu Links */}
        <ul className={`md:flex md:space-x-6 md:items-center ${isOpen ? "block" : "hidden"} md:block mt-3 md:mt-0`}>
          {links.map(link => (
            <li key={link.href} className="mt-2 md:mt-0">
              <Link
                href={link.href}
                className="block text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
