

const user = {
    name: "John Doe",
    email: "johndoe@acme.com",
}


export default function Page() {

    return <div className="pt-6 @container">
        <h2 className="text-2xl font-bold mb-4">
            {user ? `Welcome, ${user.name.split(" ")[0]}` : `Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}`}
        </h2>
        <p className="text-gray-600 mb-8">
            Explore the latest trends and styles, curated just for you.
        </p>

    </div>
}
