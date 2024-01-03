import React from 'react'

export default function UsersSearchResults({user}) {

    const firstLetter = user?.username.charAt(0).toUpperCase();

  return (
    <>
    <div className=' avatar-circle col-4'>{firstLetter}</div> 
      <p className='text-light m-0'>{user?.username}</p>
  </>
  )
}
