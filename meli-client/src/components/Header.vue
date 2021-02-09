<template>
  <header>
    <div class="header-container">
      <div style="float: left">
        <img
          alt="ML logo"
          src="../assets/Logo_ML.png"
          v-on:click="onLogoClick"
        />
      </div>
      <div style="float: left; padding-left: 10%">
        <input
          type="text"
          v-model="query"
          placeholder="Buscar productos, marcas y más…"
          v-on:keyup.enter="onSearchClick"
        />
      </div>
      <div style="float: left">
        <div>
          <button class="search-button" v-on:click="onSearchClick">
            <img src="../assets/ic_Search.png" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      query: "",
    };
  },
  methods: {
    onSearchClick() {
      this.$router.push({ path: "/items", query: { search: this.query } });
    },
    onLogoClick() {
      this.$router.push("/");
    },
    updateInput() {
      this.query = this.$route.query.search;
    },
  },
  watch: {
    "$route.query.search"() {
      this.updateInput();
    },
  },
  mounted() {
    if (this.$route.query.search) {
      this.updateInput();
    }
  },
};
</script>

<style lang="scss">
@import "../style/variables.scss";

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  opacity: 0.2; /* Firefox */
}
.search-button {
  box-shadow: 0 1px 2px 0 RGB(0 0 0 / 20%);
  height: 42px;
  border-radius: 2px;
  background-color: #fff;
  border: 0 rgba(0, 0, 0, 0.2);
  background-color: #EEEEEE;
  width: 30px;
}
.search-button img {
  padding-top: 7px;
}
.header-container {
  padding-left: 18%;
  padding-top: 25px;
}
header {
  background-color: $meli-yellow;
  height: 100px;
}
input {
  box-shadow: 0 1px 2px 0 RGB(0 0 0 / 20%);
  height: 40px;
  border-radius: 2px;
  background-color: #fff;
  border: 0 rgba(0, 0, 0, 0.2);
  color: #333;
  font-size: 18px;
  width: 37vw;
}
</style>