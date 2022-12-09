/* eslint-disable global-require */
import React, { useEffect } from 'react'
import G6 from '@antv/g6'
import debounce from 'lodash/debounce'
import { message } from 'fish'
import { G6RegisterNode, moveNodeToCanvasCenter, needExpand } from './util'
import style from './index.module.less'

// 图谱
export default function TreeGraph({
  data,
  /** 源数据。最精简的数据结构也必须有 id 和 children 两个数据项
   * {
   *   id: 'root',
   *   label: '文本文字', // 如果不传该字段，文本默认显示 id
   *   expandNextLevel: true/false, // 有子节点时，是否继续展开。不传该字段时，默认展开
   *   isAsync: true, // 异步节点，和 getAsyncData 配合使用
   *   children: [
   *     {
   *       id: 'subTree1',
   *       children: [...]
   *     },
   *     {
   *       id: 'subTree2',
   *       children: [...]
   *     },
   *   ]
   * }
  */
  collapse = true, // 初始状态下节点是否全部收起。true: 收起、false: 展开
  expandFirst = true, // collapse = true 的情况下生效。除了一级节点展开，其他层级都收起
  nodeSize = 60, // 节点大小
  lineColor = '#A3B1BF', // 边的颜色
  lineWidth = 2, // 边宽度
  showEndArrow = true, // 是否显示结束端箭头
  animateEasing = 'easeLinear', // 动画函数，https://github.com/d3/d3/blob/main/API.md#easings-d3-ease
  expandMaxNum = 50, // 当子节点数量超过 50 时，无论源数据中是否设置了 expandNextLevel，都不支持继续展开，请使用 subTreeRender 自行渲染
  minZoom = 0.8, // 最小缩放比例
  maxZoom = 1.5, // 最大缩放比例
  messageContent = '已经是叶子节点了！', // 点击叶子节点时的提示消息，如果设置为''的话，就不显示暂态提示
  cfg = {}, // 图配置 https://g6.antv.antgroup.com/api/treegraph
  getAsyncData, // 带有 isAsync 的节点，点击时会调用该函数，需返回当前节点的 children
  onNodeClick = () => {}, // 点击当前节点时回调
  subTreeRender = () => {}, // 自定义子节点显示
  nodeRender = (node) => node, // 设置各个节点样式及其他配置
  edgeRender = (edge) => edge // 设置各个边样式及其他配置
}) {
  G6RegisterNode({
    G6,
    animateEasing
  })
  const ref = React.useRef(null)
  // TreeGraph 实例
  let graph = null

  /**
   * 递归收起节点
   * @param {Array<object>} siblingNodes 当前点击的节点的其他兄弟节点
   * @param {object} clickItem 当前点击的元素实例
   */
  const collapseNode = (siblingNodes, clickItem) => {
    if (!siblingNodes?.length) {
      return
    }

    siblingNodes.forEach((el) => {
      const model = el.getModel()
      const hasChildren = el._cfg.children && el._cfg.children.length > 0

      // 收起其他兄弟节点的子节点
      if (hasChildren) {
        collapseNode(el._cfg.children)
        model.collapsed = true
      }

      // 隐藏兄弟节点
      if (clickItem && model.id !== clickItem.get('id')) {
        graph.hideItem(model.id)
      }
    })
  }

  /**
   * 点击节点，收起其他兄弟节点的子节点，并隐藏兄弟节点
   * @param {object} item 元素实例
   * @param {boolean} collapsed 收缩状态
   */
  const collapseSibNode = (item, collapsed) => {
    const model = item.getModel()

    // 叶子节点
    if (!model.children?.length) {
      return
    }

    const expand = needExpand({
      node: model,
      expandMaxNum
    })

    // 不展开下一级子节点
    if (!expand) {
      model.collapsed = true
      subTreeRender({
        children: model.children || []
      })
      return
    }

    // 非根节点（有父节点）
    const hasFartherNode = item._cfg.parent && item._cfg.parent._cfg.id

    if (hasFartherNode) {
      // 其他兄弟节点
      const siblingNodes = item._cfg.parent._cfg.children

      if (siblingNodes?.length) {
        collapseNode(siblingNodes, item)
      }
    } else {
      // 根节点
      collapseNode(item._cfg.children)
    }

    model.collapsed = collapsed
  }

  /**
   * 点击节点时（展开/收起节点、动画效果调整）
   * @param {object} evt https://g6.antv.antgroup.com/api/Event#%E4%BA%A4%E4%BA%92%E4%BA%8B%E4%BB%B6
   */
  const handleNodeClick = async (evt) => {
    // item: 节点实例
    const { item } = evt

    // 当前元素的 collapsed 属性。false: 收起、true: 展开
    const curCollapsed = item._cfg.model.collapsed

    item._cfg.model.collapsed = !curCollapsed

    // 元素的数据模型
    const model = item.getModel()
    const nodeId = item.get('id')

    const { children, type, collapsed, size } = model

    if (model.isAsync
      && (!children || children.length === 0)
      && getAsyncData
    ) {
      // 处理重复点击（已经是加载状态时点击）
      if (type === 'loading-node') {
        return
      }

      const originalModel = {
        ...model
      }

      const loadingModel = {
        ...originalModel,
        type: 'loading-node',
        size: [size * 1.5, size * 1.5]
      }

      // 通过 ID 查询节点实例
      const el = graph.findById(nodeId)
      // 把当前异步请求的节点设置为 loading 状态
      graph.updateItem(el, loadingModel)

      // 异步请求回的下级数据
      const childData = await getAsyncData(item)
      graph.addChild(childData, nodeId)

      // 请求完后再把节点恢复到默认状态，加上children
      graph.updateItem(el, {
        ...originalModel,
        children: childData
      })

      // 展开当前节点
      collapseSibNode(item, false)
    } else {
      // 展开/收起当前节点
      collapseSibNode(item, collapsed)
    }

    // 叶子节点
    if (!model.children?.length) {
      if (messageContent) {
        message.info(messageContent)
      }
      onNodeClick({
        model, // 元素的数据模型
        item, // 元素实例
        isLeaf: true // 是否叶子节点
      })
      return
    }

    // 重新以当前配置的属性进行一次布局
    graph.layout()

    moveNodeToCanvasCenter({
      item,
      graph,
      animateEasing
    })

    onNodeClick({
      model, // 元素的数据模型
      item, // 元素实例
      isLeaf: false // 是否叶子节点
    })
  }

  useEffect(() => {
    if (!data) {
      return
    }

    const container = ref.current

    const width = container.offsetWidth
    const height = container.offsetHeight || 800

    // 初始化
    graph = new G6.TreeGraph({
      container, // 可以传入图的 DOM 容器的 id 或者直接传入容器的 HTML 节点对象
      width,
      height,
      linkCenter: !showEndArrow,
      modes: {
        default: [
          {
            type: 'zoom-canvas', // 缩放画布
            sensitivity: 1 // 缩放灵敏度（无需那么灵敏）
          },
          'drag-canvas', // 拖拽画布
          'drag-node' // 拖拽节点
        ]
      },
      layout: {
        type: 'dendrogram', // 布局类型，支持 dendrogram、compactBox、mindmap 和 indeted
        direction: 'H',
        nodeSep: nodeSize * 1.2
      },
      defaultEdge: {
        type: 'line',
        style: {
          stroke: lineColor,
          lineWidth,
          endArrow: showEndArrow
        }
      },
      defaultNode: {
        type: 'node',
        size: nodeSize
      },
      animate: true, // 切换布局时是否使用动画过度
      animateCfg: {
        duration: 500, // 一次动画的时长
        easing: animateEasing // 动画函数
      },
      minZoom, // 最小缩放比例
      maxZoom, // 最大缩放比例
      ...cfg
    })

    // 设置各个节点样式及其他配置（该方法必须在 render 之前调用，否则不起作用）
    graph.node((node) => {
      // 默认继续展开下一级
      const expandNext = 'expandNextLevel' in node ? node.expandNextLevel : true
      const newNode = nodeRender(node)
      return {
        label: node.label || node.id,
        expandNextLevel: expandNext,
        ...newNode
      }
    })

    // 设置各个边样式及其他配置（该方法必须在 render 之前调用，否则不起作用）
    graph.edge((edge) => {
      const newEdge = edgeRender(edge)
      return {
        ...edge,
        ...newEdge
      }
    })

    graph.data(data)
    graph.render()
    // 图的中心将对齐到画布中心，但不缩放
    graph.fitCenter()

    if (collapse) {
    // 要第二次渲染，第一次渲染时，node.depth的属性不存在，不能拿来做判断。
    // 可依据 node.depth 来设置要开展的几层节点
      G6.Util.traverseTree(data, (node) => {
        // 默认都收起
        if (node.depth >= 0) {
          node.collapsed = true
        }
        // 只展开一级节点
        if (expandFirst && node.depth === 0) {
          node.collapsed = false
        }
      })
    } else {
      G6.Util.traverseTree(data, (node) => {
        const expand = needExpand({
          node,
          expandMaxNum
        })
        if (!expand) {
          node.collapsed = true
          subTreeRender({
            children: node.children || []
          })
        }
      })
    }
    graph.data(data)
    graph.render()
    graph.fitCenter()

    // 鼠标左键单击节点时触发
    graph.on('node:click', handleNodeClick)

    // 在触控屏上，当节点开始被触碰的时候触发的事件
    graph.on('node:touchstart', handleNodeClick)
  }, [data])

  // 适配视图
  const resizeListener = debounce(() => {
    const container = ref.current
    if (!graph || graph.get('destroyed')) return
    if (!container || !container.offsetWidth || !container.offsetHeight) return

    graph.changeSize(container.offsetWidth, container.offsetHeight)
    graph.layout()
    graph.fitCenter()
  }, 300)

  useEffect(() => {
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return (
    <div
      className={style.g6_tree_graph}
      ref={ref}
    />
  )
}
