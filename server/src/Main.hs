{-# OPTIONS -Wall #-}

{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE FlexibleInstances, ScopedTypeVariables #-}

module Main where

import              Control.Applicative
import              Control.Lens.TH
import qualified    Data.ByteString.Char8 as B
import              Snap
import              Snap.Extras.JSON
import              Snap.Snaplet.PostgresqlSimple

data App = App
    { _db       :: Snaplet Postgres
    }

$(makeLenses ''App)

instance HasPostgres (Handler b App) where
    getPostgresState = with db get

appInit :: SnapletInit App App
appInit = makeSnaplet "wearelearned" "WeAreLearned Content Server" Nothing $ do
    db' <- nestSnaplet "db" db pgsInit
    addRoutes
        [ ("/hello", writeText "Hello, WeAreLearned")
        , ("/echo", echoHandler)
        , ("/", sendFile "index.html")
        , ("/topics", topicsHandler >>= writeJSON)
        , ("/relations", relationsHandler >>= writeJSON)
        , ("vivagraph.min.js", sendFile "vivagraph.min.js")
        ]
    return $ App db'

echoHandler :: Handler b App ()
echoHandler = do
    res <- query_ "select 1"
    forM_ res $ \[one] -> 
        writeBS . B.pack . show $ (one :: Int)

topicsHandler :: Handler b App [(Int,String)]
topicsHandler = query_ "select id, name from topic"

relationsHandler :: Handler b App [(Int,Int)]
relationsHandler = query_ "select depend, derive from relation"

main :: IO ()
main = serveSnaplet defaultConfig appInit
