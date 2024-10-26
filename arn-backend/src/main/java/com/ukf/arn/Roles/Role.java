package com.ukf.arn.Roles;

import com.ukf.arn.Users.User;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @Column(name = "role_ident")
    private String roleIdent;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users = new HashSet<>();

    public Role() {
    }

    public String getRoleIdent() {
        return roleIdent;
    }

    public void setRoleIdent(String roleIdent) {
        this.roleIdent = roleIdent;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}