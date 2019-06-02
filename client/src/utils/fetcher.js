// @flow

type Params = {
  offset: number,
  limit: number
};

export type CharacterResult = {
  id: number,
  thumbnail: {
    path: string,
    extension: string
  },
  name: string
};

type Data = {
  data: {
    count: number,
    total: number,
    offset: number,
    limit: number,
    results: CharacterResult[]
  }
};

async function fetcher(params: Params = { limit: 20, offset: 0 }): Promise<CharacterResult> {
  return fetch(`http://localhost:8080/?limit=${params.limit}&offset=${params.offset}`)
    .then((res: Response): Data => res.json())
    .then((res: Data): CharacterResult[] => res.data.results);
}

export default fetcher;
