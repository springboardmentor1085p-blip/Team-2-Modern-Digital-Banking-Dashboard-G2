import { useState } from "react";
import { uploadProfileImage } from "../services/userService";
import { useAuth } from "../context/AuthContext";

export default function ProfileImageUpload() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const preview = user?.profile_image
    ? `http://127.0.0.1:8000${user.profile_image}`
    : "https://ui-avatars.com/api/?name=User&background=252070&color=fff";

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const res = await uploadProfileImage(file);

      const updatedUser = {
        ...user,
        profile_image: res.profile_image,
      };

      setUser(updatedUser);
localStorage.setItem("user", JSON.stringify(updatedUser));

    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <img
          src={preview}
          alt="profile"
          className="h-24 w-24 rounded-full object-cover border-4 border-indigo-600"
        />

        <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer">
          📷
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleChange}
          />
        </label>
      </div>

      {loading && (
        <p className="text-sm text-gray-500">Uploading...</p>
      )}
    </div>
  );
}
