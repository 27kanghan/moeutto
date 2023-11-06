package com.ssafy.moeutto.domain.friends.repository;

import com.ssafy.moeutto.domain.friends.entity.Follower;
import com.ssafy.moeutto.domain.friends.entity.FollowerId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowerRepository extends JpaRepository<Follower, FollowerId> {
}
