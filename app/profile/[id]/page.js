// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// import Profile from "@components/Profile";

// const UserProfile = ({ params }) => {
//   const searchParams = useSearchParams();
//   const userName = searchParams.get("name");

//   const [userPosts, setUserPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await fetch(`/api/users/${params?.id}/posts`);
//       const data = await response.json();

//       setUserPosts(data);
//     };

//     if (params?.id) fetchPosts();
//   }, [params.id]);

//   return (
//     <Profile
//       name={userName}
//       desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
//       data={userPosts}
//     />
//   );
// };

// export default UserProfile;

// "use client";

// import { useEffect, useState, Suspense } from "react";
// import { useSearchParams } from "next/navigation";

// import Profile from "@components/Profile";

// const UserProfile = ({ params }) => {
//   const searchParams = useSearchParams();
//   const userName = searchParams.get("name");

//   const [userPosts, setUserPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await fetch(`/api/users/${params?.id}/posts`);
//       const data = await response.json();

//       setUserPosts(data);
//     };

//     if (params?.id) fetchPosts();
//   }, [params.id]);

//   return (
//     <Profile
//       name={userName}
//       desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
//       data={userPosts}
//     />
//   );
// };

// const UserProfilePage = (props) => (
//   <Suspense fallback={<div>Loading...</div>}>
//     <UserProfile {...props} />
//   </Suspense>
// );

// export default UserProfilePage;


"use client";

import React, { use, Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  // Unwrapping the params object
  const unwrappedParams = use(params);

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${unwrappedParams.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (unwrappedParams?.id) fetchPosts();
  }, [unwrappedParams.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

const UserProfilePage = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <UserProfile {...props} />
  </Suspense>
);

export default UserProfilePage;
