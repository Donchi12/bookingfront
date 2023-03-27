import React from 'react'
import FacebookLogin from "@greatsumini/react-facebook-login"

function FacebookLogins() {



    
//   const handleLogin = (googleId) => {
//     axios
//        .post('/auth/googleLogin', { googleId })
//        .then((res) => {
//          const userCred = res.data
//          dispatch({ type: "LOGIN_SUCCESS", data: userCred })
//          window.location.assign('/user/dashboard')
//        })
//        .catch((err) => {
//          const { message } = err.response.data
//          dispatch({ type: "LOGIN_ERROR", error: message })
//        })
//    }

  return (
    <FacebookLogin
      appId="1088597931155576"

      onSuccess={(res) => {
       console.log(res)
      }}

      onFail={(res) => {
       console.log(res)
      }}

      onProfileSuccess={(res) => {
       console.log(res)
      }}
      
      className="facebookBtn"
     />
  )
}

export default FacebookLogins