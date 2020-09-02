<template>
  <div>
    <div class="write-btn">
      <el-button @click="submit" type="primary">提交</el-button>
    </div>
    <el-row>
      <el-col :span="12">
        <textarea
          ref="editor"
          class="md-editor"
          :value="content"
          @input="update"
        ></textarea>
      </el-col>
      <el-col :span="12">
        <div class="markdown-body" v-html="compiledContent"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import marked from "marked";
import lodash from "lodash";

export default {
  data() {
    return {
      content: `# 开课吧
* 上课
* 吃饭
* 写代码`,
      value: ""
    };
  },
  mounted() {
    // 不需要响应式
    this.timer = null;
    this.bindEvents();
  },
  computed: {
    compiledContent() {
      return marked(this.content, {});
    }
  },
  methods: {
    bindEvents() {
      this.$refs.editor.addEventListener("paste", async e => {
        const files = e.clipboardData.items;
        console.log(e.clipboardData);
        // e.preventDefault();
      });
      this.$refs.editor.addEventListener("drop", async e => {
        const files = e.dataTransfer.files;
        console.log("drop", files);
        e.preventDefault();
      });
    },
    async submit() {
      let ret = await this.$http.post("/article/create", {
        content: this.content, // 一般不显示，容易被爬取
        compiledContent: this.compiledContent
      });
    },
    update(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.content = e.target.value;
      }, 350);
    }
  }
};
</script>

<style lang="stylus">
.md-editor
  width 100%
  height 100vh
  outline none
.write-btn
  position fixed
  z-index 100
  right 30px
  top 10px
</style>
