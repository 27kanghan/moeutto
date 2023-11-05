package com.ssafy.moeutto.domain.member.repository;

import com.ssafy.moeutto.domain.friends.dto.request.FriendsListRequestDto;
import com.ssafy.moeutto.domain.friends.dto.response.FriendsListResponseDto;
import com.ssafy.moeutto.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, UUID> {

    Member findMemberByEmail(String email);

    /**
     * 사용자 수를 세는 메서드
     * @return
     */
    Long countBy();

    Member findMemberById(UUID memberId);


    /**
     * 닉네임과 내 아이디를 기반으로 친구 목록 검색.
     * 팔로우 여부 위해 my_id(memberId)필요
     * @param memberId
     * @param nickname
     * @return
     */

    @Query(value = "SELECT m.profile_image as profileImageUrl, " +
            "m.nickname as nickname, " +
            "m.email as email, " +
            "EXISTS (" +
            "SELECT 1 FROM following f1 " +
            "WHERE f1.my_id = ?1 AND f1.following_id = m.id) as isFollowing " +
            "FROM member m " +
            "WHERE m.nickname LIKE CONCAT('%', ?2, '%')", nativeQuery = true)
    List<FriendsListResponseDto> findFriendsListByNickname(UUID memberId, String nickname);


}
