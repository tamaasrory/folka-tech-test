<template>
  <div class="rating">
    <ul class="list">
      <li
        @click="rate(star)"
        v-for="star in maxStars"
        :class="{ active: star <= stars }"
        :key="star.stars"
        class="star"
      >
        <i :class="star <= stars ? 'mdi mdi-star' : 'mdi mdi-star'"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Rating',
  props: ['grade', 'maxStars'],
  data () {
    return {
      stars: this.grade
    }
  },
  methods: {
    rate (star) {
      if (typeof star === 'number' && star <= this.maxStars && star >= 0) {
        this.stars = this.stars === star ? star - 1 : star
      }
    }
  }
}
</script>

<style scoped>
.rating {
  display: flex;
  flex-direction: column;
  color: #b7b7b7;
  border-radius: 8px;
}
.rating .list {
  padding: 0;
  margin: 0;
  height: 24px;
}
.mdi-star::before {
  line-height: normal !important;
}
.rating .list:hover .star {
  color: #ffe100;
}
.rating .list .star {
  display: inline-block;
  font-size: 24px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
.rating .list .star:hover ~ .star:not(.active) {
  color: inherit;
}
.rating .list .star:first-child {
  margin-left: 0;
}
.rating .list .star.active {
  color: #ffe100;
}
.rating .info {
  margin-top: 15px;
  font-size: 16px;
  text-align: center;
  display: table;
}
.rating .info .divider {
  margin: 0 5px;
  font-size: 16px;
}
.rating .info .score-max {
  font-size: 16px;
  vertical-align: sub;
}
</style>
