package com.ecobazaarX.EcoBazaarX.service;

import com.ecobazaarX.EcoBazaarX.model.User;
import com.ecobazaarX.EcoBazaarX.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;

    /**
     * Retrieves a list of all registered users.
     * @return A list of User entities.
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Deletes a user by their ID.
     * @param userId The ID of the user to be deleted.
     */
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with id: " + userId);
        }
        userRepository.deleteById(userId);
    }
}
