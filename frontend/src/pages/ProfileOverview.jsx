import { useAuth } from "../context/AuthContext";

export const ProfileOverivew = () => {
  const { user } = useAuth();
  return (
    <div className="px-4 py-3">
      <p className="text-gray-500 text-md">Ваші дані</p>
      <div className="mt-6">
        <p className="text-gray-500 text-md">Ім'я користувача</p>
        <p className="text-lg font-medium text-gray-800">{user.username}</p>
        <p className="text-gray-500 text-md mt-4">Email</p>
        <p className="text-lg font-medium text-gray-800">{user.email}</p>
      </div>
    </div>
  );
};
