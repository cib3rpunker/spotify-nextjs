import { atom } from "recoil";

export const playlistState = atom({
  key: "playlistState",
  default: null,
})

// "https://open.spotify.com/playlist/37i9dQZF1DX37bXS7EGI3f"
export const playlistIdState = atom({
  key: "playlistIdState",
  default: '37i9dQZF1DX37bXS7EGI3f'
})