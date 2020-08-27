import React, { useRef } from "react";
import { Flex, } from '@chakra-ui/core'
import YouTube from "react-youtube";

// noinspection JSUnusedGlobalSymbols
export default function Index() {

  const second = useRef<any>(null)

  return (
    <Flex
      marginTop={100}
      direction={{
        base: "column",
        xl: "row",
      }}
      alignItems={"center"}
      justifyContent={"center"}
    >

      <YouTube
        videoId={"uPiYV2wUp6w"}
        opts={{
          playerVars: {
            autoplay: 1,
            start: 100,
          }
        }}
        onEnd={() => second.current.playVideo()}
      />

      <YouTube
        videoId={"FFNBfP_5G98"}
        opts={{
          playerVars: {
            autoplay: 1,
          }
        }}
        onReady={({ target }) => {
          target.pauseVideo()
          second.current = target
        }}
      />
    </Flex>
  )
}
