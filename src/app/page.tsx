import Link from "next/link"

export default function HomePage() {

const links = [
        {label : "✅ Task 1: Simple Input Box + Button", href: "/todo1"},
        {label : "✅ Task 2: Add todos to list (screen pe show karo)", href: "/todo2"},
        {label : "✅ Task 3: Add delete button", href: "/todo3"},
        {label : "✅ Task 4: Mark done", href: "/todo4"},
        {label : "✅ Task 5: Edit", href: "/todo5"},
        {label : "✅ Task 6: LocalStorage", href: "/todo6"},
        {label : "✅ Task 7: MongoDB", href: "/todo7"},
    ]

   
  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl text-center font-bold pb-4"  >Welcome My Todo App</h1>
        <ul>
            {links.map((link, index) => (
                <li key={index}>
                    <Link href={link.href}>
                        {link.label}
                    </Link>
                </li>
            ))}
              
        </ul>

    </div>
  )
  
  












}
