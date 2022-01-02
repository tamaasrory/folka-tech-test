<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto align-items-center">
          <template v-if="isLoggedIn">
            <li class="nav-item">
              <router-link class="nav-link" to="/profile">
                {{ user.name }}
              </router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <div class="input-group" style="width: 436px; margin: 0 12.5px">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Cari Produk"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-primary"
                    type="button"
                    style="width: 85px"
                  >
                    <img :src="require('../assets/search.svg')" alt="" />
                  </button>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <router-link class="nav-link nav-link-header" to="/">
                <img :src="require('../assets/heart.svg')" alt="" />
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link nav-link-header" to="/">
                <img :src="require('../assets/shopping-bag.svg')" alt="" />
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link nav-link-header dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <img :src="require('../assets/user.svg')" alt="" />
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <div class="secondary-menu">
      <ul class="nav nav-pills secondary-menu-nav">
        <li class="nav-item dropdown nav-item-fullhigh">
          <a class="nav-link dropdown-toggle nav-link-fh active">
            <span>Belanja</span>
          </a>
        </li>
        <li class="nav-item nav-item-fullhigh">
          <a class="nav-link nav-link-fh">
            <span>baca-baca</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLoggedIn', 'user'])
  }
}
</script>
