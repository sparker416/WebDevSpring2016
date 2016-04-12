/**
 * Created by spark on 4/4/2016.
 */
(function()
{
    angular
        .module("KnightMovesApp")
        .factory("UserService", userService);

    function userService($rootScope)
    {
        var model = {
            users: [
                {
                    _id:123,
                    firstName:"Alice",
                    lastName:"Wonderland",
                    email: "alice@wonderland.com",
                    username:"alice",
                    password:"alice",
                    roles: ["player"]
                },
                {
                    _id:234,
                    firstName:"Bob",
                    lastName:"Hope",
                    email: "bob@hope.com",
                    username:"bob",
                    password:"bob",
                    roles: ["admin"]
                },
                {
                    _id:345,
                    firstName:"Charlie",
                    lastName:"Brown",
                    email: "charlie@brown.com",
                    username:"charlie",
                    password:"charlie",
                    roles: ["staff"]
                },
                {
                    _id:456,
                    firstName:"Dan",
                    lastName:"Craig",
                    email: "dan@craig.com",
                    username:"dan",
                    password:"dan",
                    roles: ["player"]
                },
                {
                    _id:567,
                    firstName:"Edward",
                    lastName:"Norton",
                    email: "edward@norton.com",
                    username:"ed",
                    password:"ed",
                    roles: ["player"]
                }
            ],

            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByCredentials(username, password)
        {
            for (var u = 0; u < model.users.length; u++) {
                if (model.users[u].username === username &&
                    model.users[u].password === password) {
                    return model.users[u];
                }
            }
            return null;
        }

        function findAllUsers()
        {
            return model.users;
        }

        function createUser(user)
        {
            var newUser = {
                _id: (new Date).getTime(),
                firstName: "",
                lastName: "",
                email: user.email,
                username: user.username,
                password: user.password,
                roles: ["player"]
            };
            model.users.push(newUser);
            return newUser;
        }

        function deleteUserById(userId)
        {
            for (var u = 0; u < model.users.length; u++) {
                if (model.users[u].id === userId) {
                    model.users.splice(u, 1);
                    return model.users;
                }
            }
            return null;
        }

        function updateUser(user)
        {
            for (var u = 0; u < model.users.length; u++) {
                var old = findUserByCredentials(user.username, user.password);
                if (old !== null) {
                    old.firstName = user.firstName;
                    old.lastName = user.lastName;
                    old.email = user.email;
                    old.password = user.password;
                    return old;
                }
            }
            return null;
        }
    }
})();