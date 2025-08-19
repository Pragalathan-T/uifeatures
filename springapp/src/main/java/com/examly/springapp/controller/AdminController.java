package com.examly.springapp.controller;

import com.examly.springapp.dto.AdminDTO;
import com.examly.springapp.model.Admin;
import com.examly.springapp.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping
    public ResponseEntity<AdminDTO> createAdmin(@RequestBody AdminDTO adminDTO) {
        Admin admin = new Admin();
        admin.setUsername(adminDTO.getUsername());
        admin.setPassword(adminDTO.getPassword());
        admin.setEmail(adminDTO.getEmail());

        Admin saved = adminService.saveAdmin(admin);

        AdminDTO responseDTO = new AdminDTO(saved.getUsername(), saved.getPassword(), saved.getEmail());
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/{username}")
    public ResponseEntity<AdminDTO> getAdminByUsername(@PathVariable String username) {
        return adminService.getAdminByUsername(username)
                .map(admin -> new AdminDTO(admin.getUsername(), admin.getPassword(), admin.getEmail()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
