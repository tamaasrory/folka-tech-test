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
          <div class="card-header">
            <span v-show="step === 0">Daftar Sekarang</span>
            <div v-show="step === 1">
              <div
                class="d-flex align-content-center"
                style="height: 25px; cursor: pointer"
                @click="step = 0"
              >
                <i class="mdi mdi-arrow-left mdi-24px"></i>
                <span style="font-size: 18px; margin-left: 5px; cursor: pointer"
                  >Kembali</span
                >
              </div>
            </div>
          </div>
          <div class="card-body">
            <div
              class="alert alert-danger"
              v-for="(error, index) in errors"
              :key="index"
            >
              {{ error[0] }}
            </div>
            <form @submit.prevent="register">
              <div v-show="step === 0">
                <div class="form-group mb-25px">
                  <input
                    v-model="form.nama_depan"
                    type="text"
                    class="form-control"
                    placeholder="Nama Depan"
                  />
                </div>
                <div class="form-group mb-25px">
                  <input
                    v-model="form.nama_belakang"
                    type="text"
                    class="form-control"
                    placeholder="Nama Belakang"
                  />
                </div>
                <div class="form-group mb-25px">
                  <input
                    v-model="form.email"
                    type="text"
                    class="form-control"
                    placeholder="Email"
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-primary"
                  style="margin-top: 21px"
                  @click="step = 1"
                >
                  selanjutnya
                </button>
              </div>
              <div v-show="step === 1">
                <div class="form-group mb-25px">
                  <input
                    v-model="form.phone"
                    type="text"
                    class="form-control"
                    placeholder="Nomor Telepon"
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
                <div class="input-group">
                  <input
                    v-model="form.confirm_password"
                    :type="password.show2 ? 'text' : 'password'"
                    class="form-control"
                    placeholder="Konfirmasi Password"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-text text-red"
                      type="button"
                      @click="password.show2 = !password.show2"
                    >
                      {{ password.show2 ? "Hide" : "Show" }}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-primary"
                  style="margin-top: 21px"
                >
                  daftar
                </button>
              </div>
            </form>
            <div class="divider" style="margin: 39px 37px" />
            <div style="text-align: center">
              <span class="text">Sudah punya akun?&nbsp;</span>
              <router-link class="anchor" to="/login">Masuk</router-link>
            </div>
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
        name: '',
        email: '',
        password: '',
        phone: ''
      },
      step: 0,
      password: {
        show1: false,
        show2: false
      },
      errors: null
    }
  },
  methods: {
    register: function () {
      this.$store
        .dispatch('register', this.form)
        .then((response) => {
          this.$router.push({ name: 'Login' })
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
    }
  }
}
</script>
