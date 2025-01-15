package com.comp301project.SkyFly.Repository;

import com.comp301project.SkyFly.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Email ile kullanıcı bulma
    Optional<User> findByEmail(String email);

    // Email kontrolü
    boolean existsByEmail(String email);

    // Telefon numarası ile kullanıcı bulma
    Optional<User> findByPhoneNumber(String phoneNumber);
}