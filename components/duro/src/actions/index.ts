import genericRequestActions from './genericRequest'
import currentUser from './getCurrentUser'
import changeOrders from './changeOrders'
import company from './company'

export default {
  ...genericRequestActions,
  ...changeOrders,
  ...currentUser,
  ...company,
}
