<template>
    <div class="hero">
        <div class="container h-100">
            <div class="row p-5 h-100 justify-content-center align-items-center text-left">
            <div class="col-md-5">
                <div class="hero-content">
                      <h1 class="hero-title">Vue Shop for Developers</h1>
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
                        </p>
                    <div class="hero-btn  mt-5">
                        <button class="btn custom-btn btn-info mr-4">Explore</button>
                        <button class="btn custom-btn btn-outline-secondary">Products</button>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="graphic">    
                    <img src="/img/svg/graphic.svg" alt="image">
                </div>
            </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
  name: "Hero",
  props: {
    msg: String
  }
};
</script>


<style scoped lang="scss">
    .hero{
        padding-top: 0.7rem;
    }
</style>