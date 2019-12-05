module Part2 where

import Prelude
import Control.Plus (empty)
import Data.Array ((..))
import Data.Maybe (fromMaybe)
import Effect (Effect)
import Effect.Console (logShow)
import Part1 (input, run1)

main :: Effect Unit
main = do
  let result = fromMaybe 0 (head $ run2 input)
  logShow $ show result

--
-- Array comprehension 🤘
--
run2 :: Array Int -> Array Int
run2 program = do
  noun <- 0 .. 100
  verb <- 0 .. 100
  if run1 program noun verb == 19690720
    then pure (100 * noun + verb)
    else empty
