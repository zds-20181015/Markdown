import editIcon from '@/lib/assets/icons/imageEdit/2.png'
import inlineIcon from '@/lib/assets/icons/inline_image/2.png'
import leftIcon from '@/lib/assets/icons/align_left/2.png'
import middleIcon from '@/lib/assets/icons/align_center/2.png'
import rightIcon from '@/lib/assets/icons/align_right/2.png'
import deleteIcon from '@/lib/assets/icons/image_delete/2.png'

const icons = [
  {
    type: 'edit',
    tooltip: 'Edit Image',
    icon: editIcon
  },
  {
    type: 'inline',
    tooltip: 'Inline Image',
    icon: inlineIcon
  },
  {
    type: 'left',
    tooltip: 'Align Left',
    icon: leftIcon
  },
  {
    type: 'center',
    tooltip: 'Align Middle',
    icon: middleIcon
  },
  {
    type: 'right',
    tooltip: 'Align Right',
    icon: rightIcon
  },
  {
    type: 'delete',
    tooltip: 'Remove Image',
    icon: deleteIcon
  }
]

export default icons
