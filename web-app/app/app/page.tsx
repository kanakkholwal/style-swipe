import { Frame, PieChart } from "lucide-react";
import Link from "next/link";


const user = {
    name: "John Doe",
    email: "johndoe@acme.com",
}

const routes: Route[] = [
    {
        title: "Explore Feed",
        description: "Discover the latest trends and styles.",
        path: "/app/feed",
        icon: <Frame className="size-20" />,
    },
    {
        title: "Ask your outfit",
        description: "Get expert advice on your outfit choices.",
        path: "/app/ask-outfit",
        icon: <PieChart className="size-20" />,
    },
]

export default function Page() {

    return <div className="pt-6 @container">
        <h2 className="text-2xl font-bold mb-4">
            {user ? `Welcome, ${user.name.split(" ")[0]}` : `Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}`}
        </h2>
        <p className="text-gray-600 mb-8">
            Explore the latest trends and styles, curated just for you.
        </p>
        <div className="grid gap-8 @lg:grid-cols-3 @xl:grid-cols-4 @3xl:grid-cols-5">
            {routes.map((route) => (
                <RouteCard key={route.path} route={route} />
            ))}
        </div>
    </div>
}
interface Route {
    title: string;
    description: string;
    path: string;
    icon: React.ReactNode;
}

function RouteCard({ route }: { route: Route }) {

    return <Link href={route.path} className="text-center bg-white/30 backdrop-blur-lg p-8 rounded-xl border hover:shadow-lg">
        <div className="mx-auto size-28 mb-4">
            {route.icon}
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">{route.title}</h3>
        <p className="text-gray-700">{route.description}</p>
    </Link>
}