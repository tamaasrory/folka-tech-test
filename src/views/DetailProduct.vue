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
      <div class="col-md-6">
        <div style="background: rgba(255, 255, 255, 0.75);
border: 1px solid #D8D8D8;
box-sizing: border-box;" class="justify-content-center d-flex">
          <img :src="currentImage" alt="" height="500px" />
        </div>
        <div class="mt-4">
          <ul class="detail-images-box">
            <li class="detail-images-item" v-for="(v, i) in detail.images" :key="i">
              <img :src="v.image_url" alt="" height="170px" width="170px" @click="currentImage=v.image_url" />
            </li>
          </ul>
        </div>
      </div>
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
    <div
      class="detail-description"
      style="margin: 10px 70px 10px 70px; padding: 20px"
    >
      <div v-show="active_tab === 1">{{ detail.description }}</div>
      <div v-show="active_tab === 2">
        {{
          detail.information
            .map((v) => {
              return v.name + " : " + v.value;
            })
            .join("\n")
        }}
      </div>
    </div>
    <div class="detail-rekomendasi text-center">
      <div style="padding: 21px">REKOMENDASI UNTUK ANDA</div>
      <div class="detail-border-bottom"></div>
    </div>
    <div style="margin-left: 75px; margin-right: 75px">
      <div class="row mx-0 px-0">
        <div v-for="(v, i) in datas" :key="i" class="col-md-4 px-0 product">
          <div
            class="card card-items-lg card-click-able"
            @click="showDetail(v)"
          >
            <img
              class="card-img-top mx-auto"
              :src="v.images[0].image_url"
              style="height: 300px; width: 300px"
            />
            <div class="card-body text-center" style="margin-top: 21px">
              <h6 class="product-name" style="margin-bottom: 10px">
                {{ v.name }}
              </h6>
              <div class="store-name" style="margin-bottom: 10px">
                {{ v.seller.store_name }}
              </div>
              <div
                style="margin-bottom: 10px"
                class="d-flex justify-content-center align-items-center"
              >
                <Rating :grade="5" :maxStars="5" />
                <span class="fs-16px">( 7 )</span>
              </div>
              <div class="product-price">
                {{ rupiah(v.price) }}
              </div>
            </div>
          </div>
          <div class="product-btn">
            <div class="d-flex">
              <div class="btn btn-overlay">
                <img :src="require('../assets/heart.svg')" alt="" />
              </div>
              <div class="btn btn-overlay">
                <img :src="require('../assets/shopping-bag.svg')" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
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
      active_tab: 1,
      datas: [],
      currentImage: ''
    }
  },
  mounted () {
    this.loadRecom()
    this.currentImage = this.detail.images[0].image_url
  },
  methods: {
    rupiah (number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(number)
    },
    loadRecom () {
      const query = new URLSearchParams({
        price: [50000, 700000],
        limit: 3,
        order: 'date,DESC',
        page: 2,
        type_slug: 'roasted-bean-2',
        layout_type: 'list_layout',
        status: 'active'
      }).toString()
      fetch(`https://api.lakkon.id/api/v1/products?${query}`)
        .then((response) => response.json())
        .then((response) => {
          this.datas = response.data
        })
    }
  }
}
</script>

<style scoped>
</style>
