<script lang="ts">
import Vue from "vue";
import { axiosGET } from "@/helpers/axiosService";
import axios from "axios";
import Loader from "@/components/loader";

export default Vue.extend({
  name: "Login",
  components: {
    Loader,
  },
  data() {
    return {
      isLoading: false,
      username: "" as String,
      password: "" as String,
    };
  },
  methods: {
    tryToLogin() {
      axios({
        method: "post",
        url: "https://localhost:7101/api/v1/Login",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          username: this.username,
          password: this.password,
        },
      })
        .then((res: any) => {
          if (res.data.success == true) {
            sessionStorage.setItem("auth", res.data.success);
            this.$router.push("/");
          } else {
            alert("Kullanıcı adı veya şifre hatalı");
          }
        })
        .catch((err: any) => {
          this.isLoading = false;
          alert("Kullanıcı adı veya şifre hatalı");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
</script>

<template>
  <div style="margin-left: 25%; margin-top: 10%" class="w-50">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input
        type="text"
        v-model="username"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input
        type="password"
        v-model="password"
        class="form-control"
        id="exampleInputPassword1"
      />
    </div>
    <button @click="tryToLogin()" class="btn btn-primary">Submit</button>
  </div>
</template>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
