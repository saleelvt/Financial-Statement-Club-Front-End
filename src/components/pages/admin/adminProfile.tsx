import { useState } from "react";
import { FiEdit } from "react-icons/fi";

const AdminProfilePage = () => {
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
 
  return ( 
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-lg text-center">
        {/* Avatar Section */}
        <div className="relative w-28 h-28 mx-auto mb-4">
          <label className="cursor-pointer absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full">
            <FiEdit size={16} />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </label>
          <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500">Upload</span>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <h2 className="text-2xl font-semibold text-gray-900">FinancialClub</h2>
        <p className="text-gray-500 mb-4">Admin | Finance Sector</p>

        <div className="bg-gray-200 p-4 rounded-lg text-left">
          <div className="mb-2">
            <span className="text-gray-600 font-medium">Email:</span>
            <p className="text-gray-800">techno12.ab@outlook.com
            </p>
          </div>

          <div className="mb-2">
            <span className="text-gray-600 font-medium">Location:</span>
            <p className="text-gray-800">Saudi Arabia, Madina</p>
          </div>

          <div className="mb-2">
            <span className="text-gray-600 font-medium">Role:</span>
            <p className="text-gray-800">Admin</p>
          </div>
        </div>

        <button className="mt-4 bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-900 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default AdminProfilePage;
