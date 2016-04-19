import memoizerific from 'memoizerific';

import store from '../../../store';

import { assembleMarket } from '../../market/selectors/market';

export default function() {
    var { marketsData, favorites, pendingReports, outcomes, accountTrades, tradesInProgress, blockchain, selectedSort } = store.getState();
    return selectMarkets(marketsData, favorites, pendingReports, outcomes, accountTrades, tradesInProgress, blockchain, selectedSort, store.dispatch);
}

export const selectMarkets = memoizerific(1)((marketsData, favorites, pendingReports, outcomes, accountTrades, tradesInProgress, blockchain, selectedSort, dispatch) => {
	if (!marketsData) {
		return [];
	}

    return Object.keys(marketsData)
    	.map(marketID => assembleMarket(marketID, marketsData, favorites, pendingReports, outcomes, accountTrades, tradesInProgress, blockchain, dispatch))
    	.sort((a, b) => {
    		var aVal = cleanSortVal(a[selectedSort.prop]),
    			bVal = cleanSortVal(b[selectedSort.prop]);

			if (bVal < aVal) {
				return selectedSort.isDesc ? -1 : 1;
			}
			else if (bVal > aVal) {
				return selectedSort.isDesc ? 1 : -1;
			}

			return a.id < b.id ? -1 : 1;
    	});
});

function cleanSortVal(val) {
	if (val) {
		if (val.value || val.value === 0) {
			return val.value;
		}
		else if (val.toLowerCase) {
			return val.toLowerCase();
		}
	}
	return val;
}