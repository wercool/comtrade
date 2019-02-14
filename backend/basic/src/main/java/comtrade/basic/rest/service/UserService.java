package comtrade.basic.rest.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import comtrade.basic.rest.config.security.CustomPasswordEncoder;
import comtrade.basic.rest.model.ClaimedUser;
import comtrade.basic.rest.model.User;
import comtrade.basic.rest.repository.mongo.UserRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class UserService implements ReactiveUserDetailsService{

    @SuppressWarnings("unused")
    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    CustomPasswordEncoder customPasswordEncoder;

    public Mono<UserDetails> getAuthenticatedUserDetails(){
        return ReactiveSecurityContextHolder
               .getContext()
               .map(SecurityContext::getAuthentication)
               .flatMap(authentication -> findByUsername(authentication.getPrincipal().toString()));
    }

    public Mono<Boolean> existsByUsername(String username) {
        return this.findByUsername(username)
               .flatMap(userDetails -> {
                   return Mono.just(true);
               })
               .defaultIfEmpty(Boolean.FALSE);
    }

    public Mono<UserDetails> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Mono<User> findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    public Flux<User> findAll() {
        return userRepository.findAll();
    }

    public Mono<User> addNewClaimedUser(ClaimedUser claimedUser) {
        User newClaimedUser = new User();
        newClaimedUser.setUsername(claimedUser.getUsername());
        newClaimedUser.setPassword(customPasswordEncoder.encode(claimedUser.getPassword()));
        newClaimedUser.setEnabled(true);
        newClaimedUser.setRoles(claimedUser.getRoles());
        newClaimedUser.setPersonName(claimedUser.getPersonName());

        return userRepository.save(newClaimedUser);
    }

    public Mono<User> add(User user) {
        return userRepository.save(user);
    }
}
