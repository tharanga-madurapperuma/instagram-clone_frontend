import React from 'react'
import ProfileDetails from '../components/ProfileDetails'
import UserPost from '../components/UserPost'

const Profile = () => {
  return (
    <div className='px-20'>
      <div>
        <ProfileDetails />
      </div>
      <div>
        <UserPost />
      </div>
    </div>
  )
}

export default Profile
