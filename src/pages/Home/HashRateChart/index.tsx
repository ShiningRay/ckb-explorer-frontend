import React, { useEffect, useCallback, useRef } from 'react'
import BigNumber from 'bignumber.js'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import { getStatisticHashRate } from '../../../service/app/charts/mining'
import i18n from '../../../utils/i18n'
import { handleAxis } from '../../../utils/chart'
import { parseDateNoTime } from '../../../utils/date'
import { useAppState, useDispatch } from '../../../contexts/providers'
import SmallLoading from '../../../components/Loading/SmallLoading'
import { isScreenSmallerThan1200 } from '../../../utils/screen'
import { HomeChartLink, ChartLoadingPanel } from './styled'
import { PageActions } from '../../../contexts/actions'

const stepAxis = (statisticHashRates: State.StatisticHashRate[]) => {
  const array = statisticHashRates.flatMap(data => parseFloat(data.avgHashRate))
  const max = Math.ceil(Math.max(...array))
  const min = Math.floor(Math.min(...array))
  return Math.floor((max - min) / 3)
}

const getOption = (statisticHashRates: State.StatisticHashRate[]) => {
  return {
    color: ['#ffffff'],
    title: {
      text: i18n.t('block.hash_rate_hps'),
      textAlign: 'left',
      itemGap: 15,
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
        fontWight: 'lighter',
        fontFamily: 'Lato',
      },
    },
    grid: {
      left: isScreenSmallerThan1200() ? '1%' : '2%',
      right: '3%',
      top: isScreenSmallerThan1200() ? '20%' : '15%',
      bottom: '2%',
      containLabel: true,
    },
    xAxis: [
      {
        axisLine: {
          lineStyle: {
            color: '#ffffff',
            width: 1,
          },
        },
        data: statisticHashRates.map(data => data.createdAtUnixtimestamp),
        axisLabel: {
          formatter: (value: string) => parseDateNoTime(value, true),
        },
      },
    ],
    yAxis: [
      {
        position: 'left',
        type: 'value',
        scale: true,
        axisLine: {
          lineStyle: {
            color: '#ffffff',
            width: 1,
          },
        },
        interval: stepAxis(statisticHashRates),
        splitLine: {
          lineStyle: {
            color: '#ffffff',
            width: 0.5,
          },
        },
        axisLabel: {
          formatter: (value: string) => handleAxis(new BigNumber(value), 0),
        },
      },
      {
        position: 'right',
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#ffffff',
            width: 1,
          },
        },
      },
    ],
    series: [
      {
        name: i18n.t('block.hash_rate'),
        type: 'line',
        yAxisIndex: '0',
        lineStyle: {
          color: '#ffffff',
          width: 1,
        },
        symbol: 'none',
        data: statisticHashRates.map(data => new BigNumber(data.avgHashRate).toNumber()),
      },
    ],
  }
}

export default () => {
  const dispatch = useDispatch()
  const { statisticHashRates } = useAppState()
  const screenWidth = useRef<number>(window.innerWidth)
  const widthDiff = window.innerWidth > 750 && Math.abs(screenWidth.current - window.innerWidth)

  const clickEvent = useCallback(() => {
    if (widthDiff) {
      screenWidth.current = window.innerWidth
    }
  }, [widthDiff])

  useEffect(() => {
    dispatch({
      type: PageActions.UpdateStatisticHashRate,
      payload: {
        statisticHashRates: undefined,
      },
    })
    getStatisticHashRate(dispatch)
  }, [dispatch])

  if (!statisticHashRates || statisticHashRates.length === 0) {
    return (
      <ChartLoadingPanel>
        {statisticHashRates === undefined ? (
          <SmallLoading isWhite />
        ) : (
          <div className="chart__no__data">{i18n.t('statistic.chart_no_data')}</div>
        )}
      </ChartLoadingPanel>
    )
  }
  return (
    <HomeChartLink to="/charts/hash-rate">
      <ReactEchartsCore
        echarts={echarts}
        option={getOption(statisticHashRates)}
        notMerge
        lazyUpdate
        style={{
          height: isScreenSmallerThan1200() ? '136px' : '190px',
        }}
        onEvents={{ click: clickEvent }}
      />
    </HomeChartLink>
  )
}
