<script lang="ts">
import Vue from "vue";
import { axiosGET } from "@/helpers/axiosService";
import Loader from "@/components/loader";

export default Vue.extend({
  name: "Anasayfa",
  components: {Loader},
  data() {
    return {
      searchParam: "",
      response: [],
      isLoading: false,
    };
  },
  methods: {
    search() {
      console.log(this.searchParam);
      axiosGET("s=" + this.searchParam).then((res: any) => {
        console.log(res.data);
        this.response = res.data.Search;
      }).catch((err: any) =>{
        this.isLoading=false;
        console.log(err);
      }).finally(() => {
        this.isLoading = false;
      });
    },
    capitalizeFirstLetter(string:string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  },
});
</script>

<template>
<div v-if="isLoading">
      <Loader :loading="1"> </Loader>
    </div>
  <div v-else>
    <div class="card mt-2 rounded">
      <div class="card-body">Welcome! Here you can search for a film.</div>
    </div>
    <div class="card mt-2 rounded">
      <div class="card-body">
        <b-form-input
          class="text-center"
          v-model="searchParam"
          placeholder="Enter something..."
        ></b-form-input>
        <b-button @click="search(), isLoading=true" class="mt-3"> Search </b-button>
      </div>
    </div>
    <div v-show="response.length>0" class="mt-4">
      <div class="table-responsive mt-3 mb-0">
        <table class="table align-middle table-nowrap">
          <thead class="table-light">
            <tr>
              <th class="align-middle">Poster</th>
              <th class="align-middle">IMDB ID</th>
              <th class="align-middle">Title</th>
              <th class="align-middle">Year</th>
              <th class="align-middle">Type</th>
              <th class="align-middle">See Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in response" :key="data.id">
              <td>
                <img :src="data.Poster" />
              </td>
              <td>
                {{ data.imdbID }}
              </td>
              <td>
                {{ data.Title }}
              </td>
              <td>
                {{ data.Year }}
              </td>
              <td>
                {{ capitalizeFirstLetter(data.Type) }}
              </td>
              <td>
                <b-button variant="outline-success"><router-link v-bind:to="'/detail/' + data.imdbID">See Details
            </router-link></b-button
                >
              </td>
            </tr>
          </tbody>
        </table>
  <b-button variant="my-2"><router-link v-bind:to="'/list/' + searchParam">More Results
            </router-link></b-button>
      </div>
      <!-- <b-card :img-src="response.Poster" img-alt="Poster" img-left class="mb-3">
        <b-card-text>
          <h4 class="card-title">{{ response.Title }} - {{ response.Year }}</h4>
          <p class="card-text">
            <em>{{ response.Plot }}</em>
          </p>
          <div style="margin-top: 7%">
            <h6><strong>Released on:</strong> {{ response.Released }}</h6>
            <h6><strong>Length:</strong> {{ response.Runtime }}</h6>
            <h6><strong>Genre:</strong> {{ response.Genre }}</h6>
            <h6><strong>IMDB Rating:</strong> {{ response.imdbRating }}</h6>
            <b-button @click="detailPage()" class="mt-3"> Detay </b-button>
          </div>
        </b-card-text>
      </b-card> -->
    </div>
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
