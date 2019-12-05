module Part1 where

import Prelude
import Data.Array (foldl, head, length, slice, updateAtIndices, (!!), (..))
import Data.Maybe (fromMaybe)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Console (logShow)

input :: Array Int
input = [ 1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 6, 1, 19, 2, 19, 13, 23, 1, 23, 10, 27, 1, 13, 27, 31, 2, 31, 10, 35, 1, 35, 9, 39, 1, 39, 13, 43, 1, 13, 43, 47, 1, 47, 13, 51, 1, 13, 51, 55, 1, 5, 55, 59, 2, 10, 59, 63, 1, 9, 63, 67, 1, 6, 67, 71, 2, 71, 13, 75, 2, 75, 13, 79, 1, 79, 9, 83, 2, 83, 10, 87, 1, 9, 87, 91, 1, 6, 91, 95, 1, 95, 10, 99, 1, 99, 13, 103, 1, 13, 103, 107, 2, 13, 107, 111, 1, 111, 9, 115, 2, 115, 10, 119, 1, 119, 5, 123, 1, 123, 2, 127, 1, 127, 5, 0, 99, 2, 14, 0, 0 ]

main :: Effect Unit
main = do
  let result = run1 input 12 2
  logShow $ show result

run1 :: Array Int -> Int -> Int -> Int
run1 program input1 input2 =
  let
    memory = program <#> identity
    reseted = updateAtIndices [ Tuple 1 input1, Tuple 2 input2 ] program
    rng = 0 .. ((length reseted) / 4)

    result = foldl
      (\acc cur ->
          let
            { mem, halt } = acc
            instructions = slice (cur * 4) (cur * 4 + 4) mem
            code = atIndex 0 instructions
            p1 = atIndex 1 instructions
            p2 = atIndex 2 instructions
            p3 = atIndex 3 instructions
          in
            case halt, code of
              true, _ -> { mem, halt }
              _, 99 -> { mem, halt: true }
              _, _ -> { mem: operate mem code p1 p2 p3, halt }
      )
      { mem: reseted, halt: false }
      rng
  in
    fromMaybe 0 (head result.mem)

operate :: Array Int -> Int -> Int -> Int -> Int -> Array Int
operate mem code p1 p2 p3 =
  let
    op = case code of
      1 -> add
      2 -> mul
      _ -> (\a b -> a)

    res = (atIndex p1 mem) `op` (atIndex p2 mem)
  in
    updateAtIndices [ Tuple p3 res ] mem

atIndex :: Int -> Array Int -> Int
atIndex idx arr = fromMaybe 0 (arr !! idx)
