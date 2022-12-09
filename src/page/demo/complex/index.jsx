import React from 'react'
import TreeGraph from '@/component/TreeGraph'
import { Modal } from 'fish'

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
      children: [
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
    label: '湖南省',
    expandNextLevel: false, // 当前湖南省下只有两个子节点，仍可以利用当前属性进行自定义渲染
    children: [{
      id: '1-2-1',
      label: '长沙市'
    }, {
      id: '1-2-2',
      label: '张家界市'
    }]
  }, {
    id: '1-3',
    label: '台湾省'
  }, {
    id: '1-4',
    label: '上海市'
  }]
}

// 自定义子节点显示（subTreeRender）
export default function complex() {
  const handleNodeClick = ({
    model, // 元素的数据模型
    item, // 元素实例
    isLeaf // 是否叶子节点
  }) => {
    console.log('complex', model, item, isLeaf)
  }

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

  // 渲染边（这里只设置了文本）
  const edgeRender = (edge) => ({
    ...edge,
    ...edge.source === '1' ? {
      label: '某种关系'
    } : '' // 全国（看具体需求去渲染）
  })

  const subTreeRender = ({
    children
  }) => {
    // 这边根据端的不同选择不同组件，这里不再赘余
    Modal.info({
      title: '这是自定义子节点的弹窗',
      content: (
        <ul>
          {children.map((_) => <li>{_.label}</li>)}
        </ul>
      ),
      afterClose() {
        console.log('关闭弹窗')
      },
      afterOpen() {
        console.log('开启弹窗')
      }
    })
  }

  return (
    <div className="demo">
      <h4>1.当某节点的子节点数小于 expandMaxNum，但仍然想自定义渲染子节点显示时，可以在源数据设置 expandNextLevel:false 字段</h4>
      <h4>2.当子节点数超过 expandMaxNum 时，都需要自定义渲染，节点本身不会继续展开（1的优先级没有2高，详见属性说明）</h4>
      <h4>把 expandMaxNum 设置为 5。点1的效果请点击“湖南省”；点2的效果请点击“福建省”</h4>
      <TreeGraph
        data={data}
        onNodeClick={handleNodeClick}
        nodeRender={nodeRender}
        edgeRender={edgeRender}
        subTreeRender={subTreeRender}
        expandMaxNum={5}
      />
    </div>
  )
}
