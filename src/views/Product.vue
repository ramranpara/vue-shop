<template>
  <div class="product">
    <div class="container h-100">
        <div class="intro h-100">
          <div class="row h-100 justify-content-center align-items-center">
            <div class="col-md-6">
                <h3>Product Page</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque fugit quo qui magni eaque asperiores rerum, quisquam labore veniam eos? Similique consequuntur, tempora aperiam modi facilis deleniti eaque itaque maxime?</p>
            </div>
            <div class="col-md-6">
                <img src="/img/svg/products.svg" alt="" class="img-fluid">
            </div>
          </div>
        </div>

        <hr>

        <div class="product-test">
          
          <hr>
          <h3 class="d-inline-block" >Product List</h3>
          <button  @click="addNew" class="btn btn-primary float-right">Add New Product</button>
         <div class="table-responsive">
          <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Product Tags</th>
                  <th>Image</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products">
                  <td>
                    {{product.name}}
                  </td>
                  <td>
                    {{product.desc}}
                  </td>
                  <td>
                    {{product.price}}
                  </td>
                  <td>
                    {{product.tag}}
                  </td>
                  <td>
                    {{product.image}}
                  </td>
                  <td>
                    <button @click="editProduct(product)" class="btn btn-primary">Edit</button>
                    <button @click="deleteProduct(product)" class="btn btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
          </table>
          </div>

        </div>
    </div>

    <div class="modal fade" id="productNew" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div class="form-group">
                <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
              </div>
              <div class="form-group">
                <input type="textarea" placeholder="Product Description" v-model="product.desc" class="form-control">
              </div>
              <div class="form-group">
                <input type="text" placeholder="Price" v-model="product.price" class="form-control">
              </div>
              <div class="form-group">
                <input type="text" placeholder="Product Tags" v-model="product.tag" class="form-control">
              </div>
              <div class="form-group">
                <input type="file" @change="uploadImage()" placeholder=""  class="form-control">
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save Product</button>
            <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply Changes</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {fb, db} from '../firebase';

export default {
  name: "Product",
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
      tag:null,
      image:null
      },
      activeItem:null,
      modal: null
    }
  },

  firestore(){
    return{ 
      products: db.collection('products'),
    }
  },

  methods:{
    uploadImage(){

    },
    addNew(){
      this.modal = 'new';
       $('#productNew').modal('show');
    },

   
    updateProduct(){
      this.$firestore.products.doc(this.product.id).update(this.product);
      console.log(this.product.id);
        Toast.fire({
          type: 'success',
          title: 'updated in successfully'
        })
        $('#productNew').modal('hide');
    },

    editProduct(product){
        this.modal = 'edit';
        this.product = product;
        $('#productNew').modal('show'); 
    },

    deleteProduct(doc){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$firestore.products.doc(doc['.key']).delete()
          console.log(doc['.key']);
            Toast.fire({
              type: 'success',
              title: 'deleted successfully'
            })
        
        }
      })

    },
    readData(){
    
    },

    addProduct(){
       this.$firestore.products.add(this.product);
        $('#productNew').modal('hide');
         Toast.fire({
              type: 'success',
              title: 'added in successfully'
            })
    },

   

  },

  created(){
      
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
