package com.examly.springapp.service;

import com.examly.springapp.model.Admin;
import com.examly.springapp.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

@Autowired
private AdminRepository adminRepository;

public Optional<Admin> getAdminByUsername(String username) {
return adminRepository.findByUsername(username);
}

public Admin saveAdmin(Admin admin) {
return adminRepository.save(admin);
}
}
