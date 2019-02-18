package comtrade.basic.rest.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import comtrade.basic.rest.model.Product;
import comtrade.basic.rest.repository.mongo.ProductRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ProductService {
    @SuppressWarnings("unused")
    private static final Logger log = LoggerFactory.getLogger(ProductService.class);

    @Autowired
    ProductRepository productRepository;

    public Flux<Product> findAll() {
        return productRepository.findAll();
    }

    public Mono<Product> findUserByName(String name) {
        return productRepository.findByName(name);
    }

    public Mono<Product> addNewProduct(Product product) {
        return productRepository.save(product);
    }
}
