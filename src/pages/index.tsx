import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { Box, Button, FormControl, FormLabel, Image, Input, Stack, Text } from '@chakra-ui/core'
import AsyncSelect from 'react-select/async';
import { Video } from "ytsr";
import YouTube from "react-youtube";
import ytdl from "ytdl-core"

type YTPlayer = {
  playVideo: () => void
  pauseVideo: () => void
  getCurrentTime: () => number
  getDuration: () => number
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  getPlayerState: () => -1 | 0 | 1 | 2
}

const Selectable = ({ inputID, onReady }: {
  inputID: string
  onReady: (player: YTPlayer) => void
}): JSX.Element => {

  const [id, setID] = useState<string | null>(null)
  const [startSeconds, setStartSeconds] = useState(0)

  const width = 350

  return (
    <Stack
      width={width}
      direction={"column"}
      spacing={4}
    >
      <Box>
        <AsyncSelect
          loadOptions={(input) => fetch(`/api/search?q=${input}`).then(r => r.json())}
          formatOptionLabel={({ title, thumbnail }: Video) => (
            <Stack direction={"row"} alignItems={"center"}>
              <Image size={10} objectFit={"cover"} src={thumbnail} />
              <Text>{title}</Text>
            </Stack>
          )}
          onChange={(x: any) => setID(x ? ytdl.getVideoID(x.link) : null)}
          isClearable={true}
          isSearchable={true}
        />
      </Box>

      <FormControl>
        <FormLabel htmlFor={inputID}>Start seconds</FormLabel>
        <Input
          id={inputID}
          type={"number"}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => setStartSeconds(parseInt(target.value))}
        />
      </FormControl>

      {id && (
        <YouTube
          opts={{
            width: width.toString(),
            playerVars: {
              start: startSeconds,
            }
          }}
          onReady={({ target }) => onReady(target)}
          videoId={id}
        />
      )}
    </Stack>
  )
}

// noinspection JSUnusedGlobalSymbols
export default function Index() {

  const first: MutableRefObject<YTPlayer | null> = useRef(null)
  const second: MutableRefObject<YTPlayer | null> = useRef(null)

  useEffect(() => {
    let id: number
    const cb = () => {
      const fst = first.current;
      if (fst) {
        if (fst.getCurrentTime() >= fst.getDuration() - 0.3) {
          second.current?.playVideo()
          return
        }
      }

      id = requestAnimationFrame(cb)
    }
    id = requestAnimationFrame(cb)

    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <Stack alignItems={"center"}>
      <Stack
        isInline
        spacing={4}
      >
        <Box>
          <Selectable
            inputID={"first"}
            onReady={x => first.current = x}
          />
        </Box>

        <Selectable
          inputID={"second"}
          onReady={x => {
            x.playVideo()
            x.pauseVideo()
            second.current = x
          }}
        />
      </Stack>

      <Button
        size={"lg"}
        onClick={() => first.current?.playVideo()}
      >Play</Button>
    </Stack>
  )
}
