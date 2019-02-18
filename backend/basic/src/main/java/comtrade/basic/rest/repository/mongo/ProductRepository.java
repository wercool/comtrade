package comtrade.basic.rest.repository.mongo;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Mono;

import comtrade.basic.rest.model.Product;

@Repository
public interface ProductRepository  extends ReactiveMongoRepository<Product, String> {
    Mono<Product> findByName(String name);
}
