package com.ukf.arn.Users;

import com.ukf.arn.Users.Objects.UpdateRequest;
import com.ukf.arn.Users.Objects.UserDetailsDto;
import com.ukf.arn.Users.Objects.UserDto;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/get-profile")
    public ResponseEntity<?> getUserData() {
        return ResponseEntity.ok(userService.getUserDetails());
    }

    @PostMapping(value = "/update-profile", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateUserData(@RequestBody UpdateRequest userDto) {
        return ResponseEntity.ok(userService.updateUserDetails(userDto));
    }

    @PostMapping(value = "/update-edit-profile", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateEditUserData(@RequestBody UpdateRequest userDto) {
        return ResponseEntity.ok(userService.updateEditUserDetails(userDto));
    }
}