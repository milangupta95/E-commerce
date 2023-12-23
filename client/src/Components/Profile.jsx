import React from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
function Profile() {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const user = useSelector((state) => state.login.user);
  return (
    <>
      {isLoggedIn ?
        <div className="flex items-center h-screen w-full justify-center bg-dark">
          <div className="max-w-xs">
            <div className="bg-white shadow-xl rounded-lg py-3">
              <div className="photo-wrapper p-2">
                <img className="w-32 h-32 rounded-full mx-auto" src={user.profilePic} alt="John Doe"/>
              </div>
              <div className="p-2">
                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user.name}</h3>
                <div className="text-center text-gray-400 text-xs font-semibold">
                  <p>Web Developer</p>
                </div>
                <table className="text-xs my-3">
                  <tbody>
                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                      <td className="px-2 py-2">{user.email}</td>
                    </tr>
                  </tbody></table>
                <div className="text-center my-3">
                  <NavLink className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</NavLink>
                </div>

              </div>
            </div>
          </div>

        </div>
        :
        <Navigate to='/login'>
        </Navigate>
      }
    </>
  )
}

export default Profile