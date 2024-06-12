import { component } from '@prismatic-io/spectral'
import actions from './actions'

export default component({
  key: 'duroUtils',
  public: false,
  display: {
    label: 'Duro Utilities',
    description: 'Duro’s awesome Utilities',
    iconPath: 'icon.png',
  },
  actions,
})
