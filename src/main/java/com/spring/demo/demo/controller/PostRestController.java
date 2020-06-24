package com.spring.demo.demo.controller;

import com.spring.demo.demo.entity.Post;
import com.spring.demo.demo.entity.User;
import com.spring.demo.demo.security.CurrentUser;
import com.spring.demo.demo.service.PostService;
import com.spring.demo.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostRestController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    public PostRestController(PostService thePostService){
        postService = thePostService;
    }

    @GetMapping("/all")
    public List<Post> findAll(){
        return postService.findAll();
    }

    @GetMapping("/update/{postId}")
    public Post showFormForUpdate(@PathVariable int postId){
        Post post = postService.findById(postId);
        return post;
    }

//    @PutMapping("/updateSub")
//    public Post updatePost(@RequestBody Post post){
//        postService.save(post);
//        return post;
//    }

    @PostMapping("/add")
    public Post addPost(@RequestBody Post thePost){
        postService.save(thePost);
        return thePost;
    }

    @DeleteMapping("/delete/{postId}")
    public String deletePost(@PathVariable int postId){
        Post thePost = postService.findById(postId);
        if (thePost == null){
            throw new RuntimeException("post id not found");
        }

        postService.deleteById(postId);
        return "post deleted"+ postId;
    }

    @GetMapping("/users")
    public List<User> findAllUsers(){
        return userService.findAllUsers();
    }



}
