package comtrade.basic.rest.api.http;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import comtrade.basic.rest.model.Product;
import comtrade.basic.rest.service.ProductService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(path = "/api/product")
public class ProductController {
    private static final Logger log = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    ProductService productService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @PreAuthorize("hasAnyRole('ROLE_MANAGER', 'ROLE_ADMIN')")
    public Flux<Product> list() {
        return productService.findAll();
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @PreAuthorize("hasAnyRole('ROLE_MANAGER', 'ROLE_ADMIN')")
    public Mono<ResponseEntity<?>> add(@RequestBody Product product) { 
        return productService.addNewProduct(product).map((newProduct) -> {
            return ResponseEntity.ok(newProduct);
        });
    }
}
