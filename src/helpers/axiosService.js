import axios from "axios";

const baseUrl = "http://www.omdbapi.com/?apikey=e28f95fd&";

export async function axiosPOST(apiUrl) {
  let returnObj;
  // eslint-disable-next-line no-unused-vars
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
  // eslint-disable-next-line no-unused-vars
  const response = await axios({
    method: "get",
    url: baseUrl + apiUrl,
  }).then((res) => {
    returnObj = res;
    // eslint-disable-next-line no-console
    //console.log("Return Object:", returnObj);
  });
  return returnObj;
}

export async function axiosPUT(apiUrl) {
  let returnObj;
  // eslint-disable-next-line no-unused-vars
  const response = await axios({
    method: "PUT",
    url: baseUrl + apiUrl,
  }).then((res) => {
    returnObj = res;
    // eslint-disable-next-line no-console
    //console.log("Return Object:", returnObj);
  });
  return returnObj;
}
