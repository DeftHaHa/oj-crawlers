<template>
  <div class="app-container" style="padding-bottom: 0;">
    <el-header style="height: 40px;padding-left: 0;padding-right:0;">
      <el-row>
        <el-col :span=12 align="left" style="padding-top: 8px">
          <div class="grid-content bg-purple">
            <el-checkbox v-model="checked_showclass">显示班级</el-checkbox>
          </div>
        </el-col>
        <el-col :span=12 align="right">
          <div class="grid-content bg-purple">
            <el-button type="primary" :loading="is_loading" @click="reloading">{{button_start_crawlers_text}}
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-table
      ref="RankList"
      v-loading="listLoading"
      :data="users_oj_info_data"
      stripe
      border
      fit
      highlight-current-row
      :height="tableHeight"
      width="100%"
      @sort-change="sortChange"
    >

      <el-table-column label="排名" type="index" width="38px"/>

      <el-table-column v-if="checked_showclass" label="班级" width="83px">
        <template slot-scope="{row}">
          <span>{{ row.class }}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名" width="68px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="rating" :sortable="custom" label="Rating" width="89px">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['codeforces']['info']['rating'])"
            :class="cell_icon_class(row['oj_info']['codeforces']['info']['rating'])"></i>
          <span
            v-if="!load_icon(row['oj_info']['codeforces']['info']['rating'])"
            :style="'color:'+rating_color(row['oj_info']['codeforces']['info']['rating'])+';font-weight:bold'"
          >
            {{ row['oj_info']['codeforces']['info']['rating'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="max_rating" :sortable="custom" label="Max" width="73px">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['codeforces']['info']['maxRating'])"
            :class="cell_icon_class(row['oj_info']['codeforces']['info']['maxRating'])"></i>
          <span
            v-if="!load_icon(row['oj_info']['codeforces']['info']['maxRating'])"
            :style="'color:'+rating_color(row['oj_info']['codeforces']['info']['maxRating'])+';font-weight:bold'"
          >
            {{ row['oj_info']['codeforces']['info']['maxRating'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="Cf" width="60px">
        <template slot-scope="{row}">
          <i v-if="load_icon(row['oj_info']['codeforces']['solved'])"
             :class="cell_icon_class(row['oj_info']['codeforces']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{ row['oj_info']['codeforces']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="洛谷" width="60px">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['luogu']['solved'])"
            :class="cell_icon_class(row['oj_info']['luogu']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['luogu']['solved'])">
            {{ row['oj_info']['luogu']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="vJ" width="60px">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['vjudge']['solved'])"
            :class="cell_icon_class(row['oj_info']['vjudge']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['vjudge']['solved'])">
            {{ row['oj_info']['vjudge']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="牛课" width="60px">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['nowcoder']['solved'])"
            :class="cell_icon_class(row['oj_info']['nowcoder']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['nowcoder']['solved'])">
            {{ row['oj_info']['nowcoder']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="HDU" width="60px">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['hdu']['solved'])"
            :class="cell_icon_class(row['oj_info']['hdu']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['hdu']['solved'])">
            {{ row['oj_info']['hdu']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="PutongOJ" width="70px">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['putongoj']['solved'])"
            :class="cell_icon_class(row['oj_info']['putongoj']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['putongoj']['solved'])">
            {{ row['oj_info']['putongoj']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="PTA" width="49px">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['pta']['solved'])"
            :class="cell_icon_class_pta_jisuanke(row['oj_info']['pta']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['pta']['solved'])">
            {{ row['oj_info']['pta']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="计蒜客" width="65px">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['jisuanke']['solved'])"
            :class="cell_icon_class_pta_jisuanke(row['oj_info']['jisuanke']['solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['jisuanke']['solved'])">
            {{ row['oj_info']['jisuanke']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="其他" width="60px">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['other_solved'])"
            :class="cell_icon_class(row['oj_info']['other_solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['other_solved'])">
            {{ row['oj_info']['other_solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="total_submissions" :sortable="custom" label="提交" width="80px">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['total_submissions'])"
            :class="cell_icon_class(row['oj_info']['total_submissions'])"></i>
          <span v-if="!load_icon(row['oj_info']['total_submissions'])">
            {{ row['oj_info']['total_submissions'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="total_solved" :sortable="custom" label="AC" width="80px">
        <template slot-scope="{row}">
          <i v-if="load_icon(row['oj_info']['total_solved'])"
             :class="cell_icon_class(row['oj_info']['total_solved'])"></i>
          <span v-if="!load_icon(row['oj_info']['total_solved'])">
            {{ row['oj_info']['total_solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="Title">
        <template slot-scope="{row}">
          <el-tag v-for="tag in row.tags"
                  :type="tag.type"
                  :color="tag.color"
                  :effect="tag.effect"
          >
            {{tag.name}}
          </el-tag>
        </template>
      </el-table-column>


    </el-table>
  </div>
</template>
<script>
  import start_oj_crawlers_asyc from './start_all_crawlers_async'
  import get_cf_info from './set_cf_users_info'
  import users_info from '@/utils/crawler_util/users_info'
  import rating_color from '@/utils/cf_rating_color'
 // const users_info = require('@/utils/crawler_util/users_info')

  // console.log(users_info)
  export default {
    name: 'RankList',
    data() {
      return {
        checked_showclass: true, // 显示班级列
        listLoading: false,
        users_oj_info_data: users_info,
        tableHeight: '100%',
        button_start_crawlers_text: '加载中...',
        is_loading: true,
        custom: false    //加载完变为"custom"后台处理排序
      }
    },
    watch: {},
    mounted: function() {
      get_cf_info(users_info, this)
      start_oj_crawlers_asyc(users_info, this)

      // el-table表格高度监听
      this.$nextTick(function() {
        this.tableHeight = window.innerHeight - this.$refs.RankList.$el.offsetTop - 55
        // 监听窗口大小变化
        const self = this
        window.onresize = function() {
          self.tableHeight = window.innerHeight - self.$refs.RankList.$el.offsetTop - 55
        }
      })
    },
    methods: {
      // 根据单元格的值设定icon图标
      cell_icon_class: function(num) {
        if (num === -3) { // 爬取时出错
          return 'el-icon-minus'
        } else if (num === -2) return 'el-icon-warning-outline' // 调用爬虫时参数出错
        return 'el-icon-loading'
      },
      // pta 计蒜客非爬虫加载 空为无账号
      cell_icon_class_pta_jisuanke: function(num) {
        if (num === '' || num <= 0) return 'el-icon-minus'
        return 'el-icon-loading'
      },
      load_icon: function(num) {
        return !(num !== '' && num !== null && num !== undefined && num >= 0)
      },
      //loading button点击事件
      reloading: function() {
        this.button_start_crawlers_text = "加载中..."
        this.is_loading = true
        //this.users_oj_info_data = users_info
        this.custom = false
        get_cf_info(users_info, this)
        start_oj_crawlers_asyc(users_info, this)
      },
      sortChange: function(data) {  //排序监听
        const { prop, order } = data
        if (order === 'ascending') {
          this.users_oj_info_data.sort(this.cmp(prop, false))
        } else {
          this.users_oj_info_data.sort(this.cmp(prop, true))
        }
      },
      cmp: function(prop, is_ascending) {  //sort比较函数
        if (prop === 'rating') {
          return function(obj1, obj2) {
            var value1 = obj1['oj_info']['codeforces']['info']['rating']
            var value2 = obj2['oj_info']['codeforces']['info']['rating']
            return is_ascending ? value1 - value2 : value2 - value1
          }
        } else if (prop === 'max_rating') {
          return function(obj1, obj2) {
            var value1 = obj1['oj_info']['codeforces']['info']['maxRating']
            var value2 = obj2['oj_info']['codeforces']['info']['maxRating']
            return is_ascending ? value1 - value2 : value2 - value1
          }
        } else if (prop === 'total_submissions') {
          return function(obj1, obj2) {
            var value1 = obj1['oj_info']['total_submissions']
            var value2 = obj2['oj_info']['total_submissions']
            return is_ascending ? value1 - value2 : value2 - value1
          }
        } else if (prop === 'total_solved') {
          return function(obj1, obj2) {
            var value1 = obj1['oj_info']['total_solved']
            var value2 = obj2['oj_info']['total_solved']
            return is_ascending ? value1 - value2 : value2 - value1
          }
        }
      },
      start_oj_crawlers_asyc,
      get_cf_info,
      rating_color
    }
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
