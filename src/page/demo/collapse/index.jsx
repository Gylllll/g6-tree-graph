import React from 'react'
import TreeGraph from '@/component/TreeGraph'

const nodeStyle = {
  root: { // 根类型节点
    style: {
      fill: '#1e62ec', // 节点填充色
      stroke: '#1e62ec' // 节点的描边颜色
    },
    labelCfg: {
      style: {
        fill: '#fff' // 文本颜色
      }
    }
  },
  hollow: { // 空心类型节点
    style: {
      fill: '#fff', // 节点填充色
      stroke: '#5679c0' // 节点的描边颜色
    },
    labelCfg: {
      style: {
        fill: '#5679c0' // 文本颜色
      }
    }
  },
  school: { //  学校类型节点
    style: {
      fill: '#1ddbd4', // 节点填充色
      stroke: '#1ddbd4' // 节点的描边颜色
    },
    labelCfg: {
      style: {
        fill: '#1d2129' // 文本颜色
      }
    }
  },
  default: { // 默认类型节点
    style: {
      fill: '#8998ed', // 节点填充色
      stroke: '#8998ed' // 节点的描边颜色
    },
    labelCfg: {
      style: {
        fill: '#fff' // 文本颜色
      }
    }
  }
}

const data = {
  id: '1',
  label: '全国',
  nodeType: 'root',
  children: [{
    id: '1-1',
    label: '福建省',
    children: [{
      id: '1-1-1',
      label: '福州市',
      isAsync: true // 异步节点
    }, {
      id: '1-1-2',
      label: '泉州市'
    }, {
      id: '1-1-3',
      label: '厦门市'
    }, {
      id: '1-1-4',
      label: '漳州市'
    }, {
      id: '1-1-5',
      label: '直属学校',
      num: 5,
      nodeType: 'hollow'
    }]
  }, {
    id: '1-2',
    label: '湖南省'
  }, {
    id: '1-3',
    label: '台湾省'
  }, {
    id: '1-4',
    label: '上海市'
  }, {
    id: '1-5',
    label: '北京市'
  }, {
    id: '1-6',
    label: '广东省'
  }]
}

// 只展开一级节点，其他收起
export default function collapse() {
  const handleNodeClick = ({
    model, // 元素的数据模型
    item, // 元素实例
    isLeaf // 是否叶子节点
  }) => {
    console.log('collapse', model, item, isLeaf)
  }

  // 模拟请求数据
  const getData = async (item) => new Promise((resolve) => {
    console.log('asyncNodeClick', item)
    setTimeout(() => {
      const newChildren = [
        {
          id: '1-1-1-1',
          label: '福清市'
        },
        {
          id: '1-1-1-2',
          label: '鼓楼区',
          children: [{
            id: '1-1-1-2-1',
            label: '福州一中',
            nodeType: 'school'
          }, {
            id: '1-1-1-2-2',
            label: '福州二中',
            nodeType: 'school'
          }]
        }
      ]
      newChildren.forEach((_) => {
        // 如果还有下一级，默认收起当前节点
        if (_.children) {
          _.collapsed = true
        }
      })
      resolve(newChildren)
    }, 3000)
  })

  // 渲染节点
  const nodeRender = (node) => {
    let label = node.label || node.id
    // 防止每次layout后重复修改label
    if (node.num && !node.hasRender) {
      label = `${node.label}(${node.num})`
      node.hasRender = true
    }
    return {
      ...node,
      ...node.nodeType ? nodeStyle[node.nodeType] : nodeStyle.default,
      label
    }
  }

  return (
    <div className="demo">
      <h4>
        可按以下顺序点击：全国 - 福建省 - 福州市 - 鼓楼区，查看效果，
        其中福州市是异步节点，点击福州市异步获取下一级数据。（节点增加 isAsync: true，配合 getAsyncData 使用）
      </h4>
      <TreeGraph
        data={data}
        onNodeClick={handleNodeClick}
        getAsyncData={getData}
        nodeRender={nodeRender}
        // expandFirst={false} // 收起全部节点（暂时没有这个情况）
      />
    </div>
  )
}
