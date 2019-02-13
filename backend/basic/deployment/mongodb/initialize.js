db.users.insertMany([
    {
        username: "maskame@gmail.com",
        password: "$2a$04$Oo/ECycZcKyukKtrAfacjuGvgmayMFbT7NECSS7Mr7OLm6muGMLYq", //maska's password;)
        enabled: true,
        roles: [
            "ROLE_USER",
            "ROLE_ADMIN"
        ],
        email: "maskame@gmail.com"
    },
]);