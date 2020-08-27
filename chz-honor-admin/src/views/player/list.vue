<template>
  <div class="app-container">
    <div>
      <ElInput
        v-model="listQuery.accountname"
        placeholder="$t('player.accountname')"
        style="width:200px"
        @keyup.enter.native="handleFilter"
      ></ElInput>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">{{
        $t("player.btnFilter")
      }}</el-button>
      <el-button type="success" icon="el-icon-edit" @click="handleCreate">{{
        $t("player.btnCreate")
      }}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width:100%"
    >
      <el-table-column label="ID" align="center">
        <template v-slot="{ row }">
          {{ row.id }}
        </template>
      </el-table-column>
      <el-table-column label="账号名" align="center">
        <template v-slot="{ row }">
          {{ row.accountname }}
        </template>
      </el-table-column>
      <el-table-column label="更新" align="center">
        <template v-slot="scope">
          <router-link :to="'/players/edit/' + scope.row.id">
            <el-button type="primary" icon="el-icon-eidt">更新</el-button>
          </router-link>
          <el-button type="danger" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    ></pagination>
  </div>
</template>

<script lang="ts">
// import Vue from "vue";
import { Vue, Component } from "vue-property-decorator";
import { getPlayers, deletePlayer } from "@/api/players";
import { Player } from "../../api/types";
import Pagination from "@/components/Pagination";
import { deletePlayer } from "../../../mock/api";

@Component({
  name: "PlayerList",
  components: {
    Pagination
  }
})
export default class list extends Vue {
  list: Player[] = [];
  listLoading = true;
  total = 0;
  listQuery = {
    page: 1,
    limit: 10,
    accountname: undefined
  };
  created() {
    this.getList();
  }

  async getList() {
    this.listLoading = true;
    const { data } = await getPlayers(this.listQuery);
    console.log(data);
    this.total = data.total;
    this.list = data.players;
    this.listLoading = false;
  }

  handleFilter() {
    this.listQuery.page = 1;
    this.getList();
  }

  handleCreate() {
    this.$router.push("/players/create");
  }

  handleDelete(scope: any) {
    const { $index, row } = scope;
    this.$confirm("确定删除吗？", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(async () => {
        await deletePlayer(row.id);
        this.list.splice($index, 1);
        this.$message({
          type: "message",
          message: "删除成功！"
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
}
</script>

<style scoped></style>
