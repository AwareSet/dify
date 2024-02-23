import { memo } from 'react'
import type { EdgeProps } from 'reactflow'
import {
  BaseEdge,
  EdgeLabelRenderer,
  Position,
  getSimpleBezierPath,
} from 'reactflow'
import BlockSelector from './block-selector'

const CustomEdge = ({
  id,
  data,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
}: EdgeProps) => {
  console.log()
  const [
    edgePath,
    labelX,
    labelY,
  ] = getSimpleBezierPath({
    sourceX,
    sourceY,
    sourcePosition: Position.Right,
    targetX,
    targetY,
    targetPosition: Position.Left,
  })

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: selected ? '#2970FF' : '#D0D5DD',
          strokeWidth: 2,
        }}
      />
      <EdgeLabelRenderer>
        {
          data?.hovering && (
            <div
              className='nopan nodrag'
              style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                pointerEvents: 'all',
              }}
            >
              <BlockSelector
                asChild
                onSelect={() => {}}
              />
            </div>
          )
        }
      </EdgeLabelRenderer>
    </>
  )
}

export default memo(CustomEdge)
