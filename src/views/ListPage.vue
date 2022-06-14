<script lang="ts">
import Vue from "vue";
import { axiosGET } from "@/helpers/axiosService";
import Loader from "@/components/loader";

export default Vue.extend({
  name: "Film Details",
  components: {
    Loader,
  },
  data() {
    return {
      searchParam: this.$route.params.searchparam,
      response: [] as any,
      isLoading: false,
      fields: [
        {
          key: "Poster",
        },
        {
          key: "imdbID",
          sortable: true,
          class: "text-center",
        },
        {
          key: "Title",
          sortable: true,
          class: "text-center",
        },
        {
          key: "Type",
          sortable: true,
          class: "text-center",
        },
        {
          key: "Year",
          sortable: true,
          class: "text-center",
        },
        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      totalResults: 0,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      scrolledToBottom: false,
    };
  },
  mounted() {
    this.scroll();
    if(this.searchParam){
      axiosGET("s=" + this.searchParam + "&page=" + this.currentPage)
      .then((res: any) => {
        //console.log(res.data);
        this.response = res.data.Search;
        this.totalRows = this.response.length;
        this.totalResults = res.data.totalResults;
      })
      .catch((err: any) => {
        this.isLoading = false;
        console.log(err);
      })
      .finally(() => {
        this.isLoading = false;
      });
    }

  },
  computed: {
    sortOptions(): any {
      return this.fields
        .filter((f: any) => f.sortable)
        .map((f: any) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  methods: {
    info(item: any, index: any, button: any): any {
      this.infoModal.title = item.Title;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal(): any {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems: any): any {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    scroll (): any {
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

        if (bottomOfWindow) {
         this.scrolledToBottom = true;
         this.currentPage += 1;
         console.log(this.currentPage);
         this.isLoading = true;
         this.loadMoreResults();
        }
     	}
  	},
    loadMoreResults(): any {
      if(this.scrolledToBottom && (this.response.length/this.totalResults < 1)){
      axiosGET("s=" + this.searchParam + "&page=" + this.currentPage)
      .then((res: any) => {
        for(let i =0 ; i < res.data.Search.length; i++){
          this.response.push(res.data.Search[i]);
        }
        this.totalRows = this.response.length;
        this.scrolledToBottom = false;
        console.log(res.data.Search);
      })
      .catch((err: any) => {
        this.isLoading = false;
        console.log(err);
      })
      .finally(() => {
        this.isLoading = false;
      });
      }else{
        this.isLoading = false;
      }
  }
},
});
</script>

<template>
  <div v-if="isLoading">
    <Loader :loading="1"> </Loader>
  </div>
  <div v-else>
    <b-container fluid>
      <!-- User Interface controls -->
      <b-card class="my-2">
        <b-row>
          <b-col lg="6" style="margin-left: 25%" class="mb-4">
            <b-form-group
              label-for="filter-input"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              class="mb-3"
            >
              <b-input-group size="sm">
                <b-form-input
                  id="filter-input"
                  v-model="filter"
                  type="search"
                  placeholder="Type to filter"
                ></b-form-input>

                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''"
                    >Clear</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <span> <strong>Total Results:</strong> {{totalResults}}</span>
            <br>
            <span> <strong>Listing:</strong> {{response.length}}/{{totalResults}}</span>
          </b-col>
        </b-row>
      </b-card>

      <!-- Main table element -->
      <b-table
        :items="response"
        :fields="fields"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
      >
        <template #cell(Poster)="row">
          <img :src="row.item.Poster" alt="Poster" />
        </template>

        <template #cell(actions)="row">
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >
            See JSON
          </b-button>
          <b-button size="sm" class="mr-1"><router-link v-bind:to="'/detail/' + row.item.imdbID">See Details
            </router-link></b-button
                >
        </template>

        <template #row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>

      <!-- Info modal -->
      <b-modal
        :id="infoModal.id"
        :title="infoModal.title"
        ok-only
        @hide="resetInfoModal"
      >
        <pre>{{ infoModal.content }}</pre>
      </b-modal>
    </b-container>
  </div>
</template>
<style scoped>
body {
  background: #20262E;
  padding: 0 20px;
  font-family: Helvetica;
}

#app {
  background: #fff;
  height: 200vh;
}
.sticky {
  position: fixed;
  top: 0;
}

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
