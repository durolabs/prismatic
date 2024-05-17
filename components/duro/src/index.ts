import { component } from '@prismatic-io/spectral'
import actions from './actions'
import connections from './connections'

export default component({
  key: 'duro',
  public: false,
  display: {
    label: 'Duro',
    description:
      'Manage Products, Components, Change Orders, and more with Duro.',
    iconPath: 'icon.png',
    category: 'Application Connectors',
  },
  actions,
  connections,
})
