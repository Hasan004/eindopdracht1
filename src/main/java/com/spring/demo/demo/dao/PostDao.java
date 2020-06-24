package com.spring.demo.demo.dao;

import com.spring.demo.demo.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Repository
public interface PostDao extends JpaRepository<Post, Integer> {

}
