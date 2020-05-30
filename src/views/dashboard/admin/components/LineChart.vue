<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  import rating_color from '@/utils/cf_rating_color'
  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'

  const cf_rating_data = require('../cf_rating_linechart_data') //初始数据为cf_rating

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '500px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      chartData: {
        deep: false, //###
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(cf_rating_data)
      },
      setOptions(lineChart_data) {
        if (lineChart_data.type === 'cf_rating') {
          this.chart.setOption({
            xAxis: {
              type: 'time',
              boundaryGap: false,
              axisTick: {
                show: false
              }
            },
            grid: {
              left: 30,
              right: 20,
              bottom: 60,
              top: 30,
              containLabel: true
            },
            tooltip: {   //悬浮标签
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              },
              padding: [0, 10],
              confine: true,          //防遮挡
              formatter:function(params) {  //tooltip回调函数
                const date = new Date(params[0].data[0]);
                const Y = date.getFullYear() + '-';
                const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                const D = date.getDate();
                const nowdate = Y+M+D
                const userIndex = params[0].seriesIndex
                const dataIndex = params[0].dataIndex
                const contestName = cf_rating_data.contest_data[userIndex][dataIndex]['contestName']
                const contesId = cf_rating_data.contest_data[userIndex][dataIndex]['contestId']
                let res ='<div class = "tooltipdiv"><span>'+nowdate+ '&nbsp;contesId:' + contesId + '<br>'+ contestName +'</span>'
                res += '<style>td{padding:5px;background:#f8fbf8;width:auto;color: #0d0015;font-size: 3px;}</style><table>';
                res += '<tr><td></td><td>姓名</td><td>Rank</td>';
                res += '<td>oldRating</td><td>newRating</td>';
                for(let i=0;i<params.length;i++){
                  const userIndex = params[i].seriesIndex
                  const dataIndex = params[i].dataIndex
                  res += '<tr><td style="font-size: 15px;color:'+ params[i].color + '">●';
                  res += '</td><td>'+ params[i].seriesName;
                  res += '</td><td>'+cf_rating_data.contest_data[userIndex][dataIndex]['rank'];
                  res += '</td><td style="color:'+ rating_color(cf_rating_data.contest_data[userIndex][dataIndex]['oldRating']) + '">'+cf_rating_data.contest_data[userIndex][dataIndex]['oldRating'];
                  res += '</td><td style="font-weight:bold;color:'+ rating_color(cf_rating_data.contest_data[userIndex][dataIndex]['newRating']) + '">'+cf_rating_data.contest_data[userIndex][dataIndex]['newRating'];
                  res += '</td></tr>';
                }
                res += '</div>'
                return res
              }
            },
            yAxis: {
              axisTick: {
                show: false
              }
            },
            toolbox: {
              left: 'center',
              feature: {
                dataZoom: {
                  show: true,
                  yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
              }
            },
            series: lineChart_data.chart_series,
            dataZoom: [{
              id: 'dataZoomX',
              startValue:this.calStartTime(),
              endValue:this.calEndTime(),
              bottom: '15',
              orient:"horizontal",
              type: 'slider'
            },{
              id: 'dataZoomY',
              startValue:1000,
              left:0,
              orient:"vertical",
              type: 'slider'
            }]
          })
        }
      },
      calStartTime() {
        let nowdate = new Date()
        nowdate.setMonth(nowdate.getMonth() - 6)
        return nowdate.getTime()
      },
      calEndTime() {
        let nowdate = new Date()
        nowdate.setTime(nowdate.getTime())
        return nowdate.getTime()
      },
      rating_color
    }
  }
</script>
<style>
  .tooltipdiv td{
    padding-top: 0;
    padding-bottom: 0;
  }
</style>

