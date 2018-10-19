import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import AddressEditHeader from './AddressEditHeader'
import AddressEditLoading from './AddressEditLoading'
import GenericError from '../../components/shared/GenericError'
import AddressFormBox from '../../components/Addresses/AddressFormBox'
import GetAddresses from '../../graphql/getAddresses.gql'
import ContentWrapper from '../shared/ContentWrapper'

class AddressEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldShowError: false,
    }
  }

  goBack = () => {
    this.props.history.push('/addresses?success=true')
  }

  handleError = () => {
    this.setState({ shouldShowError: true })
  }

  dismissError = () => {
    this.setState({ shouldShowError: false })
  }

  render() {
    const { addresses, addressId, shipsTo } = this.props
    const { shouldShowError } = this.state
    const address = addresses.find(current => current.addressId === addressId)

    return (
      <ContentWrapper>
        <AddressEditHeader />
        <main className="mt6">
          {address ? (
            <React.Fragment>
              {shouldShowError && (
                <GenericError
                  onDismiss={this.dismissError}
                  errorId="alert.unknownError"
                />
              )}
              <AddressFormBox
                address={address}
                onAddressSaved={this.goBack}
                onAddressDeleted={this.goBack}
                onError={this.handleError}
                shipsTo={shipsTo}
              />
            </React.Fragment>
          ) : (
            <GenericError errorId="alert.addressNotFound" />
          )}
        </main>
      </ContentWrapper>
    )
  }
}

AddressEdit.propTypes = {
  addresses: PropTypes.array.isRequired,
  addressId: PropTypes.string.isRequired,
  shipsTo: PropTypes.array.isRequired,
}

const enhance = compose(
  graphql(GetAddresses),
  branch(
    ({ data }) => data.profile == null,
    renderComponent(AddressEditLoading),
  ),
  withProps(({ data, match }) => ({
    addresses: data.profile.addresses,
    addressId: match.params.id,
    shipsTo: data.logistics.shipsTo,
  })),
)
export default enhance(AddressEdit)