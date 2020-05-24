<template>
  <div class="app-container" style="padding-bottom: 0px">
    <div class="filter-container" ref="checked_showclass">
      <el-checkbox v-model="checked_showclass">显示班级</el-checkbox>
    </div>
    <el-table
      ref="RankList" :data="users_oj_info" v-loading="listLoading" stripe border fit highlight-current-row
      style="width: 100%" :height="tableHeight">
      <el-table-column label="班级" v-if="checked_showclass">
        <template slot-scope="{row}">
          <span>{{ row.class }}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Rating">
        <template slot-scope="{row}">
          <i :class="cell_icon_class(row['oj_info']['codeforces']['info']['rating'])"
             v-if="load_icon(row['oj_info']['codeforces']['info']['rating'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['info']['rating'])"
                :style="'color:'+rating_color(row['oj_info']['codeforces']['info']['rating'])+';font-weight:bold'">
            {{row['oj_info']['codeforces']['info']['rating']}}
          </span>
          <span>/</span>
          <i :class="cell_icon_class(row['oj_info']['codeforces']['info']['maxRating'])"
             v-if="load_icon(row['oj_info']['codeforces']['info']['maxRating'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['info']['maxRating'])"
                :style="'color:'+rating_color(row['oj_info']['codeforces']['info']['maxRating'])+';font-weight:bold'">
            {{row['oj_info']['codeforces']['info']['maxRating']}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="Cf">
        <template slot-scope="{row}">
          <i :class="cell_icon_class(row['oj_info']['codeforces']['solved'])"
             v-if="load_icon(row['oj_info']['codeforces']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{row['oj_info']['codeforces']['solved']}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="洛谷">
        <template slot-scope="{row}">
          <i :class="cell_icon_class(row['oj_info']['codeforces']['solved'])"
             v-if="load_icon(row['oj_info']['codeforces']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{row['oj_info']['codeforces']['solved']}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="vJ">
        <template slot-scope="{row}">
          <i :class="cell_icon_class(row['oj_info']['codeforces']['solved'])"
             v-if="load_icon(row['oj_info']['codeforces']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{row['oj_info']['codeforces']['solved']}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="牛课">
        <template slot-scope="{row}">
          <i :class="cell_icon_class(row['oj_info']['codeforces']['solved'])"
             v-if="load_icon(row['oj_info']['codeforces']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{row['oj_info']['codeforces']['solved']}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="HDU">
        <template slot-scope="{row}">
          <i :class="cell_icon_class(row['oj_info']['codeforces']['solved'])"
             v-if="load_icon(row['oj_info']['codeforces']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{row['oj_info']['codeforces']['solved']}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="PutongOJ">
        <template slot-scope="{row}">
          <i :class="cell_icon_class(row['oj_info']['codeforces']['solved'])"
             v-if="load_icon(row['oj_info']['codeforces']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{row['oj_info']['codeforces']['solved']}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="PTA">
        <template slot-scope="{row}">
          <i :class="cell_icon_class(row['oj_info']['codeforces']['solved'])"
             v-if="load_icon(row['oj_info']['codeforces']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{row['oj_info']['codeforces']['solved']}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="计蒜客">
        <template slot-scope="{row}">
          <i :class="cell_icon_class(row['oj_info']['codeforces']['solved'])"
             v-if="load_icon(row['oj_info']['codeforces']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{row['oj_info']['codeforces']['solved']}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="其他">
        <template slot-scope="{row}">
          <i :class="cell_icon_class(row['oj_info']['codeforces']['solved'])"
             v-if="load_icon(row['oj_info']['codeforces']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{row['oj_info']['codeforces']['solved']}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="提交">
        <template slot-scope="{row}">
          <i :class="cell_icon_class(row['oj_info']['codeforces']['solved'])"
             v-if="load_icon(row['oj_info']['codeforces']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{row['oj_info']['codeforces']['solved']}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="AC">
        <template slot-scope="{row}">
          <i :class="cell_icon_class(row['oj_info']['codeforces']['solved'])"
             v-if="load_icon(row['oj_info']['codeforces']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{row['oj_info']['codeforces']['solved']}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="Title">
        <template slot-scope="{row}">
          <i :class="cell_icon_class(row['oj_info']['codeforces']['solved'])"
             v-if="load_icon(row['oj_info']['codeforces']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{row['oj_info']['codeforces']['solved']}}
          </span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
  let users_oj_info = require('@/utils/crawler_util/users_oj_info')
  users_oj_info[0]['oj_info']['codeforces']['info']['rating'] = 1600
  users_oj_info[0]['oj_info']['codeforces']['info']['maxRating'] = 2400

  console.log(users_oj_info)
  export default {
    name: 'RankList',
    data() {
      return {
        checked_showclass: true,  //显示班级列
        listLoading: false,
        users_oj_info: users_oj_info,
        tableHeight: '100%',
      }
    },
    mounted: function() {
      //el-table表格高度监听
      this.$nextTick(function() {
        this.tableHeight = window.innerHeight - this.$refs.RankList.$el.offsetTop - 50
        // 监听窗口大小变化
        let self = this
        window.onresize = function() {
          self.tableHeight = window.innerHeight - self.$refs.RankList.$el.offsetTop - 50
        }
      })
    },
    methods: {
      //根据单元格的值设定icon图标
      cell_icon_class: function(num) {
        if (num === -3) {   //爬取时出错
          return 'el-icon-minus'
        } else if (num === -2) return 'el-icon-warning-outline'   //调用爬虫时参数出错
        return 'el-icon-loading'
      },
      load_icon: function(num) {
        return !(num !== '' && num !== null && num !== undefined && num >= 0)
      },
      rating_color: function(rating) {  //rating对应颜色计算方法
        if (rating >= 2400) return '#f00'
        if (rating >= 2100) return '#ff8c00'
        if (rating >= 1900) return '#a0a'
        if (rating >= 1600) return '#0000ff'
        if (rating >= 1400) return '#03a89e'
        if (rating >= 1200) return '#008000'
        return '#808080'
      }
    },
    watch: {}
  }
</script>

<style>
  body .el-table th.gutter {
    display: table-cell !important;
  }
  .el-table .cell {
    padding-left: 6px;
  }
</style>
<style scoped>

</style>
