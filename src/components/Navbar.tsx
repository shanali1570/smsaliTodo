import Link from "next/link";

export default function Navbar() {
    
    const links = [
        {label : "Home", href: "/"},
        {label : "TodoConsole", href: "/todo1"},
        {label : "TodoShow", href: "/todo2"},
        {label : "TodoDelete", href: "/todo3"},
        {label : "TodoMark", href: "/todo4"},
        {label : "TodoEdit", href: "/todo5"},
        {label : "TodoLocalStore", href: "/todo6"},
        {label : "TodoDBSstore", href: "/todo7"},
    ]

    return (
        
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div>
                <h1 className="text-white font-bold text-4xl">
                    <Link href="/" className="hover:text-gray-300 transition-colors duration-200">
                    smsali Todo
                    </Link>
                
                </h1>
            </div>
            <ul className="flex space-x-4">
                {
                    links.map((link) => (
                        <li key={link.href} className="text-white hover:text-gray-300 text-sm font-medium transition-colors duration-200">
                            <Link href={link.href} >
                                {link.label}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}