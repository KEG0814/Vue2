<template>
  <div id="product-list-one">
    <h2>Product List One</h2>
    <ul>
      <li v-for="({ name, price }, index) in saleProducts" :key="index">
        <span class="name">{{ name }}</span>
        <span class="price"> \{{ price }}</span>
      </li>
    </ul>
    <button @click="reducePrice(4)">Reduce Price</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "product-list-one",
  computed: {
    ...mapState(["products"]),

    ...mapGetters(["saleProducts"]),
  },
  methods: {
    ...mapActions(["reducePrice"]),
  },
};
</script>

<style scope>
#product-list-one {
  background-color: #fff8b1;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
}

#product-list-one ul {
  padding: 0;
}

#product-list-one li {
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
}

#product-list-one .price {
  font-weight: bold;
  color: #e8800c;
}
</style>
