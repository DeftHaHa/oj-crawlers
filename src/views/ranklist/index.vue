<template>
  <div class="app-container" style="padding-bottom: 0px">
    <div ref="checked_showclass" class="filter-container">
      <el-checkbox v-model="checked_showclass">显示班级</el-checkbox>
    </div>
    <el-table
      ref="RankList"
      v-loading="listLoading"
      :data="users_oj_info_data"
      stripe
      border
      fit
      highlight-current-row
      style="width: 100%"
      :height="tableHeight"
    >

      <el-table-column label="排名" type="index" />

      <el-table-column v-if="checked_showclass" label="班级">
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
          <i
            v-if="load_icon(row['oj_info']['codeforces']['info']['rating'])"
            :class="cell_icon_class(row['oj_info']['codeforces']['info']['rating'])"
          />
          <span
            v-if="!load_icon(row['oj_info']['codeforces']['info']['rating'])"
            :style="'color:'+rating_color(row['oj_info']['codeforces']['info']['rating'])+';font-weight:bold'"
          >
            {{ row['oj_info']['codeforces']['info']['rating'] }}
          </span>
          <span>/</span>
          <i
            v-if="load_icon(row['oj_info']['codeforces']['info']['maxRating'])"
            :class="cell_icon_class(row['oj_info']['codeforces']['info']['maxRating'])"
          />
          <span
            v-if="!load_icon(row['oj_info']['codeforces']['info']['maxRating'])"
            :style="'color:'+rating_color(row['oj_info']['codeforces']['info']['maxRating'])+';font-weight:bold'"
          >
            {{ row['oj_info']['codeforces']['info']['maxRating'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="Cf">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['codeforces']['solved'])"
            :class="cell_icon_class(row['oj_info']['codeforces']['solved'])"
          />
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{ row['oj_info']['codeforces']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="洛谷">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['luogu']['solved'])"
            :class="cell_icon_class(row['oj_info']['luogu']['solved'])"
          />
          <span v-if="!load_icon(row['oj_info']['luogu']['solved'])">
            {{ row['oj_info']['luogu']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="vJ">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['vjudge']['solved'])"
            :class="cell_icon_class(row['oj_info']['vjudge']['solved'])"
          />
          <span v-if="!load_icon(row['oj_info']['vjudge']['solved'])">
            {{ row['oj_info']['vjudge']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="牛课">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['nowcoder']['solved'])"
            :class="cell_icon_class(row['oj_info']['nowcoder']['solved'])"
          />
          <span v-if="!load_icon(row['oj_info']['nowcoder']['solved'])">
            {{ row['oj_info']['nowcoder']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="HDU">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['hdu']['solved'])"
            :class="cell_icon_class(row['oj_info']['hdu']['solved'])"
          />
          <span v-if="!load_icon(row['oj_info']['hdu']['solved'])">
            {{ row['oj_info']['hdu']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="PutongOJ">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['putongoj']['solved'])"
            :class="cell_icon_class(row['oj_info']['putongoj']['solved'])"
          />
          <span v-if="!load_icon(row['oj_info']['putongoj']['solved'])">
            {{ row['oj_info']['putongoj']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="PTA">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['pta']['solved'])"
            :class="cell_icon_class_pta_jisuanke(row['oj_info']['pta']['solved'])"
          />
          <span v-if="!load_icon(row['oj_info']['pta']['solved'])">
            {{ row['oj_info']['pta']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="计蒜客">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['jisuanke']['solved'])"
            :class="cell_icon_class_pta_jisuanke(row['oj_info']['jisuanke']['solved'])"
          />
          <span v-if="!load_icon(row['oj_info']['jisuanke']['solved'])">
            {{ row['oj_info']['jisuanke']['solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="其他">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['other_solved'])"
            :class="cell_icon_class(row['oj_info']['other_solved'])"
          />
          <span v-if="!load_icon(row['oj_info']['other_solved'])">
            {{ row['oj_info']['other_solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="提交">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['total_submissions'])"
            :class="cell_icon_class(row['oj_info']['total_submissions'])"
          />
          <span v-if="!load_icon(row['oj_info']['total_submissions'])">
            {{ row['oj_info']['total_submissions'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="AC">
        <template slot-scope="{row}">
          <i
            v-if="load_icon(row['oj_info']['total_solved'])"
            :class="cell_icon_class(row['oj_info']['total_solved'])"
          />
          <span v-if="!load_icon(row['oj_info']['total_solved'])">
            {{ row['oj_info']['total_solved'] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="Title">
        <template slot-scope="{row}">
          <span v-if="!load_icon(row['oj_info']['codeforces']['solved'])">
            {{ row['oj_info']['codeforces']['solved'] }}
          </span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>/* eslint-disable */
import testfunction from './test'
import start_oj_crawlers from './start_oj_crawlers'

const users_oj_info = require('@/utils/crawler_util/users_oj_info')
// users_oj_info[0]['oj_info']['codeforces']['info']['rating'] = 1600
// users_oj_info[0]['oj_info']['codeforces']['info']['maxRating'] = 2400

// console.log(users_oj_info)
export default {
  name: 'RankList',
  data() {
    return {
      checked_showclass: true, // 显示班级列
      listLoading: false,
      users_oj_info_data: users_oj_info,
      tableHeight: '100%'
    }
  },
  watch: {},
  mounted: function() {
    start_oj_crawlers(users_oj_info,this)
    //  testfunction(users_oj_info).then(res => {
    //    this.users_oj_info_data[0]['oj_info']['codeforces']['solved'] = res
    // })
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
    rating_color: function(rating) { // rating对应颜色计算方法
      if (rating >= 2400) return '#f00'
      if (rating >= 2100) return '#ff8c00'
      if (rating >= 1900) return '#a0a'
      if (rating >= 1600) return '#0000ff'
      if (rating >= 1400) return '#03a89e'
      if (rating >= 1200) return '#008000'
      return '#808080'
    },
    start_oj_crawlers, testfunction
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
