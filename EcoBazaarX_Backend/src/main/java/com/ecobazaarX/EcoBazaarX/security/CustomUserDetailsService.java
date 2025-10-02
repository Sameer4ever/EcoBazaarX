package com.ecobazaarX.EcoBazaarX.security;

import com.ecobazaarX.EcoBazaarX.model.Seller;
import com.ecobazaarX.EcoBazaarX.model.User;
import com.ecobazaarX.EcoBazaarX.repository.SellerRepository;
import com.ecobazaarX.EcoBazaarX.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // ✅ 1. Hardcoded Admin
        if (email.equalsIgnoreCase("admin@ecobazaarx.com")) {
            return org.springframework.security.core.userdetails.User
                    .withUsername("admin@ecobazaarx.com")
                    .password("{noop}admin123") // {noop} means no encoding for now
                    .authorities(Collections.singletonList(new SimpleGrantedAuthority("ADMIN")))
                    .build();
        }

        // ✅ 2. Look in Users collection
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            return org.springframework.security.core.userdetails.User
                    .withUsername(user.getEmail())
                    .password(user.getPassword())
                    .authorities(Collections.singletonList(new SimpleGrantedAuthority("BUYER")))
                    .build();
        }

        // ✅ 3. Look in Sellers collection
        Seller seller = sellerRepository.findByEmail(email).orElse(null);
        if (seller != null) {
            return org.springframework.security.core.userdetails.User
                    .withUsername(seller.getEmail())
                    .password(seller.getPassword())
                    .authorities(Collections.singletonList(new SimpleGrantedAuthority("SELLER")))
                    .build();
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
