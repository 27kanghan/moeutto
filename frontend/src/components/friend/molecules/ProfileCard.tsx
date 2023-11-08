import { FriendType } from '../../../pages/FriendListPage';

const ProfileCard = ({ nickname, email, profileImage }: FriendType) => {
  return (
    <ul>
      <li className="py-3 sm:py-4 sm:px-3 border rounded-md m-3">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full object-cover" src={profileImage} alt="image" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{nickname}</p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">{email}</p>
          </div>
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Light
          </button>
        </div>
      </li>
    </ul>
  );
};

export default ProfileCard;