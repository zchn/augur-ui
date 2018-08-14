import { DAY, WEEK, MONTH, ALL } from 'modules/portfolio/constants/transaction-periods'
import store from 'src/store'
import { updateTransactionPeriod } from 'modules/portfolio/actions/update-transaction-period'
import { loadAccountHistory } from 'modules/auth/actions/load-account-history'
import { selectCurrentTimestamp } from 'src/select-state'
import { getBeginDate } from 'src/utils/format-date'

export const getDefaultTransactionPeriod = () => (dispatch, getState) => {

	const timePeriods = [DAY, WEEK, MONTH, ALL]
	let index = 0
	let { transactionsData, transactionPeriod } = store.getState()

	while (Object.keys(transactionsData).length === 0 && timePeriods[index]) { // dont need to check smaller ones
		console.log(timePeriods[index])
		console.log(transactionsData)

		if (timePeriods[index] !== transactionPeriod) {
			const currentTimestamp = selectCurrentTimestamp(store.getState())
			const beginDate = getBeginDate(currentTimestamp, timePeriods[index])
			dispatch(updateTransactionPeriod(timePeriods[index]))
			dispatch(loadAccountHistory(beginDate, null, () => {
				transactionsData = store.getState().transactionsData
				transactionPeriod = timePeriods[index]
    		}))
		}
		index++
	}
}