package comtrade.basic.rest.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Mono;

import comtrade.basic.rest.model.User;
import comtrade.basic.rest.repository.mongo.UserRepository;

@Service
public class UserService implements ReactiveUserDetailsService{

    @SuppressWarnings("unused")
    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    UserRepository userRepository;

    public Mono<UserDetails> getAuthenticatedUserDetails(){
        return ReactiveSecurityContextHolder
               .getContext()
               .map(SecurityContext::getAuthentication)
               .flatMap(authentication -> findByUsername(authentication.getPrincipal().toString()));
    }

    public Mono<UserDetails> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Mono<User> findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }
}
