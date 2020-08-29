<template>
  <div>
    <h1>用户中心</h1>
    <div>
      <div ref="drag" id="drag">
        <input type="file" name="file" id="file" @change="handleFileChange" />
      </div>
      <p v-if="!typeofpic" style="color:red">格式错误</p>
    </div>
    <div>
      <el-progress
        :stroke-width="20"
        :text-inside="true"
        :percentage="uploadProgress"
      ></el-progress>
    </div>
    <div>
      <p>hash进度</p>
      <el-progress
        :stroke-width="20"
        :text-inside="true"
        :percentage="hashProgress"
      ></el-progress>
    </div>
    <div>
      <el-button :disabled="!typeofpic" @click="uploadFile">upload</el-button>
    </div>
    <el-table :data="form" style="width: 100%">
      <el-table-column prop="avatar" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="email" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="nickname" label="地址"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >重置</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const CHUNK_SIZE = 1 * 1024 * 1024;
export default {
  data() {
    return {
      form: [],
      chunks: [],
      file: null,
      uploadProgress: 0,
      typeofpic: true,
      hashProgress: 0
    };
  },
  async mounted() {
    const ret = await this.$http.get("/user/info");
    this.bindEvents();
    if (ret) {
      this.form.push(ret.data);
      // console.log(this.form);
    }
  },
  methods: {
    async blobToString(blob) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsBinaryString(blob);

        reader.onload = function() {
          console.log(reader.result);
          const ret = reader.result
            .split("")
            .map(v => v.charCodeAt())
            .map(v => v.toString(16).toUpperCase())
            .map(v => v.padStart(2, "0"))
            .join(" ");

          resolve(ret);
        };
      });
    },
    async isGif(file) {
      const ret = await this.blobToString(file.slice(0, 6));

      const isGif = ret == "47 49 46 38 39 61" || ret == "47 49 46 38 37 61";
      console.log(isGif);

      return isGif;
    },
    isImage(file) {
      const ret = this.isGif(file);

      return ret;
    },
    bindEvents() {
      const drag = this.$refs.drag;
      drag.addEventListener("dragover", e => {
        drag.style.borderColor = "red";
        e.preventDefault();
      });
      drag.addEventListener("dragleave", e => {
        drag.style.borderColor = "#eee";
        e.preventDefault();
      });
      drag.addEventListener("drop", e => {
        const fileList = e.dataTransfer.files;
        drag.style.borderColor = "#eee";
        this.file = fileList[0];
        console.log(e.dataTransfer);
        e.preventDefault();
      });
    },
    handleClick(row) {
      console.log("test", row);
      let email = row.email;
      const ret = this.$http.post("/user/reset?email=" + email);
      if (ret) {
        console.log("success: ", ret);
      }
    },
    createFileChunk(file, size = CHUNK_SIZE) {
      const chunks = [];
      let cur = 0;
      while (cur < this.file.size) {
        chunks.push({ index: cur, file: this.file.slice(cur, cur + size) });
        cur += size;
      }
      console.log(chunks);
      return chunks;
    },
    async calculateHashWorker() {
      return new Promise(resolve => {
        this.worker = new Worker("/hash.js");
        this.worker.postMessage({ chunks: this.chunks });
        this.worker.onmessage = e => {
          const { progress, hash } = e.data;
          this.hashProgress = Number(progress.toFixed(2));
          if (hash) {
            resolve(hash);
          }
        };
      });
    },
    async calculateHashIdle() {},
    async uploadFile() {
      this.chunks = this.createFileChunk(this.file);
      const hash = await this.calculateHashWorker(this.chunks);
      console.log("hash", hash);
      const form = new FormData();
      form.append("name", "file");
      form.append("file", this.file);
      console.log(form.get("file"));

      const ret = await this.$http.post("/uploadfile", form, {
        onUploadProgress: progress => {
          this.uploadProgress = Number(
            ((progress.loaded / progress.total) * 100).toFixed(2)
          );
        }
      });
    },
    async handleFileChange(e) {
      const [file] = e.target.files;
      // console.log(e.target.files, file);
      if (!file) {
        return;
      }
      this.file = file;
      // if (!(await this.isImage(this.file))) {
      //   console.log("格式不对");
      //   this.typeofpic = false;
      //   return;
      // }
      this.typeofpic = true;
    }
  }
};
</script>

<style lang="stylus">
#drag
  height 100px
  line-height 100px
  border 2px dashed #eee
  text-align center
  vertical-align middle
</style>
