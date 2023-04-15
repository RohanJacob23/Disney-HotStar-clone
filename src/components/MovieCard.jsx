import Image from "next/image";
import React from "react";
import { Card, CardBody } from "@chakra-ui/react";
import { IconPlus, IconTrash } from "@tabler/icons-react";

export default function MovieCard({ title, img, id, handleFav, type, isFav }) {
  const imgUrl = "https://image.tmdb.org/t/p/original";
  return (
    <>
      {/* card body */}
      <Card minW="3xs" bg={"black"} color="white" borderRadius="md">
        <CardBody padding={0}>
          <div className="relative w-full h-80">
            <Image
              src={`${imgUrl}${img}`}
              alt="Green double couch with wooden legs"
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              className="rounded-t-md"
            />
          </div>
          <section className="flex justify-between gap-4 px-4 py-5">
            <h1 className="w-24">{title}</h1>
            <div className="flex flex-col items-center gap-3">
              {isFav ? (
                <IconTrash
                  width={"1.5rem"}
                  height={"1.5rem"}
                  className=" cursor-pointer"
                  onClick={() => handleFav("DELETE", id, type)}
                />
              ) : (
                <IconPlus
                  width={"1.5rem"}
                  height={"1.5rem"}
                  className=" cursor-pointer"
                  onClick={() => handleFav("POST", id, type)}
                />
              )}
            </div>
          </section>
        </CardBody>
      </Card>
    </>
  );
}
