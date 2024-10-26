package com.ukf.arn.Users;

import com.ukf.arn.Roles.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> login(String email, String password) {
        User userOpt = userRepository.findByEmail(email).orElse(null);

        if (userOpt == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        if (!passwordEncoder.matches(password, userOpt.getPassword())) {
            return ResponseEntity.badRequest().body("Credentials do not match");
        }

        UserDTO loggedInUser = new UserDTO(userOpt.getId(), userOpt.getName(), userOpt.getSurname(), userOpt.getEmail(), userOpt.getRegistrationDate(), userOpt.getUniversity());
        loggedInUser.setRoles(userOpt.getRoles().stream().map(Role::getRoleIdent).collect(Collectors.toList()));

        return ResponseEntity.ok().body(loggedInUser);
    }
}