import { useState, useEffect } from 'react';
import FriendListTemplate from '../components/friend/templates/FriendListTemplate';
import { authInstance } from '../api/api';
/* {
	"friendList": [
		{
			"email": String, // 사용자 정보 email
			"nickname": String // 사용자 닉네임
			"profileImage": String // 사용자 프로필
		}, ...
	]
} */

export interface FriendType {
  email: string;
  nickname: string;
  profileImage: string;
  isFollowing?: number;
}

export interface FriendListType {
  friendList: FriendType[];
}

const fakeDortmundPlayers: FriendListType = {
  friendList: [
    {
      email: 'player1@example.com',
      nickname: 'JULIAN BRANDT',
      profileImage:
        'data:image/jpeg;base64,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',
      isFollowing: 1,
    },
    {
      email: 'player2@example.com',
      nickname: 'Marco Reus',
      profileImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR06zq8I_ECg4cSxlvv78oiik8JD0-7A8OQgw&usqp=CAU',
      isFollowing: 1,
    },
    {
      email: 'player3@example.com',
      nickname: 'Jadon Sancho',
      profileImage: 'https://media-public.canva.com/MADoOCJzJww/1/screen-01.jpg',
      isFollowing: 1,
    },
    {
      email: 'player4@example.com',
      nickname: 'Mats Hummels',
      profileImage: 'https://media-public.canva.com/MADoOIs9wgg/1/screen-01.jpg',
      isFollowing: 1,
    },
    {
      email: 'player5@example.com',
      nickname: 'Giovanni Reyna',
      profileImage: 'https://media-public.canva.com/MADoOJgKNso/1/screen-01.jpg',
      isFollowing: 0,
    },
  ],
};

const FriendListPage = () => {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<FriendListType[] | null>(null);

  useEffect(() => {
    // 진입시 친구 처음 조회 api 날리기
    const formData = new FormData();
    const nickname = sessionStorage.getItem('nickname');

    console.log(nickname);
    formData.append('nickname', nickname);

    const fetchData = async () => {
      try {
        // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
        const axiosInstance = authInstance({ ContentType: 'application/json' });
        const response = await axiosInstance.post('/definrs/follow', { nickname });

        return response.data;
      } catch (error) {
        console.log(error);
        throw new Error('나의 친구 목록 데이터 조회 실패');
      }
    };

    fetchData().then(res => {
      console.log(res);
      console.log(data);
      setData(res.friendsList);
      console.log('친구 데이터', res.friendsList);
    });
  }, []);

  useEffect(() => {
    // api 날리기
  }, [search]);

  return (
    <div>
      <div>친구목록 페이지</div>
      {data === null ? (
        <div className="text-center">친구가 없어요. 친구를 검색해서 추가해보세요</div>
      ) : (
        <FriendListTemplate friendList={fakeDortmundPlayers.friendList} setValue={setSearch} />
      )}
    </div>
  );
};

export default FriendListPage;
