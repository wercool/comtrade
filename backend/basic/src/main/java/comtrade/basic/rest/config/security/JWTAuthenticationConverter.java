package comtrade.basic.rest.config.security;

import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import io.jsonwebtoken.ExpiredJwtException;
import reactor.core.publisher.Mono;

@Component
public class JWTAuthenticationConverter implements Function<ServerWebExchange, Mono<Authentication>> {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    JWTTokenUtil jwtTokenUtil;

    @Value("${jwt.header}")
    private String tokenHeader;

    @Value("${jwt.param}")
    private String tokenParam;

    @Value("${jwt.prefix}")
    private String bearerPrefix;

    @Override
    public Mono<Authentication> apply(ServerWebExchange exchange) throws BadCredentialsException {
        ServerHttpRequest request = exchange.getRequest();
        try {

            Authentication authentication = null;
            String authToken = null;
            String username = null;

            String bearerRequestHeader = exchange.getRequest().getHeaders().getFirst(tokenHeader);

            if (bearerRequestHeader != null && bearerRequestHeader.startsWith(bearerPrefix + " ")) {
                authToken = bearerRequestHeader.substring(7);
            }

            if (authToken == null && request.getQueryParams() != null && !request.getQueryParams().isEmpty()) {
                String authTokenParam = request.getQueryParams().getFirst(tokenParam);
                if (authTokenParam != null) authToken = authTokenParam;
            }

            if (authToken != null) {
                try {
                    username = jwtTokenUtil.getUsernameFromToken(authToken);
                } catch (IllegalArgumentException ex) {
                    logger.error("An error occured during getting username from token", ex);
                    return Mono.error(new BadCredentialsException("An error occured during getting username from token"));
                } catch (ExpiredJwtException ex) {
                    logger.warn("Provided token is exprired and not valid anymore; " + ex.getMessage());
                    return Mono.error(ex);
                }
            } else {
                logger.warn("Couldn't find bearer string, will ignore the header");
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                return Mono.just(new JWTPreAuthenticationToken(authToken, bearerRequestHeader, username));
            }

            return Mono.just(authentication);
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid token...");
        }
    }
}
