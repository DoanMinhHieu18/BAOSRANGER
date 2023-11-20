import axios from "../axios";
// const handleLoginApi = async (email, password) => {
//   try {
//     return axios.post("/api/login", { email: email, password: password });
//   } catch (error) {
//     console.log(error);
//   }
// };
// const getAllUsers = (inputId) => {
//   //template string
//   return axios.get(`/api/get-all-users?id=${inputId}`);
// };

// const createNewUserService = (data) => {
//   return axios.post("/api/create-new-user", data);
// };

// const delUserService = (userId) => {
//   return axios.delete("/api/del-user", { data: { id: userId } });
// };

// const editUserService = (inputData) => {
//   return axios.put("/api/edit-user", inputData);
// };

// const getAllCodeService = (inputType) => {
//   return axios.get(`/api/allcode?type=${inputType}`);
// };
// const postDataSchedule = (data) => {
//   return axios.post("/api/bulk-create-schedule", data);
// };

const getUserInfoService = async (email) => {
  const url = `${process.env.REACT_APP_API_URL}/api/getUserInfo`;
  return await axios({
    url: url,
    method: "GET",
    data: email,
    withCredentials: true,
  });
}

export {
  getUserInfoService,
};
