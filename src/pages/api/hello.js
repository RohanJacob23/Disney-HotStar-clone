// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const API_KEY = "da9ba07029ddfbf7510ba7d31cf1e5cd";
    const movieDbUrl = "https://api.themoviedb.org/3";
    const { email } = req.query;

    if (email) {
      const userFav = await prisma.user.findUnique({
        where: { email },
      });

      // code to get the list of the favorite movies/tv of the user
      if (req.method === "GET") {
        const listPromise = userFav.fav.map(async (favObj) => {
          const individual = await axios
            .get(
              `${movieDbUrl}/${favObj.type === "movie" ? "movie" : "tv"}/${
                favObj.id
              }?api_key=${API_KEY}&language=en-US`
            )
            .then((result) => result.data)
            .catch((error) => console.log(error));
          return individual;
        });

        const userFavList = await Promise.all(listPromise);
        res.json(userFavList);
      } else if (req.method === "POST") {
        // code to add fav to the user list
        const { id, type } = req.body;

        // checking whether there are any duplicates
        const check = await prisma.user.findMany({
          where: {
            fav: {
              hasEvery: [{ id, type }],
            },
          },
        });

        // if there are no duplicates then adding the movie/tv to the fav list of the user
        if (check.length === 0) {
          const addFav = await prisma.user.update({
            where: { email },
            data: {
              fav: { push: { id, type } },
            },
          });
          return res.json(addFav);
        } else res.json({ error: "the movie/tv already exists in your list" });
      } else if (req.method === "DELETE") {
        // deleting the fav list of the user
        const { id } = req.query;
        const newFav = userFav.fav.filter((item) => item.id !== Number(id));

        const afterDeleting = await prisma.user.update({
          where: { email },
          data: {
            fav: { set: newFav },
          },
        });
        res.json(afterDeleting);
      } else res.json({ status: "different request method" });
    } else {
      res.json({ status: "Logged out" });
    }
    res.json({ something: "returning something" });
  } catch (error) {
    res.json(error);
  }
}
