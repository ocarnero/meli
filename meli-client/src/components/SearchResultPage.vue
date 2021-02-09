<template>
  <div class="container">
    <Loader v-if="loader" />
    <div class="breadcrumb-container" v-if="results.length">
      <ul>
        <li v-for="(cat, idx) in categories" :key="idx">
          <span> > {{ cat }}</span>
        </li>
      </ul>
    </div>
    <div v-for="(item, idx) in results" :key="idx">
      <section class="products">
        <div class="product-card">
          <div class="product-image">
            <img class="center" :src="item.picture" alt="image" />
          </div>
          <div class="product-info">
            <h3>$ {{ item ? item.price.amount : "" }}</h3>
            <h4>
              <router-link :to="'/items/' + item.id">{{
                item ? item.title : ""
              }}</router-link>
            </h4>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import Loader from "./Loader";

export default {
  name: "SearchResultPage",
  components: {
    Loader,
  },
  data() {
    return {
      results: [],
      categories: [],
      loader: false,
    };
  },
  methods: {
    startSearch() {
      this.loader = true;
      this.results = [];
      this.categories = [];
    },
    finishSearch() {
      this.loader = false;
    },
    retrieveProds() {
      let search = this.$route.query.search;
      if (search) {
        this.startSearch();
        DataService.search(search)
          .then((response) => {
            this.results = response.items;
            this.categories = response.categories[0][0];
            this.finishSearch();
          })
          .catch((e) => {
            console.log(e);
            this.finishSearch();
          });
      } else {
        this.results = [];
        this.categories = [];
        this.loader = false;
      }
    },
  },
  watch: {
    "$route.query.search"() {
      this.retrieveProds();
    },
  },
  mounted() {
    this.retrieveProds();
  },
};
</script>

<style lang="scss">
@import "../style/variables.scss";

ul {
  position: fixed;
  padding-left: 25%;
  margin-top: -23px;
}
ul > li {
  display: inline-block;
  /* You can also add some margins here to make it look prettier */
  zoom: 1;
  *display: inline;
  /* this fix is needed for IE7- */
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.breadcrumb-container {
  color: #666;
  margin-top: 30px;
}
.breadcrumb {
  grid-column-start: 3;
  grid-column-end: 7;
  grid-row-start: 1;
  grid-row-end: 2;
}
.product-image img {
  height: auto;
  width: auto;
  max-width: 70%;
  max-height: 90%;
}
.product-image {
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 2;
  border-bottom: thin solid #eee;
  background-color: $meli-background-white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-info {
  grid-column-start: 5;
  grid-column-end: 7;
  grid-row-start: 1;
  grid-row-end: 2;
  text-align: left;
  border-bottom: thin solid #eee;
  background-color: $meli-background-white;
  padding-top: 38px;
}
.product-info h4 {
  color: #333;
  font-size: 20px;
  font-weight: 300;
}
.product-card {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 200px;
  background-color: $meli-background-gray;
}
.container {
  align-items: center;
  justify-content: center;
  background-color: $meli-background-gray;
  height: 100%;
}
</style>