package com.spring.demo.demo.service;

import com.spring.demo.demo.dao.UserDao;
import com.spring.demo.demo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserDao theUserDao){
        userDao = theUserDao;
    }

    @Override
    public User saveUser(final User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userDao.save(user);
    }

    @Override
    public User updateUser(final User user){
        return userDao.save(user);
    }

    @Override
    public User findByUsername(final String username){
        return userDao.findByUsername(username).orElse(null);
    }

    @Override
    public List<User> findAllUsers() {
        return userDao.findAll();
    }

    @Override
    public User findById(int theId) {
        Optional<User> result = userDao.findById(theId);

        User theUser = null;
        if(result.isPresent()){
            theUser = result.get();
        }else {
            throw new RuntimeException("did not find user id " + theId);
        }
        return theUser;
    }

    @Override
    public Long numberOfUsers(){
        return userDao.count();
    }

    @Override
    public void save(User theUser) {
        userDao.save(theUser);
    }

    @Override
    public void deleteById(int theId) {
        userDao.deleteById(theId);
    }

}
