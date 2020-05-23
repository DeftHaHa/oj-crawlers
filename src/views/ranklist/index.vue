<template>
  <div class="app-container">
    <el-table
      ref="RankList" :data="users_oj_info" v-loading="listLoading" stripe border fit highlight-current-row
      style="width: 100%">
      <el-table-column label="姓名" width="180">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="cf Rating">
        <template slot-scope="{row}">
          <span>{{ row.oj_info.codefoces.info.Rating }}</span>
        </template>
      </el-table-column>

      <el-table-column label="codeforces">
        <template slot-scope="{row}">
          <span>{{ row.class }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班级">
        <template slot-scope="{row}">
          <span>{{ row.class }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班级">
        <template slot-scope="{row}">
          <span>{{ row.class }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班级">
        <template slot-scope="{row}">
          <span>{{ row.class }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  let users_oj_info = require('@/utils/crawler_util/users_oj_info')
  console.log(users_oj_info)
  export default {
    name: 'RankList',
    data() {
      return {
        users_oj_info: users_oj_info,
        listLoading : false
      }
    }
  }
</script>

<style scoped>

</style>
