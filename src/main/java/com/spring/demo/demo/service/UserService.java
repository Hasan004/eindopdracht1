package com.spring.demo.demo.service;

import com.spring.demo.demo.entity.User;

import java.util.List;

public interface UserService {

    List<User> findAllUsers();

    User findById(int theId);

    void save(User theUser);

    void deleteById(int theId);

    Long numberOfUsers();

    User findByUsername(String username);

    User saveUser(User user);

    User updateUser(User user);

}
