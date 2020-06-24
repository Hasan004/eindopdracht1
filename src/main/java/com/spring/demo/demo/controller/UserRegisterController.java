package com.spring.demo.demo.controller;

import com.spring.demo.demo.dao.PostDao;
import com.spring.demo.demo.dao.UserDao;
import com.spring.demo.demo.entity.Post;
import com.spring.demo.demo.entity.User;
import com.spring.demo.demo.exception.ResourceNotFoundException;
import com.spring.demo.demo.payload.UserIdentityAvailability;
import com.spring.demo.demo.payload.UserProfile;
import com.spring.demo.demo.payload.UserSummary;
import com.spring.demo.demo.security.CurrentUser;
import com.spring.demo.demo.security.UserPrincipal;
import com.spring.demo.demo.service.PostService;
import com.spring.demo.demo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserRegisterController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PostDao postDao;

    @Autowired
    private PostService postService;

    private static final Logger logger = LoggerFactory.getLogger(UserRegisterController.class);

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName());
        return userSummary;
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userDao.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userDao.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userDao.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getCreatedAt());

        return userProfile;
    }

}


//    @GetMapping("/users/{username}/polls")
//    public PagedResponse<PollResponse> getPollsCreatedBy(@PathVariable(value = "username") String username,
//                                                         @CurrentUser UserPrincipal currentUser,
//                                                         @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
//                                                         @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
//        return pollService.getPollsCreatedBy(username, currentUser, page, size);
//    }
