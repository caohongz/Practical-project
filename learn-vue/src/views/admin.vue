<template>
  <div id="app">
    <Message ref="msgSuccess" class="success">
      <template v-slot:title>
        <h2>恭喜</h2>
      </template>
      <template>
        新增课程成功！
      </template>
    </Message>
    <Message ref="msgWarning" class="warning">
      <template>
        失败
      </template>
    </Message>
    <p :title="title">{{ title }}</p>
    <CourseAdd
      v-model="course"
      @add-course="addCourse"
      @clear-course="clearCourse"
    ></CourseAdd>
    <CourseList :courses="courses"></CourseList>
    <p>{{ total }}</p>
    <keep-alive include="admin">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import CourseList from "@/components/CoursesList";
import CourseAdd from "@/components/CourseAdd";
import Message from "@/components/Message";
import { getCourses } from "@/api/courses";

export default {
  name: "App",
  components: {
    CourseList,
    CourseAdd,
    Message,
  },
  data() {
    return {
      title: "开课吧购物车",
      course: "",
      courses: [],
      price: 0,
    };
  },
  async created() {
    this.courses = await getCourses();
  },
  watch: {
    // eslint-disable-next-line
    courses(newValue, oldValue) {
      this.courses.forEach((item) => {
        this.$set(item, "price", this.price);
      });
    },
  },
  computed: {
    total() {
      return this.courses.length + "门";
    },
  },
  methods: {
    addCourse() {
      if (this.course) {
        const courses = { name: this.course };
        this.courses.push(courses);
        console.log(this.courses);
        this.course = "";
        this.$refs.msgSuccess.toggle();
      } else {
        this.$refs.msgWarning.toggle();
      }
    },
    clearCourse() {
      this.courses = [];
      this.course = "";
    },
  },
};
</script>

<style></style>
