package comtrade.basic.rest.model;

import java.util.List;

import comtrade.basic.rest.config.security.model.Role;

public class ClaimedUser {
    private String username;
    private String password;
    private String personName;
    private List<Role> roles;

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getPersonName() {
        return personName;
    }
    public void setPersonName(String personName) {
        this.personName = personName;
    }
    public List<Role> getRoles() {
        return roles;
    }
    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
