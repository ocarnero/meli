<template>
  <div class="product-card">
    <div class="loader-container" v-if="!item.id">
      <Loader />
    </div>
    <div class="product-image" v-if="item.id">
      <img :src="item.picture" alt="image" />
    </div>
    <div class="product-info" v-if="item.id">
      <h4>
        {{ item ? item.title : "" }}
      </h4>
      <h3>
        $
        {{
          item && item.price ? Number(item.price.amount).toLocaleString() : ""
        }}
        <span style="font-size: 12px">00 </span>
      </h3>
      <button>Comprar</button>
    </div>
    <div class="product-detail" v-if="item.id">
      <h4>Descripción del producto</h4>
      <p>
        {{ item ? item.description : "" }}
      </p>
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
      item: {},
    };
  },
  methods: {
    retrieveItem() {
      let id = this.$route.params.id;
      DataService.getProductById(id)
        .then((response) => {
          this.item = response.item;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveItem();
  },
};
</script>

<style lang="scss" scoped>
@import "../style/variables.scss";

.product-image img {
  max-height: 80%;
  max-width: 80%;
}
h3 span {
  vertical-align: top;
}
.loader-container {
  grid-column-start: 1;
  grid-column-end: 9;
  grid-row-start: 1;
  grid-row-end: 4;
}

button {
  border-color: transparent;
  background-color: $meli-blue;
  color: $meli-background-white;
  width: 80%;
  height: 30px;
}
.product-image {
  grid-column-start: 3;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 4;
  background-color: $meli-background-white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 50px;
}
.product-info {
  grid-column-start: 6;
  grid-column-end: 7;
  grid-row-start: 1;
  grid-row-end: 4;
  text-align: left;
  background-color: $meli-background-white;
}
.product-detail {
  grid-column-start: 3;
  grid-column-end: 7;
  grid-row-start: 4;
  grid-row-end: 6;
  text-align: center;
  background-color: white;
  text-align: justify;
  padding-left: 30px;
  padding-right: 35px;
}
.product-info h4 {
  color: #333;
  font-size: 20px;
  font-weight: 300;
}
.product-card {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: minmax(150px, max-content);
  background-color: $meli-background-gray;
}
</style>