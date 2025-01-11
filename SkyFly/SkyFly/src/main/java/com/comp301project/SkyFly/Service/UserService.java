package com.comp301project.SkyFly.Service;

import com.comp301project.SkyFly.DTO.UserDTO;

public interface UserService {
    UserDTO updateProfile(String email, UserDTO userDTO);
}