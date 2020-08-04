<template>
  <div>
    <p v-if="courses.length === 0">没有课程</p>
    <div v-else>
      <transition-group name="fade">
        <div
          v-for="(c, index) in courses"
          :key="index"
          :class="{ active: active === c }"
          @click="onClick(c)"
        >
          <!-- <router-link :to="`/admin/course/${c.name}`"> -->
          {{ c.name }} -- {{ c.price | currency }}
          <!-- </router-link> -->
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "",
    };
  },
  props: {
    courses: {
      default: [],
    },
  },
  filters: {
    currency: function(value, symbol = "￥") {
      return symbol + value;
    },
  },
  methods: {
    onClick(c) {
      this.active = c;
      this.$router.push({
        name: "detail",
        params: { name: c.name },
      });
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #ddd;
}
/* 动画样式 */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}
</style>
