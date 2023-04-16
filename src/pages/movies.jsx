import SideBar from "@/components/SideBar";
import MovieCard from "@/components/MovieCard";
import MovieSlider from "@/components/MovieSlider";
import React from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useRouter } from "next/router";

export default function Movies({ data }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleFav = async (method, id, type) => {
    if (method === "POST") {
      const updateFav = await axios
        .post(`/api/hello?email=${session.user.email}`, {
          id,
          type,
        })
        .then((res) => res)
        .catch((error) => ({ errorMsg: error }));
    } else if (method === "DELETE") {
      const deleteFav = await axios
        .delete(`/api/hello?email=${session.user.email}&id=${id}`)
        .then((res) => res)
        .catch((error) => ({ errorMsg: error }));
    }
    router.replace(router.asPath);
  };

  return (
    <>
      <Head>
        <title>Movies List</title>
      </Head>
      <main>
        {/* side bar */}
        <SideBar />

        {/* movie list display */}
        {session ? (
          <section className="text-white pl-32 pt-28">
            <h1 className="text-4xl font-semibold pb-4">
              Welcome {session.user.name}
            </h1>
            {data.map((list) => {
              if (list.dbList) {
                const movieSliderList = list.dbList.map((item) => (
                  <MovieCard
                    key={item.id}
                    id={item.id}
                    type={item.media_type || "movie"}
                    title={item.title || item.name}
                    img={item.poster_path}
                    handleFav={handleFav}
                    isFav={list.type === "Your Favorite" ? true : false}
                  />
                ));
                return (
                  <section key={list.type} className="pb-7">
                    <h1 className="text-2xl pb-5">{list.type}</h1>
                    <MovieSlider>{movieSliderList}</MovieSlider>
                  </section>
                );
              }
            })}
          </section>
        ) : (
          <div className=" text-white pl-32 pt-28">
            <h1 className="text-5xl">Please signup to see the content....</h1>
            <Link href="/auth/signin" className="text-4xl">
              SignIn
            </Link>
          </div>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const API_KEY = "da9ba07029ddfbf7510ba7d31cf1e5cd";
  const movieDbUrl = "https://api.themoviedb.org/3";
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const {
    user: { email },
  } = session;

  // fetching trending movie list
  const trending = await fetch(`
  ${movieDbUrl}/trending/all/day?api_key=${API_KEY}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));

  // fetching discover movie list
  const discover = await fetch(
    `${movieDbUrl}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  // fetching nowPlaying movie list
  const nowPlaying = await fetch(`
  ${movieDbUrl}/movie/now_playing?api_key=${API_KEY}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));

  // fetching popular movie list
  const popular = await fetch(`${movieDbUrl}/movie/popular?api_key=${API_KEY}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));

  // fetching topRated movie list
  const topRated = await fetch(`${movieDbUrl}/movie/popular?api_key=${API_KEY}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));

  // fetching upcoming movie list
  const upcoming = await fetch(`${movieDbUrl}/movie/popular?api_key=${API_KEY}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));

  // fetching data from next api
  // const apiData = await fetch(
  //   `${process.env.HOST_URL}/api/hello?email=${email}`
  // )
  //   .then((res) => res.json())
  //   .catch((error) => console.log(error));

  return {
    props: {
      data: [
        { type: "Trending", dbList: trending.results },
        // { type: "Your Favorite", dbList: apiData },
        { type: "Discover", dbList: discover.results },
        { type: "Now Playing", dbList: nowPlaying.results },
        { type: "Popular", dbList: popular.results },
        { type: "Top Rated", dbList: topRated.results },
        { type: "Upcoming", dbList: upcoming.results },
      ],
      session,
    },
  };
}
