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
          <div class="card-header">Masuk</div>
          <div class="card-body">
            <div
              class="alert alert-danger alert-dismissible fade show"
              v-for="(error, index) in errors"
              :key="index"
            >
              {{ error[0] }}
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
                @click="removeAlert(index)"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.prevent="userLogin">
              <div class="form-group mb-25px">
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
              <div class="input-group">
                <input
                  v-model="form.password"
                  :type="password.show1 ? 'text' : 'password'"
                  class="form-control"
                  placeholder="Password"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-text text-red"
                    type="button"
                    @click="password.show1 = !password.show1"
                  >
                    {{ password.show1 ? "Hide" : "Show" }}
                  </button>
                </div>
              </div>
              <router-link class="anchor text-lupa-password" to="/"
                >Lupa Password ?</router-link
              >
              <button type="submit" class="btn btn-primary">masuk</button>
              <div class="divider" style="margin: 39px 37px" />
              <div style="text-align: center">
                <span class="text">Belum punya akun?&nbsp;</span>
                <router-link class="anchor" to="/register"
                  >Daftar Sekarang</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      password: {
        show1: false
      },
      errors: null
    }
  },
  methods: {
    userLogin () {
      this.$store
        .dispatch('login', this.form)
        .then((response) => {
          this.$router.push({ name: 'ProductList' })
        })
        .catch((error) => {
          this.errors = error.response.data.data || { error: [error.response.data.message] }
        })
    },
    removeAlert (index) {
      const tmp = JSON.parse(JSON.stringify(this.errors))
      delete tmp[index]
      this.errors = tmp
    }
  }
}
</script>
