<template>
  <div class="products" id="products">
      <div class="container">
          <h1 class="text-center p-5">Our Products list</h1>
          <div class="row">
              
              <div class="col-md-4" v-for="product in products">
                  <div class="card product-item">
                    
                        <carousel :per-page="1" :autoplay="true" :loop="true" paginationActiveColor="#42b983" paginationColor="#b2ebd1" paginationSize="10" easing="linear" speed="300" >
                            <slide v-for="(image, index) in product.images">
                                <img :src="image" style="width:250px;" class="card-img-top" alt="...">
                            </slide>
                            
                        </carousel>

                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">{{ product.name }}</h5>
                                <h5 class="card-price">{{ product.price | currency }}</h5>
                            </div>    
                            
                            <a href="#" class="btn btn-primary">Add to Cart</a>
                        </div>
                    </div>
              </div>

          </div>
      </div>
    
  </div>
  
</template>

<script>
import {fb, db} from '../firebase';
export default {
  name: "ProductList", 
  props: {
    msg: String
  },

    data(){
    return{
      products:[],
      product:{
      name:null,
      desc:null,
      price:null,
      tags:[],
      images:[]
      },
      activeItem:null,
      modal: null,
      tag:null
    }
  },

  firestore(){
    return{ 
      products: db.collection('products'),
    }
  }

  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>
