import genericRequestActions from './genericRequest'
import currentUser from './getCurrentUser'
import changeOrders from './changeOrders'
import company from './company'
import components from './components'

export default {
  ...genericRequestActions,
  ...changeOrders,
  ...currentUser,
  ...components,
  ...company,
}
