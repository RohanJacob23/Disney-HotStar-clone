import Image from "next/image";
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

export default function MovieCard({ title, img }) {
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
          <section className="px-4 py-5">
            <h1>{title}</h1>
          </section>
        </CardBody>
      </Card>
    </>
  );
}
