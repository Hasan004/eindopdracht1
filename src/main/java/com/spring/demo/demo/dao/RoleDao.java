package com.spring.demo.demo.dao;


import com.spring.demo.demo.entity.Role;
import com.spring.demo.demo.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleDao extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}