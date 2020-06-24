package com.spring.demo.demo.service;

import com.spring.demo.demo.dao.PostDao;
import com.spring.demo.demo.entity.Post;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService{

    private PostDao postDao;

    public PostServiceImpl(PostDao thePostDao){
        postDao = thePostDao;
    }

    @Override
    public List<Post> findAll() {
        return postDao.findAll();
    }

    @Override
    public Post findById(int postId) {
        Optional<Post> result = postDao.findById(postId);

        Post thePost = null;
        if (result.isPresent()){
            thePost = result.get();
        } else {
            throw new RuntimeException("did not find employee id - " + postId);
        }

        return thePost;
    }

    @Override
    public void save(Post thePost) {
        postDao.save(thePost);
    }

    @Override
    public void deleteById(int theId) {
        postDao.deleteById(theId);
    }
}
