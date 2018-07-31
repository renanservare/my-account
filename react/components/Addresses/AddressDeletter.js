import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import { Button } from 'vtex.styleguide'
import DeleteAddress from '../../graphql/deleteAddress.gql'

class AddressDeletter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  onDeleteClick = () => {
    const { addressId, onAddressDeleted, onError } = this.props
    if (this.state.isLoading) return

    this.setState({
      isLoading: true,
    })
    this.props
      .deleteAddress({ variables: { addressId } })
      .then(onAddressDeleted)
      .catch(error => {
        this.setState({
          isLoading: false,
        })
        onError(error)
      })
  }

  render() {
    const { intl } = this.props
    const { isLoading } = this.state
    return (
      <div className="mt5">
        <Button
          type="button"
          variation="danger"
          block
          size="small"
          onClick={this.onDeleteClick}
          isLoading={isLoading}
        >
          {intl.formatMessage({ id: 'addresses.deleteAddress' })}
        </Button>
      </div>
    )
  }
}

AddressDeletter.propTypes = {
  /** Mutation for deleting an address */
  deleteAddress: PropTypes.func.isRequired,
  /** Callback for address deletion */
  onAddressDeleted: PropTypes.func.isRequired,
  /** Callback for error during deletion */
  onError: PropTypes.func.isRequired,
  /** Id of the address to be deleted */
  addressId: PropTypes.string.isRequired,
  /** React-intl utility */
  intl: intlShape.isRequired,
}

const enhance = compose(
  graphql(DeleteAddress, { name: 'deleteAddress' }),
  injectIntl,
)
export default enhance(AddressDeletter)
