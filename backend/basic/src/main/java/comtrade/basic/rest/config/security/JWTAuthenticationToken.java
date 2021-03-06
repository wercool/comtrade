package comtrade.basic.rest.config.security;

import java.util.Collection;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

@SuppressWarnings("serial")
public class JWTAuthenticationToken extends UsernamePasswordAuthenticationToken {
    private String token;

    public JWTAuthenticationToken(String token, String username, Collection<? extends GrantedAuthority> authorities) {
        super(username, null, authorities);
        this.token = token;
    }

    public JWTAuthenticationToken(String username, Collection<? extends GrantedAuthority> authorities) {
        super(username, null, authorities);
    }

    public String getToken() {
        return token;
    }

    @Override
    public Object getCredentials() {
        return null;
    }
}
