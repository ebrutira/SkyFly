package com.comp301project.SkyFly.Service;

import com.comp301project.SkyFly.DTO.UserDTO;
import com.comp301project.SkyFly.Exception.UserNotFoundException;
import com.comp301project.SkyFly.Model.User;
import com.comp301project.SkyFly.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public UserDTO updateProfile(String email, UserDTO userDTO) {
        log.info("Updating profile for user with email: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        if (userDTO.getFirstName() != null) {
            user.setFirstName(userDTO.getFirstName());
        }
        if (userDTO.getLastName() != null) {
            user.setLastName(userDTO.getLastName());
        }
        if (userDTO.getPhoneNumber() != null) {
            user.setPhoneNumber(userDTO.getPhoneNumber());
        }

        user = userRepository.save(user);
        log.info("Profile updated successfully for user: {}", email);

        return modelMapper.map(user, UserDTO.class);
    }
}