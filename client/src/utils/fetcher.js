// @flow

import axios from 'axios';

export type CharacterResult = {
  id: number,
  thumbnail: {
    path: string,
    extension: string
  },
  name: string
};

export type Data = {
  data: {
    count: number,
    total: number,
    offset: number,
    limit: number,
    results: CharacterResult[]
  }
};
