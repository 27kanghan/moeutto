import React, { Dispatch, SetStateAction } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import ProfileCard from '../molecules/ProfileCard';
import { FriendType } from '../../../pages/FriendListPage';
import './style.css';

type FriendListTemplateProps = {
  seachAction: () => any;
  friendList: FriendType[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>; // PropType는 필요한 타입으로 대체해야 합니다.
};

const FriendListTemplate = ({ seachAction, friendList, value, setValue }: FriendListTemplateProps) => {
  const handleClickSearchIcon = () => {
    seachAction().then(setValue('')); // 검색하고 검색칸 비워주기
  };

  const handleSeachEnter = e => {
    if (e.key === 'Enter') {
      handleClickSearchIcon(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <div>
      <div className="relative w-[80%] mx-auto mb-8 drop-shadow-md">
        <BiSearchAlt className="absolute top-[5px] left-3 changeColor" size="30" onClick={handleClickSearchIcon} />
        <input
          type="text"
          id="search"
          placeholder="친구를 검색해보세요"
          className="border rounded-full w-full h-[40px]  py-1 ps-12 text-AppBody1 leading-[20px] align-middle"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyPress={handleSeachEnter}
        />
      </div>
      {friendList === null || friendList.length === 0 ? (
        <div className="text-center">
          {friendList?.length === 0 && value ? `"${value}"라는 ` : null}친구가 없어요 (ㅜ0ㅜ)
        </div>
      ) : (
        friendList.map((item, index) => {
          return (
            <ProfileCard
              key={index}
              nickname={item.nickname}
              email={item.email}
              profileImage={item.profileImage}
              isFollowing={item.isFollowing}
            />
          );
        })
      )}
    </div>
  );
};

export default FriendListTemplate;