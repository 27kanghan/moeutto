// done
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// axios

import { authInstance } from '../api/api';
// redux
import { RootState } from '../redux/store';
import PickComponent from '../components/common/category/organisms/PickComponent';
// components
import Scroll from '../components/common/scroll/molecules/Scroll';
import GuestbookTemplate from '../components/guestbook/templates/GuestbookTemplate';

export interface ClothesItem {
  id: number; // 옷 등록 id
  middleCategoryId: string; // 중분류 카테고리 id
  largeCategoryId: string; // 대분류 카테고리 id
  color: string; // 색상
  frequency: number; // 빈도
  star: number; // 즐겨찾기 여부
  imageUrl: string; // 이미지
  regDate: string; // 등록 날짜 (DateTime 타입으로 변경 가능)
}

export type GuestbookTextType = string;

export interface GuestBookListType {
  nickname: string;
  post: GuestbookTextType;
  regDate: string;
}

const FriendClosetPage = () => {
  const navigate = useNavigate();

  const goMainPage = () => {
    navigate('/main');
  };

  const [guestbookText, setGuestbookText] = useState<GuestbookTextType>(''); // 방명록 인풋 값
  const [guestbookAll, setGuestbookAll] = useState<GuestBookListType[]>([]); // 방명록 전체 조회

  // 카테고리
  // 대분류
  const [selectedOptionMain, setSelectedOptionMain] = useState<string | null>('전체');
  // 중분류
  const [selectedOptionMiddle, setSelectedOptionMiddle] = useState<string | null>('000000');
  // 정렬순
  const [selectedOptionSort, setSelectedOptionSort] = useState<string | null>(null);

  // 데이터 가져오기
  const [categoryId, setCategoryId] = useState<string>('000000');
  const [sortBy, setSortBy] = useState<string>('initial');
  const [orderBy, setOrderBy] = useState<number>(0); // 0: 오름차순, 1: 내림차순

  // 카테고리 선택 확인
  useEffect(() => {
    // 대분류
    if (selectedOptionMain === '전체') {
      setCategoryId('000000');
      setSortBy('initial');
      setOrderBy(0);
      setSelectedOptionMiddle('');
    } else if (selectedOptionMain === '상의') {
      setCategoryId('001000');
      // 중분류
      if (selectedOptionMiddle === '맨투맨') {
        setCategoryId('001005');
      } else if (selectedOptionMiddle === '후드') {
        setCategoryId('001004');
      } else if (selectedOptionMiddle === '반팔') {
        setCategoryId('001001');
      } else {
        setSelectedOptionMiddle('');
      }
    } else if (selectedOptionMain === '하의') {
      setCategoryId('003000');
      // 중분류
      if (selectedOptionMiddle === '청바지') {
        setCategoryId('003002');
      } else if (selectedOptionMiddle === '반바지') {
        setCategoryId('003009');
      } else if (selectedOptionMiddle === '카고팬츠') {
        setCategoryId('003004');
      } else {
        setSelectedOptionMiddle('');
      }
    } else if (selectedOptionMain === '아우터') {
      setCategoryId('002000');
      // 중분류
      if (selectedOptionMiddle === '패딩') {
        setCategoryId('002012');
      } else if (selectedOptionMiddle === '코트') {
        setCategoryId('002007');
      } else if (selectedOptionMiddle === '자켓') {
        setCategoryId('002004');
      } else {
        setSelectedOptionMiddle('');
      }
    } else if (selectedOptionMain === '아이템') {
      setCategoryId('011000');
      // 중분류
      if (selectedOptionMiddle === '귀마개') {
        setCategoryId('011006');
      } else if (selectedOptionMiddle === '장갑') {
        setCategoryId('011011');
      } else if (selectedOptionMiddle === '목도리') {
        setCategoryId('011010');
      } else {
        setSelectedOptionMiddle('');
      }
    }

    if (selectedOptionSort === '정렬') {
      setSortBy('initial');
    } else if (selectedOptionSort === '등록순') {
      setSortBy('regDate');
    } else if (selectedOptionSort === '많이 입은 순') {
      setSortBy('frequency');
      setOrderBy(1);
    } else if (selectedOptionSort === '적게 입은 순') {
      setSortBy('frequency');
    } else {
      setSortBy('color');
    }
  }, [selectedOptionMain, selectedOptionMiddle, selectedOptionSort]);

  // 선택한 옷 리스트
  const selectedClosetIds = useSelector((state: RootState) => state.closet.selectedClosetIds);

  // 옷 목록 조회
  const [clothesData, setClothesData] = useState<ClothesItem[]>([]);

  const pathname = window.location.pathname; // url에서 path 가져와서
  const friend = pathname.split('/')[3]; // path에서 email 가져오기

  const fetchData = async () => {
    try {
      // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.post('/clothes/list/friend-all', {
        email: friend, // 친구 email
      });

      if (response.data.code === 3020) {
        Swal.fire({
          icon: 'error',
          html: '친구 옷장이 공개되어 있지 않습니다.',
          showCancelButton: false,
          confirmButtonText: '확인',
          confirmButtonColor: '#FF78A5'
        });
        goMainPage();
      }

      if (response.data.data) {
        // setClothesData(response.data.data.clothesListResponseDto);
        setGuestbookAll(response.data.data.guestBookListResponseDto);
      } else {
        // setClothesData([]);
        setGuestbookAll([]);
      }
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        html: '친구 옷 목록 데이터 조회 실패 토큰을 확인하세요',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: '#FF78A5'
      });
      return false;
    }
  };

  const getClothesItem = async () => {
    try {
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.post('clothes/list/friend', {
        email: friend,
        categoryId,
        sortBy,
        orderBy,
      });

      if (response.data.code === 3020) {
        Swal.fire({
          icon: 'error',
          html: '친구 옷장이 공개되어 있지 않습니다.',
          showCancelButton: false,
          confirmButtonText: '확인',
          confirmButtonColor: '#FF78A5'
        });
        goMainPage();
      }

      if (response.data.data) {
        setClothesData(response.data.data);
      } else {
        setClothesData([]);
      }
    } catch (error) {
      console.log('친구 옷 조회 실패', error);
    }
  };

  useEffect(() => {
    fetchData();
    getClothesItem();
  }, [categoryId, sortBy, orderBy]);

  

  // 추천 멘트
  const [forFriendComment, setForFriendComment] = useState<string>("");

  // 추천 옷 리스트
  const forFriendClothesIdList: number[] = [];

  // 추천 등록 api
  const postRecommendForFriend = async (getComment) => {
    try {
      const axiosInstance = authInstance({ ContentType: 'application/json'});
      const response = await axiosInstance.post('friend-outfits/recommend', {
        email: friend,
        comment: getComment,
        clothesList: forFriendClothesIdList
      });

      console.log('친구 추천 등록 성공', response)
    }
    catch (error) {
      console.log('친구 추천 등록 실패', error)
    }
  }

  // 옷 추천하기 동작입니다
  // 제출하기 버튼 동작 시 -> 리덕스에 선택한 옷 정보 저장 후 옷 추천 정보를 api body에 담습니다
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = event => {
    // 기본 동작 방지
    event.preventDefault();
    // redux에 저장할 데이터
    const requestData = {
      selectedClosetIds,
    };

    // body에 담을 옷 id 만 가져오기
    for (const closetObj of requestData.selectedClosetIds) {
      const id = Number(closetObj.id);

      if (!isNaN(id)) {
        forFriendClothesIdList.push(id);
      }
    }

    if (requestData) {
      if (requestData.selectedClosetIds.length >= 5) {
        Swal.fire({
          icon: 'question',
          html: '옷 추천은 4개까지 가능해요',
          showCancelButton: false,
          confirmButtonText: '확인',
          confirmButtonColor: '#FF78A5',
        })
      } else {
        (async () => {
          const { value: getComment } = await Swal.fire({
              title: '추천 문구를 입력하세요',
              input: 'text',
              inputValidator: (value) => {
                if (!value || value.length > 20) {
                  return '20자 이내로 입력해주세요.';
                } else {
                  return undefined; // 20자를 통과한 경우
                }
              },
              confirmButtonColor: '#FF78A5',
              confirmButtonText: '확인'
          })

          console.log('코멘트 뭐라고 썻을가', getComment)
          setForFriendComment(getComment)
      
          // 이후 처리되는 내용
          if (getComment) {
            Swal.fire({
              html: '옷 추천이 완료되었습니다',
              showCancelButton: false,
              confirmButtonColor: '#FF78A5',
              confirmButtonText: '확인',
            }).then(() => {
              // 친구 추천 api 호출하기
              console.log('코멘트 들어갔을가..', forFriendComment, getComment)
              postRecommendForFriend(getComment);
            }).then(() => {
              location.reload();
            })
          }

          
      })()
      }
    } else {
      Swal.fire({
        icon: 'question',
        html: '선택한 옷이 없어요',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: '#FF78A5'
      });
    }
    console.log(forFriendComment, forFriendClothesIdList)
  };

  useEffect(() => {
    // 페이지 처음 들어오면 방명록 데이터를 다 지워야합니다. 안 그러면 처음 입장할 때 다른 친구의 방명록이 계속 보입니다.
    setGuestbookAll([]);
  }, []);

  const handleGuestbookPost = async () => {
    const postData = async () => {
      try {
        // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
        const axiosInstance = authInstance({ ContentType: 'application/json' });
        const response = await axiosInstance.post('/guestbooks', {
          ownerEmail: friend, // 친구 email
          post: guestbookText,
        });

        if (response.data) {
          return response.data.data;
        } else {
          setClothesData([]);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          html: '게스트북 작성 실패',
          showCancelButton: false,
          confirmButtonText: '확인',
          confirmButtonColor: '#FF78A5'
        });
        return false;
      }
      return true;
    };

    postData().then(() => {
      Swal.fire({
        icon: 'success',
        html: '방명록이 작성되었습니다',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: '#FF78A5'
      });
      setGuestbookText(''); // 방명록을 작성하였으므로 인풋값을 비워줍니다.
      fetchData();
    });
  };

  return (
    <>
      <GuestbookTemplate
        value={guestbookText}
        posts={guestbookAll}
        setValue={setGuestbookText}
        onClick={handleGuestbookPost}
      />
      <PickComponent
        selectedOptionMain={selectedOptionMain}
        setSelectedOptionMain={setSelectedOptionMain}
        selectedOptionMiddle={selectedOptionMiddle}
        setSelectedOptionMiddle={setSelectedOptionMiddle}
        selectedOptionSort={selectedOptionSort}
        setSelectedOptionSort={setSelectedOptionSort}
        handleSubmit={handleSubmit}
        clothesData={clothesData}
      />
      <div className="fixed bottom-1/3 right-0 me-[5vw]">
        <Scroll />
      </div>
    </>
  );
};

export default FriendClosetPage;
