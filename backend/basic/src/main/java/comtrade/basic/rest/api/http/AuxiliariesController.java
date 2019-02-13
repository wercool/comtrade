package comtrade.basic.rest.api.http;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import comtrade.basic.rest.config.security.CustomPasswordEncoder;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(path = "/api/aux")
public class AuxiliariesController {

    @Autowired
    CustomPasswordEncoder customPasswordEncoder;

    @RequestMapping(value = "/encode/{str}", method = RequestMethod.GET)
    public Mono<ResponseEntity<String>> encode(@PathVariable("str") String str) {
        return Mono.just(ResponseEntity.ok(customPasswordEncoder.encode(str)));
    }
}
