<template>
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand text-light" href="/">Frontend Challenge</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="d-flex" role="search">
      <button v-show="isLoggedIn" @click="logout()" class="btn btn-danger" type="submit">
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn:false
    };
  },
  updated(){
      this.isLoggedIn = sessionStorage.getItem("auth");
  },
  methods: {
    logout() {
      sessionStorage.clear();
      window.location.href = "/login";
    },
  },
};
</script>
