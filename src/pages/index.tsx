import React, { ChangeEvent, useRef, useState } from "react";
import { Divider, FormControl, FormLabel, Image, Input, List, ListItem, Stack, Text } from '@chakra-ui/core'
import { Video } from "ytsr";


// noinspection JSUnusedGlobalSymbols
export default function Index() {

  const ref = useRef<HTMLAudioElement>(null)

  const [list, setList] = useState<Video[]>([])

  return (
    <Stack>
      <FormControl>
        <FormLabel htmlFor={"first_search"}>First video</FormLabel>
        <Input
          id={"first_search"}
          placeholder="Search"
          onChange={async ({ target }: ChangeEvent<HTMLInputElement>) => {
            const x: Video[] = await fetch(`/api/search?q=${target.value}`).then(r => r.json())
            setList(x)
          }}
        />
      </FormControl>

      <List>
        {list.map(i => (
          <ListItem key={i.link}>
            <Stack direction={"row"}>
              <Image
                size={100}
                objectFit="cover"
                src={i.thumbnail}
              />
              <Text fontWeight={500}>{i.title}</Text>
            </Stack>

            <Divider />
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
