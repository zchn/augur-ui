import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import MarketOutcomesAndPositions from "modules/market/components/market-outcomes-and-positions/market-outcomes-and-positions";
import { selectMarket } from "modules/market/selectors/market";
import { sortOpenOrders } from "modules/user-open-orders/selectors/open-orders";
import { sellCompleteSets } from "modules/my-positions/actions/sell-complete-sets";
import getClosePositionStatus from "modules/my-positions/selectors/close-position-status";
import { selectOrphanOrders } from "src/select-state";
import { cancelOrphanedOrder } from "src/modules/orphaned-orders/actions";
import { CATEGORICAL } from "modules/markets/constants/market-types";
import { find } from "lodash";

const mapStateToProps = (state, ownProps) => {
  const market = selectMarket(ownProps.marketId);
  let openOrders = [];
  let positions = [];

  if (market && market.outcomes && market.outcomes.length > 0) {
    const newMarket = sortOpenOrders(market);
    openOrders = newMarket.outcomes.reduce((p, outcome) => {
      if (outcome.userOpenOrders && outcome.userOpenOrders.length > 0) {
        outcome.userOpenOrders.forEach(order => p.push(order));
      }
      return p;
    }, []);
    positions = market.outcomes.reduce((p, outcome) => {
      if (outcome.position) {
        p.push(outcome.position);
      }
      return p;
    }, []);
  }

  const filteredOrphanOrders = selectOrphanOrders(state).filter(
    order => order.marketId === ownProps.marketId
  );

  filteredOrphanOrders.forEach(order => {
    const id = order.outcome;
    const outcome = find(market.outcomes, { id });
    order.outcomeName =
      market.marketType === CATEGORICAL
        ? outcome.description
        : outcome.name || order.price;
  });

  return {
    numCompleteSets:
      (market.myPositionsSummary &&
        market.myPositionsSummary.numCompleteSets) ||
      undefined,
    closePositionStatus: getClosePositionStatus(),
    isMobile: state.isMobile,
    outcomes: market.outcomes || [],
    positions,
    openOrders,
    orphanedOrders: filteredOrphanOrders
  };
};

const mapDispatchToProps = dispatch => ({
  sellCompleteSets: (marketId, numCompleteSets) =>
    dispatch(sellCompleteSets(marketId, numCompleteSets)),
  cancelOrphanedOrder: order => dispatch(cancelOrphanedOrder(order))
});

const MarketOutcomesAndPositionsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MarketOutcomesAndPositions)
);

export default MarketOutcomesAndPositionsContainer;
