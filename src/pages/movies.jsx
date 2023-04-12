import SideBar from "@/components/SideBar";
import MovieCard from "@/components/MovieCard";
import MovieSlider from "@/components/MovieSlider";
import React from "react";

export default function Movies({ data }) {
  return (
    <main>
      {/* side bar */}
      <SideBar />

      {/* movie list display */}
      <section className="text-white pl-32 pt-28">
        {data.map((list) => {
          const movieSliderList = list.dbList.map((item) => (
            <MovieCard
              key={item.id}
              title={item.title || item.name}
              img={item.poster_path}
            />
          ));
          return (
            <section key={list.type} className="pb-7">
              <h1 className="text-2xl">{list.type}</h1>
              <MovieSlider>{movieSliderList}</MovieSlider>
            </section>
          );
        })}
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const API_KEY = "da9ba07029ddfbf7510ba7d31cf1e5cd";
  const movieDbUrl = "https://api.themoviedb.org/3";

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

  return {
    props: {
      data: [
        { type: "Trending", dbList: trending.results },
        { type: "Discover", dbList: discover.results },
        { type: "Now Playing", dbList: nowPlaying.results },
        { type: "Popular", dbList: popular.results },
        { type: "Top Rated", dbList: topRated.results },
        { type: "Upcoming", dbList: upcoming.results },
      ],
    },
    revalidate:60,
  };
}
