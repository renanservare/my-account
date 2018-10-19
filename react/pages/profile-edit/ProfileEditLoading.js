import React from 'react'
import PropTypes from 'prop-types'
import BaseLoading from '../shared/BaseLoading'
import ProfileEditHeader from './ProfileEditHeader'
import SkeletonPiece from '../../components/shared/SkeletonPiece'
import SkeletonBox from '../../components/shared/SkeletonBox'

const ProfileEditLoading = ({ data }) => {
  return (
    <BaseLoading queryData={data} PageHeader={ProfileEditHeader}>
      <main className="mt7 flex-ns flex-wrap-ns items-start-ns">
        <SkeletonBox shouldAllowGrowing maxWidthStep={6}>
          <div className="mb8 mt4">
            <SkeletonPiece width={100} />
            <SkeletonPiece width={100} />
          </div>
          <div className="mb9">
            <SkeletonPiece width={100} />
            <SkeletonPiece width={100} />
          </div>
          <div className="mb8">
            <SkeletonPiece width={40} />
            <SkeletonPiece width={40} />
          </div>
        </SkeletonBox>
      </main>
    </BaseLoading>
  )
}

ProfileEditLoading.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ProfileEditLoading