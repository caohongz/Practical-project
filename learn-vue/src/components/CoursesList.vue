<template>
  <div>
    <p v-if="courses.length === 0">没有课程</p>
    <div v-else>
      <transition-group name="fade">
        <div
          v-for="(c, index) in courses"
          :key="index"
          :class="{ active: active === c }"
          @click="active = c"
        >
          {{ c.name }} -- {{ c.price | currency }}
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
