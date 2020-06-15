/* eslint-disable camelcase */

export type Genre = {
  id: number
  name: string
}

export interface IMovie {
  adult: boolean
  backdrop_path: string | null
  genre_ids?: string[]
  genres?: Genre[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  status?: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface IMovieList {
  page: number
  total_pages: number
  total_result: number // eslint
  results: IMovie[]
}
