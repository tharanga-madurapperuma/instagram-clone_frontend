import React from 'react'
import ProfileDetails from '../Components/ProfileDetails'
import UserPost from '../Components/UserPost'

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
