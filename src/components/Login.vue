<template>
  <div class="login">
      <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
               
                        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="pills-login-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">register</a>
                        </li>
                        
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-login-tab">
                                <h5> Login</h5>
                                <div class="form-group">
                                    <label for="email">Email address</label>
                                    <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                                </div>
                                <div class="form-group">
                                    <label for="Password">Password</label>
                                    <input type="password" @keyup.enter="login" v-model="password" class="form-control" id="Password" placeholder="Password">
                                </div>
                                <button type="submit" class="btn btn-primary" @click="login">Login</button>
                        

                        </div>
                        <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                                 <h5>Create New Account</h5>
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="name" v-model="name" class="form-control" id="name" aria-describedby="" placeholder="Enter Name">
                                </div>
                                <div class="form-group">
                                    <label for="email">Email address</label>
                                    <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                                </div>
                                <div class="form-group">
                                    <label for="Password">Password</label>
                                    <input type="password"  @keyup.enter="register" v-model="password" class="form-control" id="Password" placeholder="Password">
                                </div>
                                <button type="submit" class="btn btn-primary" @click="register">Signup</button>
                        
                        </div>
                        </div>



            </div>
            </div>
        </div>
       </div>
  </div>
</template>

<script>

import {fb} from '../firebase';

export default {
  name: "Login",
  props: {
    msg: String
  },
  data(){
      return{
          name:null,
          email:null,
          password:null
      }
  },
  methods:{
      login(){
          fb.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                $('#login').modal('hide');
                this.$router.replace('admin');
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
      },
      register(){
          fb.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then((user) => {
                $('#login').modal('hide');
                this.$router.replace('admin');
            })
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            });
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
