package com.ecobazaarX.EcoBazaarX.service;

import com.ecobazaarX.EcoBazaarX.model.Product;
import com.ecobazaarX.EcoBazaarX.model.Seller;
import com.ecobazaarX.EcoBazaarX.model.UserStatus;
import com.ecobazaarX.EcoBazaarX.repository.ProductRepository;
import com.ecobazaarX.EcoBazaarX.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class SellerProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SellerRepository sellerRepository;

    @Value("${uploads.path}")
    private String uploadDir;

    @Transactional
    public Product addProduct(String name, BigDecimal price, Integer stock, Double carbonEmission, String description, String category, MultipartFile imageFile, String sellerEmail, Boolean isZeroWasteProduct) throws IOException {
        Seller seller = sellerRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new RuntimeException("Seller not found with email: " + sellerEmail));

        if (seller.getStatus() != UserStatus.ACTIVE) {
            throw new AccessDeniedException("Your account is not active. You cannot add products.");
        }

        String imagePath = saveImage(imageFile);

        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setStock(stock);
        product.setCarbonEmission(carbonEmission);
        product.setDescription(description);
        product.setCategory(category);
        product.setImagePath(imagePath);
        product.setSeller(seller);
        product.setZeroWasteProduct(isZeroWasteProduct != null ? isZeroWasteProduct : false);
        product.setActive(true);

        return productRepository.save(product);
    }

    public List<Product> getAllProductsBySellerEmail(String sellerEmail) {
        return productRepository.findBySeller_Email(sellerEmail);
    }

    /**
     * ✅ New method to get the top-selling products for a seller.
     * This calls a custom query method that you will need to add to your ProductRepository.
     *
     * @param sellerEmail The email of the seller.
     * @param limit The maximum number of products to return.
     * @return A list of the top-selling products.
     */
    @Transactional(readOnly = true)
    public List<Product> getTopSellingProducts(String sellerEmail, int limit) {
        // This relies on a custom repository method to rank products by sales.
        // PageRequest.of(0, limit) is used to limit the results to the top 'limit' products.
        return productRepository.findTopSellingProductsBySellerEmail(sellerEmail, PageRequest.of(0, limit));
    }


    public List<Product> getActiveProductsBySellerEmail(String sellerEmail) {
        return productRepository.findBySeller_EmailAndIsActiveTrue(sellerEmail);
    }

    @Transactional
    public void softDeleteProduct(Long productId, String sellerEmail) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        if (!product.getSeller().getEmail().equals(sellerEmail)) {
            throw new AccessDeniedException("You do not have permission to delete this product.");
        }

        // Soft delete (mark inactive)
        product.setActive(false);
        productRepository.save(product);
    }

    @Transactional
    public Optional<Product> updateProduct(Long id, String name, BigDecimal price, Integer stock, Double carbonEmission, String description, String category, MultipartFile imageFile, String sellerEmail, Boolean isZeroWasteProduct) throws IOException {
        return productRepository.findById(id).map(product -> {
            if (!product.getSeller().getEmail().equals(sellerEmail)) {
                throw new AccessDeniedException("You do not have permission to update this product.");
            }

            if (name != null) product.setName(name);
            if (price != null) product.setPrice(price);
            if (stock != null) product.setStock(stock);
            if (carbonEmission != null) product.setCarbonEmission(carbonEmission);
            if (description != null) product.setDescription(description);
            if (category != null) product.setCategory(category);
            if (isZeroWasteProduct != null) product.setZeroWasteProduct(isZeroWasteProduct);

            if (imageFile != null && !imageFile.isEmpty()) {
                try {
                    String imagePath = saveImage(imageFile);
                    product.setImagePath(imagePath);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to update image.", e);
                }
            }

            return productRepository.save(product);
        });
    }

    @Transactional
    public Product toggleProductActive(Long productId, String sellerEmail) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        if (!product.getSeller().getEmail().equals(sellerEmail)) {
            throw new AccessDeniedException("You do not have permission to update this product.");
        }

        product.setActive(!product.isActive()); // flip status
        return productRepository.save(product);
    }

    private String saveImage(MultipartFile imageFile) throws IOException {
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
        String filePath = uploadDir + File.separator + fileName;
        imageFile.transferTo(new File(filePath));

        return fileName;
    }
}
