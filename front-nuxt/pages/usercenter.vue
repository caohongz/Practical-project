<template>
  <div>
    <h1>用户中心</h1>
    <i style="display:none" class="el-icon-loading"></i>
    <div>
      <div ref="drag" id="drag">
        <input type="file" name="file" id="file" @change="handleFileChange" />
      </div>
      <p v-if="!typeofpic" style="color:red">格式错误</p>
    </div>
    <!-- <div>
      <el-progress
        :stroke-width="20"
        :text-inside="true"
        :percentage="uploadProgress"
      ></el-progress>
    </div> -->
    <div>
      <p>hash进度</p>
      <el-progress
        :stroke-width="20"
        :text-inside="true"
        :percentage="hashProgress"
      ></el-progress>
    </div>
    <div class="cube-container" :style="{ width: cubeWidth + 'px' }">
      <div class="cube" v-for="chunk in chunks" :key="chunk.index">
        <div
          :class="{
            uploading: chunk.progress > 0 && chunk.progress < 100,
            success: chunk.progress == 100,
            error: chunk.progress < 0
          }"
          :style="{ height: chunk.progress + '%' }"
        >
          <i
            class="el-icon-loading"
            style="color:#f56c6c"
            v-if="chunk.progress < 100 && chunk.progress > 0"
          ></i>
        </div>
      </div>
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
import sparkMD5 from "spark-md5";
const CHUNK_SIZE = 0.1 * 1024 * 1024;
export default {
  data() {
    return {
      form: [],
      chunks: [],
      hash: "",
      file: null,
      // uploadProgress: 0,
      typeofpic: true,
      hashProgress: 0
    };
  },
  computed: {
    cubeWidth() {
      return Math.ceil(Math.sqrt(this.chunks.length)) * 16;
    },
    uploadProgress() {
      if (!this.file || this.chunks.length) {
        return 0;
      }
      const loaded = this.chunks
        .map(item => item.chunk.size * item.progress)
        .reduce((acc, cur) => acc + cur, 0);
      return ((loaded * 100) / this.file.size).toFixed(2);
    }
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
      // console.log(chunks);
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
    async calculateHashIdle(chunks) {
      return new Promise(resolve => {
        const spark = new sparkMD5.ArrayBuffer();
        let count = 0;
        const appendToSpark = async file => {
          return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = e => {
              spark.append(e.target.result);
              resolve();
            };
          });
        };
        const workLoop = async deadline => {
          while (count < chunks.length && deadline.timeRemaining() > 1) {
            await appendToSpark(chunks[count].file);
            count++;
            if (count < chunks.length) {
              this.hashProgress = Number(
                ((100 * count) / chunks.length).toFixed(2)
              );
            } else {
              this.hashProgress = 100;
              resolve(spark.end());
            }
          }
          window.requestIdleCallback(workLoop);
        };
        window.requestIdleCallback(workLoop);
      });
    },
    async uploadFile() {
      if (!this.file) {
        return;
      }
      console.log("test");
      const chunks = this.createFileChunk(this.file);

      // const hash = await this.calculateHashWorker(this.chunks);
      const hash = await this.calculateHashIdle(chunks);
      console.log("hash", hash);
      // console.log("hash1", hash1);
      this.hash = hash;
      const {
        data: { uploaded, uploadedList }
      } = await this.$http.post("/checkfile", {
        hash: this.hash,
        ext: this.file.name.split(".").pop()
      });
      if (uploaded) {
        return this.$message.success("秒传成功");
      }
      this.chunks = chunks.map((chunk, index) => {
        const name = hash + "-" + index;
        return {
          hash,
          name,
          index,
          chunk: chunk.file,
          progress: uploadedList.indexOf(name) > -1 ? 100 : 0
        };
      });
      console.log("test", this.chunks);

      await this.uploadChunks(uploadedList);
    },
    async uploadChunks(uploadedList) {
      const requests = this.chunks
        .filter(form => uploadedList.indexOf(form.name) == -1)
        .map((chunk, index) => {
          const form = new FormData();
          form.append("chunk", chunk.chunk);
          form.append("hash", chunk.hash);
          form.append("name", chunk.name);
          form.append("index", chunk.index);
          // form.append("error", 0);
          console.log(chunk);
          return { form, index: chunk.index, error: 0 };
        });

      console.log("test", requests);
      // await Promise.all(requests);
      await this.sendRequest(requests);
      await this.mergeRequest();
    },
    async sendRequest(chunks, limit = 4) {
      return new Promise((resolve, reject) => {
        const len = chunks.length;
        let count = 0;
        let isStop = false;
        const start = async () => {
          if (isStop) {
            return;
          }
          const task = chunks.shift();
          if (task) {
            const { form, index, error } = task;
            console.log("form", error);
            try {
              await this.$http.post("/uploadfile", form, {
                onUploadProgress: progress => {
                  this.chunks[index].progress = Number(
                    ((progress.loaded / progress.total) * 100).toFixed(2)
                  );
                }
              });
              if (count == len - 1) {
                resolve();
              } else {
                count++;
                start();
              }
            } catch (e) {
              this.chunks[index].progress = -1;
              if (task.error < 3) {
                task.error++;
                chunks.unshift(task);
                start();
              } else {
                isStop = true;
                reject();
              }
            }
          }
        };
        while (limit > 0) {
          setTimeout(() => {
            start();
          }, Math.random() * 2000);
          limit -= 1;
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
    },
    async mergeRequest() {
      this.$http.post("mergefile", {
        ext: this.file.name.split(".").pop(),
        size: CHUNK_SIZE,
        hash: this.hash
      });
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
.cube-container
  .cube
    width 14px
    height 14px
    line-height 12px
    border 1px black solid
    background #eee
    float left
    >.success
      background green
    >.uploading
      background blue
    >.error
      background red
</style>
