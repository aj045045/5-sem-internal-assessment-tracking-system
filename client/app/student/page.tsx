import Head from 'next/head';
import Image from 'next/image';
const Profile = () => {
  const profileData = {
    name: 'Ansh Yadav',
    profileImage: 'https://source.unsplash.com/160x160/?portrait',
    email: 'ansh@gmail.com',
    rollno: '35',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>{profileData && profileData.name} Profile</title>
      </Head>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl mt-16">
        <div className="flex items-center justify-center mb-6">
          <Image
            width={0}
            height={0}
          unoptimized={true}
            src={profileData.profileImage}
            alt={`${profileData.name}'s Profile`}
            className="w-32 h-32 rounded-full"
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-1">{profileData.name}</h1>
        <p className="text-gray-600 text-center mb-1">{profileData.email}</p>
        <p className="text-gray-600 text-center mb-1">{profileData.rollno}</p>

      </div>
    </div>
  );
};

export default Profile;
