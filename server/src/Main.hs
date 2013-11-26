{-# OPTIONS -Wall #-}

{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE OverloadedStrings #-}

module Main where

import              Control.Lens.TH
--import qualified    Data.ByteString.Char8 as B
import              Snap
import              Snap.Snaplet.PostgresqlSimple

data App = App
    { _db       :: Snaplet Postgres
    }

$(makeLenses ''App)

appInit :: SnapletInit App App
appInit = makeSnaplet "wearelearned" "WeAreLearned Content Server" Nothing $ do
    db <- nestSnaplet "db" db pgsInit
    addRoutes
        [ ("/hello", writeText "Hello, WeAreLearned")
        , ("/echo", echoHandler)
        ]
    return $ App db

echoHandler :: Handler b v ()
echoHandler = do
    writeText "Inside an echo"
