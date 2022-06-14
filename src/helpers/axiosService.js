import axios from "axios";

const baseUrl = "http://www.omdbapi.com/?apikey=e28f95fd&";

export async function axiosPOST(apiUrl) {
  let returnObj;
  const response = await axios({
    method: "post",
    url: baseUrl + apiUrl,
  }).then((res) => {
    returnObj = res;
  });
  return returnObj;
}

export async function axiosGET(apiUrl) {
  let returnObj;
  const response = await axios({
    method: "get",
    url: baseUrl + apiUrl,
  }).then((res) => {
    returnObj = res;
  });
  return returnObj;
}

export async function axiosPUT(apiUrl) {
  let returnObj;
  const response = await axios({
    method: "PUT",
    url: baseUrl + apiUrl,
  }).then((res) => {
    returnObj = res;
  });
  return returnObj;
}
