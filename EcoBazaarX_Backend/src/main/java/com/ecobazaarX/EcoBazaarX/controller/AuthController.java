package com.ecobazaarX.EcoBazaarX.controller;

import com.ecobazaarX.EcoBazaarX.model.Seller;
import com.ecobazaarX.EcoBazaarX.model.User;
import com.ecobazaarX.EcoBazaarX.repository.SellerRepository;
import com.ecobazaarX.EcoBazaarX.repository.UserRepository;
import com.ecobazaarX.EcoBazaarX.security.JwtUtil;
import com.ecobazaarX.EcoBazaarX.service.SellerService;
import com.ecobazaarX.EcoBazaarX.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService; // expects it to hash and save

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SellerService sellerService;

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Hardcoded admin credentials (read from properties)
    @Value("${ecobazaarx.admin.email:admin@ecobazaarx.com}")
    private String adminEmail;

    @Value("${ecobazaarx.admin.password:Admin@123}")
    private String adminPassword;


    // --------- USER (BUYER) endpoints ---------
    @PostMapping("/signup/user")
    public ResponseEntity<?> signupUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));
        }
        // ensure role set
        user.setRole("BUYER");
        User saved = userService.addUser(user);
        saved.setPassword(null);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login/user")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "User not found"));
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        String token = jwtUtil.generateToken(user.getEmail(), "BUYER");
        return ResponseEntity.ok(Map.of(
                "token", token,
                "role", "BUYER",
                "email", user.getEmail(),
                "id", user.getUserId()
        ));
    }

    // --------- SELLER endpoints ---------
    @PostMapping("/signup/seller")
    public ResponseEntity<?> signupSeller(@RequestBody Seller seller) {
        if (sellerRepository.existsByEmail(seller.getEmail())) {

            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));
        }
        Seller saved = sellerService.register(seller);
        saved.setPassword(null);
        seller.setRole("SELLER");
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login/seller")
    public ResponseEntity<?> loginSeller(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        Optional<Seller> sellerOpt = sellerRepository.findByEmail(email);
        if (sellerOpt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "Seller not found"));
        }

        Seller seller = sellerOpt.get();
        if (!passwordEncoder.matches(password, seller.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        String token = jwtUtil.generateToken(seller.getEmail(), "SELLER");

        // --- THE ONLY CHANGE IS HERE ---
        // We now include the seller's status in the response.
        return ResponseEntity.ok(Map.of(
                "token", token,
                "role", "SELLER",
                "email", seller.getEmail(),
                "id", seller.getSellerId(),
                "status", seller.getStatus() // Add this line
        ));
    }

    // --------- ADMIN login (hardcoded) ---------
    @PostMapping("/login/admin")
    public ResponseEntity<?> loginAdmin(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        if (adminEmail.equals(email) && adminPassword.equals(password)) {
            String token = jwtUtil.generateToken(email, "ADMIN");
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "role", "ADMIN",
                    "email", email,
                    "id", "ADMIN"
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid admin credentials"));
        }
    }
}
