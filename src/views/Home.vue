<template>
  <div class="container-fluid">
    <div
      class="row"
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      "
    >
      <div class="col-12 col-sm-8 col-md-7 col-lg-6 col-xl-5">
        <div class="card card-cutome">
          <div class="card-header" style="font-size: 30px">Hi, I'm Tama Asrory</div>
          <div class="card-body">
            This is url available in this site
            <ul>
              <li>
                <router-link to="/login">login</router-link>
              </li>
              <li>
                <router-link to="/register">register</router-link>
              </li>
              <li>
                <router-link to="/product-list">List Product & detail product <i>(login required)</i></router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>
<style scoped>
a {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  text-transform: capitalize;
}
</style>
