<template>
  <div>
    <Navbar />
    <div>
      <nav aria-label="breadcrumb" style="margin: 24px 70px 17px 70px">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item breadcrumb-symbol">
            <a href="#">Produk</a>
          </li>
          <li
            class="breadcrumb-item breadcrumb-symbol active"
            aria-current="page"
          >
            Roasted Bean
          </li>
        </ol>
      </nav>
    </div>
    <div class="row" style="margin: 0px 70px">
      <div class="col-md-3 pl-0" style="padding-right: 9px">
        <div style="margin: 21px 0">
          <div style="margin: 0 14px">
            <div class="sidebar-container" style="margin-bottom: 18px">
              <span class="sidebar-label">URUTKAN BERDASARKAN</span>
              <img
                :src="require('../assets/chevron-down.svg')"
                class="sidebar-icon"
                alt=""
              />
            </div>
            <div class="sidebar-label" style="margin-bottom: 11px">Harga</div>
            <div style="position: relative; height: 14px">
              <div ref="sliderTrack" class="slider-track"></div>
              <input
                type="range"
                min="0"
                max="1000000"
                v-model="filter.price[0]"
                @input="slideOne()"
              />
              <input
                type="range"
                min="0"
                max="1000000"
                v-model="filter.price[1]"
                @input="slideTwo()"
              />
            </div>
          </div>
          <div class="text-center" style="margin-top: 12px">
            <span class="rp-label">Rp</span>
            <input type="text" class="input-price" v-model="filter.price[0]" />
            <span class="rp-label"> - Rp</span>
            <input type="text" class="input-price" v-model="filter.price[1]" />
          </div>
          <div v-for="(val, idx) in Object.keys(sidebarItems)" :key="idx">
            <div
              class="sidebar-container sidebar-container-box"
              style="margin-top: 9px"
            >
              <span class="sidebar-label text-capitalize">{{ val }}</span>
              <img
                class="sidebar-icon"
                :src="require('../assets/chevron-down.svg')"
                alt=""
              />
            </div>
            <div
              v-for="(val2, idx2) in Object.keys(sidebarItems[val])"
              :key="idx2"
              class="form-check"
            >
              <div class="d-flex">
                <input
                  class="form-check-input align-self-center"
                  type="checkbox"
                  value=""
                />
                <label
                  class="form-check-label align-self-center text-capitalize"
                >
                  {{ val2 }}
                </label>
              </div>
              <span class="form-check-action"
                >( {{ sidebarItems[val][val2] }} )</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9 items-container">
        <div
          class="d-flex justify-content-between align-content-center"
          style="margin-bottom: 27px"
        >
          <div>
            <span class="fs-16px" style="margin-right: 14px">Menampilkan</span>
            <select v-model="filter.limit" style="margin-right: 14px">
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
            </select>
            <span class="fs-16px">dari 132</span>
          </div>
          <div>
            <span class="fs-16px" style="margin-right: 14px">Urutkan</span>
            <select v-model="filter.order">
              <option value="date,DESC">Terbaru</option>
              <option value="product_name,ASC">Nama Produk</option>
              <option value="popular,DESC">Popularitas</option>
              <option value="price,ASC">Harga Terendah</option>
              <option value="price,DESC">Harga Tertinggi</option>
            </select>
          </div>
        </div>
        <div class="row mx-0 px-0">
          <div v-for="(v, i) in datas" :key="i" class="col-md-4 px-0 product">
            <div class="card card-items card-click-able" @click="showDetail(v)">
              <img
                class="card-img-top"
                :src="v.images[0].image_url"
                style="height: 300px"
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
        <div class="text-center pagination-container">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-secondary">
              <img :src="require('../assets/chevron-left.svg')" alt="" />
            </button>
            <button type="button" class="btn btn-secondary">1</button>
            <button type="button" class="btn btn-secondary">2</button>
            <button type="button" class="btn btn-secondary">3</button>
            <button type="button" class="btn btn-secondary">
              <img :src="require('../assets/chevron-right.svg')" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Rating from '../components/Rating.vue'
// import axios from 'axios'

export default {
  name: 'ProductList',
  components: {
    Navbar,
    Rating
  },
  data () {
    return {
      datas: [],
      filter: {
        price: [50000, 700000],
        limit: 12,
        order: 'date,DESC',
        page: 1,
        type_slug: 'roasted-bean-2',
        layout_type: 'list_layout',
        status: 'active'
      },
      minGap: 0,
      sliderMaxValue: 1000000,
      sidebarItems: {
        origin: {
          aceh: 8,
          semarang: 2,
          bandung: 7,
          jawa: 5,
          amerika: 6,
          'lain-lain': 8
        },
        species: {
          arabika: 128,
          robusta: 23,
          blend: 9
        },
        'roast level': {
          'light roast': 8,
          'medium roast': 2,
          'dark roast': 7,
          'light to medium roast': 5
        },
        tasted: {
          sweet: 18,
          floral: 21,
          fruity: 7,
          nutty: 5,
          cocoa: 21,
          spices: 18
        },
        processing: {
          'honey white': 8,
          natural: 2,
          'honey gold': 7,
          'honey yellow': 5
        }
      }
    }
  },
  mounted () {
    this.slideOne()
    this.slideTwo()
    this.loadData()
  },
  methods: {
    slideOne: function () {
      if (
        parseInt(this.filter.price[1]) - parseInt(this.filter.price[0]) <=
        this.minGap
      ) {
        this.filter.price[0] = parseInt(this.filter.price[1]) - this.minGap
      }
      this.fillColor()
    },
    slideTwo: function () {
      if (
        parseInt(this.filter.price[1]) - parseInt(this.filter.price[0]) <=
        this.minGap
      ) {
        this.filter.price[1] = parseInt(this.filter.price[1]) + this.minGap
      }
      this.fillColor()
    },
    fillColor: function () {
      const percent1 = (this.filter.price[0] / this.sliderMaxValue) * 100
      const percent2 = (this.filter.price[1] / this.sliderMaxValue) * 100
      this.$refs.sliderTrack.style.background = `linear-gradient(to right, #757575 ${percent1}% , #EB3F36 ${percent1}% , #EB3F36 ${percent2}%, #757575 ${percent2}%)`
    },
    loadData () {
      const query = new URLSearchParams(this.filter).toString()
      fetch(`https://api.lakkon.id/api/v1/products?${query}`)
        .then((response) => response.json())
        .then((response) => {
          this.datas = response.data
        })
    },
    rupiah (number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(number)
    },
    showDetail (data) {
      this.$router.push({
        name: 'DetailProduct',
        params: { slug: data.slug, detail: data }
      })
    }
  }
}
</script>

<style scoped>
</style>
