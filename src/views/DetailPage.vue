<script lang="ts">
import Vue from 'vue';
import { axiosGET } from "@/helpers/axiosService";
import Loader from "@/components/loader";

export default Vue.extend({
  name: 'Film Details',
  components: {
    Loader
  },
  data(){
    return{
      searchParam: this.$route.params.searchparam,
      response: [],
      isLoading: true,
    }
  },
  mounted(){
    axiosGET("i=" + this.searchParam).then((res: any) => {
        console.log(res.data);
        this.response = res.data;
      }).catch((err: any) =>{
        this.isLoading=false;
        console.log(err);
      }).finally(() => {
        this.isLoading = false;
      });
  }
});
</script>


<template>
<div v-if="isLoading">
      <Loader :loading="1"> </Loader>
    </div>
  <div v-else>
      <b-card :img-src="response.Poster" img-alt="Poster" img-left class="mb-3">
        <b-card-text>
          <h4 class="card-title">{{ response.Title }} - {{ response.Year }}</h4>
          <p class="card-text">
            <em>{{ response.Plot }}</em>
          </p>
          <div>
            <h6><strong>Released on:</strong> {{ response.Released }}</h6>
            <h6><strong>Length:</strong> {{ response.Runtime }}</h6>
            <h6><strong>Genre:</strong> {{ response.Genre }}</h6>
            <h6><strong>IMDB Rating:</strong> {{ response.imdbRating }}</h6>
            <h6><strong>Director:</strong> {{ response.Director }}</h6>
            <h6><strong>Writer:</strong> {{ response.Writer }}</h6>
            <h6><strong>Actors:</strong> {{ response.Actors }}</h6>
            <h6><strong>Language:</strong> {{ response.Language }}</h6>
            <h6><strong>Country:</strong> {{ response.Country }}</h6>
            <h6><strong>Awards:</strong> {{ response.Awards }}</h6>
            <h6><strong>Awards:</strong></h6>
            <h6 v-for="data in response.Ratings">{{ data.Source }} - {{data.Value}}</h6>
            <h6><strong>imdbVotes:</strong> {{ response.imdbVotes }}</h6>
            <h6><strong>BoxOffice:</strong> {{ response.BoxOffice }}</h6>
            <h6><strong>Metascore:</strong> {{ response.Metascore }}</h6>
            <div class="row">
            <div class="col-6">
    <b-form-input
      id="inline-form-input-name"
      class="w-25 mr-sm-2 mb-sm-0"
      placeholder="Suggest a friend"
    ></b-form-input>
    <b-button class="ms-2" variant="primary">Send E-Mail</b-button>
    </div>
    <div class="col-6">
            <b-button class="ms-2 float-end" variant="danger">Add to Favourites</b-button>
            </div>
            </div>

          </div>
        </b-card-text>
      </b-card>
      <b-card>
        <b-card-text>
          <h4 class="card-title">User Panel</h4>
          <p class="card-text">
            <em>You can write a review about the film, suggest to your friends and you can add this film to your favourites.</em>
          </p>
          <div>
<div>
  <b-form inline>
    <h4 class="card-title">Name</h4>

    <b-form-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Kerem Nalbant"
    ></b-form-input>
    <h4 class="card-title mt-2">Review</h4>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <b-button class="mt-3" variant="primary">Send Review</b-button>
  </b-form>
</div>
          </div>
        </b-card-text>
      </b-card>
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

