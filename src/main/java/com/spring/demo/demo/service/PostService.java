package com.spring.demo.demo.service;

import com.spring.demo.demo.entity.Post;

import java.util.List;

public interface PostService {

    List<Post> findAll();

    Post findById(int postId);

    void save(Post thePost);

    void deleteById(int theId);

}
