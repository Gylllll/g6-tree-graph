import React from 'react'
import Nav from '@/component/Nav'
import { AsyncRoute, Switch } from '@/util/route'
import { Redirect } from 'react-router'
import './index.less'

// 示例
export default function Demo() {
  return (
    <>
      <div className="demos">
        <div className="description">
          <h2>整体交互说明</h2>
          <h3>1. 支持画布拖动、画布缩放（设置了minZoom、maxZoom，根据实际情况调整）、节点可拖拽</h3>
          <h3>
            2. 非全展开模式下（collapse = true）
            <ol>
              <li>
                <h4>a.展开该节点时，收起其他兄弟节点的子节点，并隐藏兄弟节点，当前节点（非叶子节点）移动到画布中心</h4>
              </li>
              <li>
                <h4>b.收起该节点时，显示其他兄弟节点，并将画布移动到以父节点为中心的位置</h4>
              </li>
            </ol>
          </h3>
          <h3>3. 节点的颜色，需要根据节点字段的类别（看服务端返回说明）展示不同的颜色（使用 nodeRender 可以渲染节点，具体见示例）</h3>
          <h3>4. 若点击叶子节点，会出现不可点击的暂态提示</h3>
          <h3>5. 当子节点数量超过 50 时（通过 expandMaxNum 设置。暂定，具体看业务），无论源数据中是否设置了 expandNextLevel，都不支持继续展开，请使用 subTreeRender 自行渲染</h3>
          <h3>h5查看效果，直接打开 chrome 的移动仿真模式</h3>
        </div>
        <Nav />
        <Switch>
          <AsyncRoute
            path="/collapse"
            exact
            module={() => import('@/page/demo/collapse')}
          />
          <AsyncRoute
            path="/expand"
            exact
            module={() => import('@/page/demo/expand')}
          />
          <AsyncRoute
            path="/complex"
            exact
            module={() => import('@/page/demo/complex')}
          />
          <Redirect exact to="/collapse" from="/" />
        </Switch>
      </div>
    </>
  )
}
