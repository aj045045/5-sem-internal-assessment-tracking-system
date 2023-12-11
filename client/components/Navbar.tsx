import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
 const handleLogout = () => {
        fetch('/api/user/logout')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.redirect === "home") {
                    router.replace('/');
                }
            })
            .catch((error) => {
                console.error("Error fetching faculty data:", error);
            });
    }; 
  return (
    <nav className="bg-orange-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 flex-grow">
          <Link href="/">
            <div className="text-white cursor-pointer transition duration-300 hover:bg-orange-200 hover:text-gray-800 px-4 py-2 rounded-md">Home</div>
          </Link>
          <Link href="/about">
            <div className="text-white cursor-pointer transition duration-300 hover:bg-orange-200 hover:text-gray-800 px-4 py-2 rounded-md">Subject</div>
          </Link>
          <Link href="/about">
            <div className="text-white cursor-pointer transition duration-300 hover:bg-orange-200 hover:text-gray-800 px-4 py-2 rounded-md">Assignment</div>
          </Link>
          <Link href="/about">
            <div className="text-white cursor-pointer transition duration-300 hover:bg-orange-200 hover:text-gray-800 px-4 py-2 rounded-md">Assessment</div>
          </Link>
          <Link href="/about">
            <div className="text-white cursor-pointer transition duration-300 hover:bg-orange-200 hover:text-gray-800 px-4 py-2 rounded-md"> Papers</div>
          </Link>
          {/* Add more links as needed */}
        </div>
        <div className="flex items-center">
          {/* Add your profile picture here */}
          <Image
            unoptimized={true}
            width={0}
            height={0}
            src="https://placekitten.com/32/32" // Replace with the actual URL of your profile picture
            alt="Profile"
            className="rounded-full h-8 w-8 mr-2"
          />
          {/* Add your login button or link here */}
          <button className="text-white" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
