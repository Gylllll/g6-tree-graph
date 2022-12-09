// 有子节点时，是否继续展开
export const needExpand = ({
  node, // 元素的数据模型
  expandMaxNum
}) => {
  let expand = 'expandNextLevel' in node ? node.expandNextLevel : true
  if ((node.children?.length || 0) >= expandMaxNum) {
    expand = false
  }
  return expand
}

// 点击节点移动到中心
export const moveNodeToCanvasCenter = ({
  item, // 元素实例
  graph, // TreeGraph 实例
  animateEasing // 动画函数
}) => {
  // 聚焦当前点击的节点（把节点放到视口中心）
  const matrix = item.get('group').getMatrix()
  const point = {
    x: matrix[6],
    y: matrix[7]
  }
  const width = graph.get('width')
  const height = graph.get('height')
  // 找到视口中心
  const viewCenter = {
    x: width / 2,
    y: height / 2
  }
  const modelCenter = graph.getPointByCanvas(viewCenter.x, viewCenter.y)
  const viewportMatrix = graph.get('group').getMatrix()
  // 画布平移的目标位置，最终目标是graph.translate(dx, dy);
  const dx = (modelCenter.x - point.x) * viewportMatrix[0]
  const dy = (modelCenter.y - point.y) * viewportMatrix[4]
  let lastX = 0
  let lastY = 0
  let newX = 0
  let newY = 0
  // 动画每次平移一点，直到目标位置
  graph.get('canvas').animate(
    (ratio) => {
      newX = dx * ratio
      newY = dy * ratio
      graph.translate(newX - lastX, newY - lastY)
      lastX = newX
      lastY = newY
    },
    {
      duration: 300,
      easing: animateEasing
    }
  )
}

/**
 * 自定义节点。这里自定义了加载节点：loading-node
 *
 * 当内置节点不满足需求时，可以通过 G6.registerNode(nodeName, options, extendedNodeName) 方法自定义节点
 * https://g6.antv.antgroup.com/api/registerItem#g6registernodenodename-options-extendednodename
*/
export const G6RegisterNode = ({
  G6,
  animateEasing
}) => {
  // loading 节点
  G6.registerNode('loading-node', {
    draw: function drawShape(cfg, group) {
      const w = cfg.size[0]
      const h = cfg.size[1]

      const image = group.addShape('image', {
        attrs: {
          x: -w / 2,
          y: -h / 2,
          width: w,
          height: h,
          // eslint-disable-next-line global-require
          img: require('@/component/TreeGraph/loading.gif')
        },
        name: 'loading-image'
      })

      // 执行旋转动画
      image.animate(
        (ratio) => {
          const toMatrix = G6.Util.transform(
            [1, 0, 0, 0, 1, 0, 0, 0, 1],
            [['r', ratio * Math.PI * 4]]
          )
          return {
            matrix: toMatrix
          }
        },
        {
          repeat: true, // 动画重复
          duration: 2000,
          easing: animateEasing
        }
      )

      // 元素的文本标签
      group.addShape('text', {
        attrs: {
          textBaseline: 'middle',
          x: 0,
          y: 0,
          width: w,
          textAlign: 'center',
          lineHeight: 20,
          text: cfg.label || cfg.id, // 优先使用节点的label字段，如果不存在该字段则使用id
          fill: '#000'
        },
        name: 'title'
      })

      return group
    }
  }, 'rect')
}
