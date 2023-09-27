import axios from "axios";
import jwt_decode from "jwt-decode";

const login = (data, callback) => {
    axios
        .post("http://localhost:5000/api/users/login", data)
        .then((res) => {
            callback(true, res.data.token);
        })
        .catch((error) => {
            callback(false, error);
        });
};

const getUsers = (token) => {
    const decoded = jwt_decode(token);
    return decoded.id;
}

// const getUsers = (token) => {
//     axios
//         .get("http://localhost:5000/api/users", {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         })
//         .then((res) => {
//             return res.data;
//         });
// };

export { login, getUsers };
