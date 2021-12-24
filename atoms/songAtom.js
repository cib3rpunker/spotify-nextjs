import { atom } from 'recoil';

export const currentTrackIdState = atom({
  //* unique ID (with respect to other atoms/selectors)
  key: 'currentTrackldState',
  //* (aka initial value)
  default: null,
});

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});
