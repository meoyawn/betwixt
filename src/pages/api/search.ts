import { NextApiRequest, NextApiResponse } from "next";
import ytsr, { Video } from "ytsr";

export default async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const { q } = query

  const result = await ytsr(q as string, { limit: 5 })
  const videos = result.items.filter(y => y.type === "video") as Video[]

  res.json(videos)
}
