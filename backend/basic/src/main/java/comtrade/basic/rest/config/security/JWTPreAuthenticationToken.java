package comtrade.basic.rest.config.security;

import javax.security.auth.Subject;

import org.springframework.security.authentication.AbstractAuthenticationToken;

@SuppressWarnings("serial")
public class JWTPreAuthenticationToken extends AbstractAuthenticationToken {
    private final String authToken;
    private final String bearerRequestHeader;
    private final String username;

    public JWTPreAuthenticationToken(final String authToken, final String bearerRequestHeader, final String username) {
        super(null);
        this.authToken = authToken;
        this.bearerRequestHeader = bearerRequestHeader;
        this.username = username;
        setAuthenticated(false);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return null;
    }

    @Override
    public boolean implies(Subject subject) {
        return false;
    }

    public String getAuthToken() {
        return authToken;
    }

    public String getBearerRequestHeader() {
        return bearerRequestHeader;
    }

    public String getUsername() {
        return username;
    }
}
