import { augur } from "services/augurjs";
import logError from "src/utils/log-error";
import {
  addNotification,
  updateNotification
} from "src/modules/notifications/actions";
import { selectCurrentTimestampInSeconds } from "src/select-state";

export const ADD_ORPHANED_ORDER = "ADD_ORPHANED_ORDER";
export const REMOVE_ORPHANED_ORDER = "REMOVE_ORPHANED_ORDER";

export const DISMISS_ORPHANED_ORDER = "DISMISS_ORPHANED_ORDER";
export const CLEAR_ORPHANED_ORDER_DATA = "CLEAR_TRANSACTION_DATA";

export const addOrphanedOrder = order => ({
  type: ADD_ORPHANED_ORDER,
  data: order
});

export const removeOrphanedOrder = orderId => ({
  type: REMOVE_ORPHANED_ORDER,
  data: orderId
});

export const dismissOrphanedOrder = ({ orderId }) => ({
  type: DISMISS_ORPHANED_ORDER,
  data: orderId
});

export const cancelOrphanedOrder = (
  { orderId, marketId, outcome, orderTypeLabel },
  callback = logError
) => (dispatch, getState) => {
  const { loginAccount } = getState();

  const timestamp = selectCurrentTimestampInSeconds(getState());

  augur.api.CancelOrder.cancelOrder({
    meta: loginAccount.meta,
    _orderId: orderId,
    onSent: res => {
      dispatch(
        addNotification({
          id: res.hash,
          timestamp,
          status: "Sent",
          title: "Cancelling Orphaned Order"
        })
      );
    },
    onSuccess: res => {
      dispatch(removeOrphanedOrder(orderId));
      dispatch(
        updateNotification({
          id: res.hash,
          timestamp,
          status: "Completed"
        })
      );
      callback(null);
    },
    onFailed: err => {
      dispatch(
        updateNotification({
          id: orderId,
          timestamp,
          status: "Failed"
        })
      );
      callback(err);
    }
  });
};

export const clearOrphanedOrderData = () => ({
  type: CLEAR_ORPHANED_ORDER_DATA
});
