import { PropsWithChildren } from 'react'
import {
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

type BasicDrawerProps = PropsWithChildren<{
  open: boolean
  heading?: string
  onClose(): void
  size: 'lg' | 'md' | 'sm'
}>
export const BasicDrawer = (props: BasicDrawerProps) => {
  const { children, open, onClose, heading, size } = props
  return (
    <Drawer isOpen={open} size={size} onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent p={4}>
          <DrawerCloseButton />
          {heading && <DrawerHeader>{heading}</DrawerHeader>}
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
