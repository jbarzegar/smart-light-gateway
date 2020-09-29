import { useState, useMemo } from 'react'

export const useHoverEvent = () => {
  const [hovered, setHovered] = useState(false)

  const hoverProps = useMemo(
    () => ({
      hovered,
      getEventProps: () => ({
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }),
    }),
    [hovered]
  )

  return hoverProps
}
