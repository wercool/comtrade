package comtrade.basic.rest.api.http;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import comtrade.basic.rest.model.ClaimedUser;
import comtrade.basic.rest.model.User;
import comtrade.basic.rest.service.UserService;
import comtrade.basic.rest.service.exception.UserServiceException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(path = "/api/user")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @PreAuthorize("hasAnyRole('ROLE_MANAGER', 'ROLE_ADMIN')")
    public Flux<User> list() {
        return userService.findAll();
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @PreAuthorize("hasAnyRole('ROLE_MANAGER', 'ROLE_ADMIN')")
    public Mono<ResponseEntity<?>> add(@RequestBody ClaimedUser claimedUser) { 
        return userService.existsByUsername(claimedUser.getUsername())
               .flatMap(exists -> {
                   if (exists) {
                       log.info("Account with email [ " + claimedUser.getUsername() + "] already exists!");
                       throw new UserServiceException(HttpStatus.CONFLICT, "User already exists, to update an existing user use PUT instead.");
                   }

                   return userService.addNewClaimedUser(claimedUser).map((newUser) -> {
                       return ResponseEntity.ok(newUser);
                   });
               });
    }
}
