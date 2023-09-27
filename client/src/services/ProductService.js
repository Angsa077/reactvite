import axios from "axios";

const getProducts = (callback) => {
    axios
        .get("http://localhost:5000/api/products")
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

const getProductById = (id, callback) => {
    axios
        .get(`http://localhost:5000/api/products/${id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

// const getProducts = async({ token }) => {
//     try {
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//         };

//         const { data } = await axios.get("http://localhost:5000/api/products", config);
//         return data;
//     } catch (error) {
//         if (error.response) {
//             return error.response.data;
//         }
//     }
// };

export { getProducts, getProductById };