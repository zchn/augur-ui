import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import ReportingHeader from 'modules/reporting/components/reporting-header/reporting-header'
import MarketsList from 'modules/markets/components/markets-list'

export default class ReportingClosed extends Component {
  static propTypes = {
    markets: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    scalarShareDenomination: PropTypes.object.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    loadMarketsInfo: PropTypes.func.isRequired,
    isLogged: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      filteredMarketsClosed: [0, 1],
    }
  }

  render() {
    const s = this.state
    const p = this.props

    return (
      <section>
        <Helmet>
          <title>Reporting: Closed</title>
        </Helmet>
        <ReportingHeader
          heading="Reporting: Closed"
          showReportingEndDate={false}
        />
        <MarketsList
          isLogged={p.isLogged}
          markets={p.markets}
          filteredMarkets={s.filteredMarketsClosed}
          location={p.location}
          history={p.history}
          scalarShareDenomination={p.scalarShareDenomination}
          toggleFavorite={p.toggleFavorite}
          loadMarketsInfo={p.loadMarketsInfo}
        />
      </section>
    )
  }
}