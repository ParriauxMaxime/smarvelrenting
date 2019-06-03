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

export type Data = {
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
    .then((res): Response => {
      if (res.status && res.status === 429) {
        throw new Error('Too many request ');
      }
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
}

export default fetcher;
