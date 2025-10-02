package com.ecobazaarX.EcoBazaarX.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key secretKey;
    private final long expirationTime;

    public JwtUtil(@Value("${jwt.secret}") String secret,
                   @Value("${jwt.expiration}") long expirationTime) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
        this.expirationTime = expirationTime;
    }

    // ✅ Generate token with role
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    // ✅ Extract email
    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    // ✅ Extract role
    public String extractRole(String token) {
        return (String) extractClaims(token).get("role");
    }

    // ✅ Validate token with email only
    public boolean validateToken(String token, String email) {
        return extractEmail(token).equals(email) && !isExpired(token);
    }

    // ✅ Validate token with email + role
    public boolean validateToken(String token, String email, String role) {
        return extractEmail(token).equals(email)
                && extractRole(token).equals(role)
                && !isExpired(token);
    }

    private boolean isExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
