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
          <h3 class="d-inline-block" >Order List but page not complete just copy of product page..</h3>
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

    <div class="modal fade " id="productNew" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content ">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
                <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>
                    <div class="form-group">
                      <vue-editor v-model="product.desc"></vue-editor>
                    </div>
                </div>  
                <div class="col-md-4">  
                    <div class="form-group">
                      <input type="text" placeholder="Price" v-model="product.price" class="form-control">
                    </div>
                    <div class="form-group">
                      <input type="text" @keyup.188="addTag" placeholder="Product Tags" v-model="tag" class="form-control">
                        <div class="d-flex">
                          <p v-for="tag in product.tags">
                            <span class="p-1">{{tag}}</span>
                          </p>
                        </div>
                    </div>
                    <div class="form-group">
                      <label for="product_image">Product Image</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>
                    <div class="form-group d-flex">
                      <div class="p-1" v-for="(image, index) in product.images">
                        <div class="img-wrapp">
                          <img :src="image" alt="" width="80px">
                          <span class="delete-img" @click="deleteImage(image,index)">X</span>
                        </div>  
                      </div>  
                    </div>
                </div> 
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
import { VueEditor } from 'vue2-editor';
import {fb, db} from '../firebase';

export default {
  name: "Product",
  components: {
    VueEditor
  },
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
  },

  methods:{
    deleteImage(img,index){
      let image = fb.storage().refFromURL(img);

      this.product.images.splice(index,1);
       
      image.delete().then(function(){
        console.log('image deleted');
      }).catch(function(){
        console.log('an error occured');
      });
    },

    addTag(){
      this.product.tags.push(this.tag);
      this.tag = "";
    },

    uploadImage(e){
      if(e.target.files[0]){
        
        let file = e.target.files[0];
        console.log(e.target.files[0]);  

        var storageRef = fb.storage().ref('products/'+ Math.random() + '_' + file.name);
        
        let uploadTask = storageRef.put(file); 
        
          uploadTask.on('state_changed', (snapshot) => {
        
          }, (error) => {
            // Handle unsuccessful uploads
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images.push(downloadURL);
              console.log('File available at', downloadURL);
            });
          });

      }

    },

    reset(){
      this.product = {
          name:null,
          desc:null,
          price:null,
          tags: [],
          images:[]
      }
    },
    addNew(){
      this.modal = 'new';
      this.reset();
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

          this.$firestore.products.doc(doc.id).delete()
          
          console.log(doc.id);
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

.img-wrapp{
  position: relative;
}
.img-wrapp span.delete-img{
  position: absolute;
  top: -14px;
  left: -2px;
}
.img-wrapp span.delete-img:hover{
  cursor:pointer;
}

</style>
