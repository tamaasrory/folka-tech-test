<template>
  <div>
    <Navbar />
    <div>
      <nav aria-label="breadcrumb" style="margin: 24px 70px 17px 70px">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li
            class="breadcrumb-item breadcrumb-symbol active"
            aria-current="page"
          >
            {{ detail.name }}
          </li>
        </ol>
      </nav>
    </div>
    <div class="row" style="margin: 0px 70px">
      <div class="col-md-6"></div>
      <div class="col-md-6">
        <h4 class="detail-header">{{ detail.name }}</h4>
        <div class="detail-store-name">{{ detail.seller.store_name }}</div>
        <div style="margin-bottom: 20px" class="d-flex align-items-center">
          <Rating :grade="5" :maxStars="5" />
          <span class="fs-16px pl-2">(7)</span>
        </div>
        <div class="detail-price" style="margin-bottom: 30px">
          {{ rupiah(detail.price) }}
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="input-group detail-input-group">
              <div class="input-group-prepend">
                <button type="button" class="btn">
                  <img :src="require('../assets/minus.svg')" alt="" />
                </button>
              </div>
              <input
                type="text"
                class="form-control text-center detail-qty"
                value="1"
              />
              <div class="input-group-append">
                <button type="button" class="btn">
                  <img :src="require('../assets/plus-add.svg')" alt="" />
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <button class="btn btn-primary btn-detail">
              TAMBAH KE KERANJANG
            </button>
          </div>
          <div class="col-md-2 pl-sm-0 pl-2">
            <button class="btn btn-light" style="height: 53px; width: 53px">
              <img :src="require('../assets/heart-red.svg')" alt="" />
            </button>
          </div>
        </div>
        <div class="detail-short-des">
          {{ detail.short_description }}
        </div>
      </div>
    </div>
    <div style="margin: 84px 70px 26px 70px">
      <ul class="text-center">
        <li
          :class="`tab-header ${active_tab === 1 ? 'active' : ''}`"
          @click="active_tab = 1"
        >
          Deskripsi
        </li>
        <li
          :class="`tab-header ${active_tab === 2 ? 'active' : ''}`"
          @click="active_tab = 2"
        >
          Informasi
        </li>
      </ul>
    </div>
    <div class="detail-long-des" style="margin: 10px 70px 10px 70px">
      <div v-show="active_tab === 1">{{ detail.description }}</div>
      <div v-show="active_tab === 2">{{ detail.information.map(v => {return v.name+' : '+v.value;}).join('\n') }}</div>
    </div>
    <div class="detail-rekomendasi text-center">
      <div>REKOMENDASI UNTUK ANDA</div>
      <div class="detail-border-bottom"></div>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Rating from '../components/Rating.vue'

export default {
  props: {
    slug: { required: true, type: [String] },
    detail: { required: true, type: [Object] }
  },
  components: {
    Navbar,
    Rating
  },
  data () {
    return {
      active_tab: 1
    }
  },
  mounted () {},
  methods: {
    rupiah (number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(number)
    }
  }
}
</script>

<style scoped>
</style>
