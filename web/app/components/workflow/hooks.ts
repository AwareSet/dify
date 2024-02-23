import type {
  Dispatch,
  SetStateAction,
} from 'react'
import { useCallback } from 'react'
import produce from 'immer'
import type {
  Edge,
  EdgeMouseHandler,
} from 'reactflow'
import type {
  BlockEnum,
  Node,
} from './types'
import { NodeInitialData } from './constants'

export const useWorkflow = (
  nodes: Node[],
  edges: Edge[],
  setNodes: Dispatch<SetStateAction<Node[]>>,
  setEdges: Dispatch<SetStateAction<Edge[]>>,
) => {
  const handleAddNextNode = useCallback((prevNode: Node, nextNodeType: BlockEnum) => {
    const nextNode = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: {
        x: prevNode.position.x + 304,
        y: prevNode.position.y,
      },
      data: NodeInitialData[nextNodeType],
    }
    const newEdge = {
      id: `edge-${Date.now()}`,
      source: prevNode.id,
      target: nextNode.id,
    }
    setNodes((oldNodes) => {
      return produce(oldNodes, (draft) => {
        draft.push(nextNode)
      })
    })
    setEdges((oldEdges) => {
      return produce(oldEdges, (draft) => {
        draft.push(newEdge)
      })
    })
  }, [setNodes, setEdges])

  const handleUpdateNodeData = useCallback((nodeId: string, data: Node['data']) => {
    setNodes((oldNodes) => {
      return produce(oldNodes, (draft) => {
        const node = draft.find(node => node.id === nodeId)
        if (node)
          node.data = data
      })
    })
  }, [setNodes])
  const handleEnterEdge = useCallback<EdgeMouseHandler>((_, edge) => {
    setEdges((oldEdges) => {
      return produce(oldEdges, (draft) => {
        const currentEdge = draft.find(e => e.id === edge.id)
        if (currentEdge)
          currentEdge.data = { ...currentEdge.data, hovering: true }
      })
    })
  }, [setEdges])
  const handleLeaveEdge = useCallback<EdgeMouseHandler>((_, edge) => {
    setEdges((oldEdges) => {
      return produce(oldEdges, (draft) => {
        const currentEdge = draft.find(e => e.id === edge.id)
        if (currentEdge)
          currentEdge.data = { ...currentEdge.data, hovering: false }
      })
    })
  }, [setEdges])

  return {
    handleAddNextNode,
    handleUpdateNodeData,
    handleEnterEdge,
    handleLeaveEdge,
  }
}
