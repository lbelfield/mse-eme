# Building a Query in NRQL

# The Fundamentals
It is good to start with the basic building blocks before jumping to the complex stuff. Building the query up in small increments lets you swing from vine to vine and refactor into something pretty!

## Tables
Two tables within DAZN - 
- JavaScriptErrors - Fatal Errors, Silent errors, (hard)
- PageActions - Not errors (msgs, events) (easy)
- Total_Rekall_Summary - : bandwith, bitrates, 

We share NR with all other teams. To filter to our project, we need to get our codebase. Everything lives in Playback Web Player, so filter for events sent from @dazn/playback-web-player

```
SELECT * FROM PageAction 
WHERE packageName='@dazn/playback-web-player'
```

## NRQL Gotchas:
### Time
The Default time is 1hr, so to increase the length of time, use the `SINCE` keyword:

```
SELECT * FROM PageAction 
WHERE packageName='@dazn/playback-web-player' 
SINCE 1 day ago
```

### Number of Results:
- LIMIT because by default, you get 20 results back

```
SELECT * FROM PageAction 
WHERE packageName='@dazn/playback-web-player' 
SINCE 1 day ago 
LIMIT MAX
```

### function()
- '*' is a good foundation for building a query, but pretty useless in NRQL. We want to put a function that visualises the data not in a table count(*). functions() unlocks visualising data.

```
SELECT count(*) FROM PageAction 
WHERE packageName='@dazn/playback-web-player' 
SINCE 1 day ago 
```

## Useful functions

Functions:
- `uniqueCount(param)`
- `count(param)`

Params:
- sessionId
- userId

```
SELECT uniqueCount(sessionId) FROM PageAction 
WHERE packageName='@dazn/playback-web-player' 
SINCE 1 day ago 
```

  
  
# The Powerful stuff

## FACET
FACET is NRQL's GROUPBY in SQL. This is where the queries get useful.

```
SELECT uniqueCount(sessionId) FROM PageAction 
WHERE packageName='@dazn/playback-web-player' 
SINCE 1 day ago 
LIMIT MAX 
FACET playerType
```

**Note**
When a query contains a `FACET`, `LIMIT` restricts the number of facets returned.
## TIMESERIES
TIMESERIES - make it a line graph. This now looking more like a query you could ship to a dashboard!

```
SELECT uniqueCount(sessionId) FROM PageAction 
WHERE packageName='@dazn/playback-web-player' 
SINCE 1 day ago 
LIMIT MAX 
FACET playerType 
TIMESERIES 
```

```
SELECT uniqueCount(sessionId) FROM PageAction 
WHERE packageName='@dazn/playback-web-player' 
SINCE 1 day ago 
FACET countryCode
TIMESERIES
```

## CHARTS
Use chartType on the RHS to change the graph to a bar/pie/line/ chart. Remove the TIMESERIES in order to do this.
  
  

## Building the FACET & WHERE clauses up
The most powerful thing you can do is play with FACETS.
Here we have switched the FACET from playerType to countryCode

```
SELECT uniqueCount(sessionId) FROM PageAction 
WHERE packageName='@dazn/playback-web-player' 
SINCE 1 day ago 
FACET countryCode
TIMESERIES
```

FACET by default should be all to build up - small steps and chunking is best here. You can start to remove from the FACET and add to your where clause as you go. I wouldn't start in the WHERE, just incase you miss. We are only interested in IT, so we add that to the countryCode and and keep the FACET 

```
SELECT uniqueCount(sessionId) FROM PageAction 
WHERE packageName='@dazn/playback-web-player' AND countryCode='IT'
SINCE 1 day ago 
FACET countryCode
TIMESERIES
```

### Remove the FACET and go deeper
We are now 'grouping by' FACET and have a WHERE clause with that FACET. That FACET therefore is no longer needed. Let's say we now need to check DAI vs Regional for IT only, we can FACET on activeSourceType and remove the previous FACET
```
SELECT uniqueCount(sessionId) FROM PageAction 
WHERE packageName='@dazn/playback-web-player' AND countryCode='IT'
SINCE 1 day ago 
FACET activeSourceType
TIMESERIES
```

  
  

## Using the UI to Change Your Query
If you drag over the graph, you can filter the time your interested in. You can then update this in your query  by pressing the button 'Update query with this time' and it updates the whole query!

```
SELECT uniqueCount(sessionId) FROM PageAction 
WHERE packageName='@dazn/playback-web-player' AND countryCode='IT'
SINCE '2022-10-23 07:41:00+0000' 
FACET activeSourceType
TIMESERIES UNTIL '2022-10-23 23:03:00+0000'
```

## Multiple FACETs
You can also FACET by multiple GROUPBYs

```
SELECT uniqueCount(sessionId) FROM PageAction 
WHERE packageName='@dazn/playback-web-player' AND countryCode='IT'
SINCE '2022-10-23 07:41:00+0000' 
FACET activeSourceType, adManagerProfile 
TIMESERIES UNTIL '2022-10-23 23:03:00+0000'
```

```
SELECT uniqueCount(sessionId) FROM PageAction 
WHERE packageName='@dazn/playback-web-player' AND countryCode='IT' AND activeSourceType='DAI'
SINCE '2022-10-23 07:41:00+0000' 
FACET playerType, adManagerProfile
TIMESERIES UNTIL '2022-10-23 23:03:00+0000'
```


## FACET List
FACET List in JSON:

```
SELECT keyset() FROM PageAction 
WHERE packageName='@dazn/playback-web-player'
SINCE 1 day ago
```

## LIKE
LIKE allows you to select multiple variables without specifying them all. For example, you could AND clause every Mercury player, or you could filter the variable with anything with Mercury in the name

```
SELECT uniqueCount(sessionId) FROM PageAction 
WHERE packageName='@dazn/playback-web-player' AND countryCode='IT' AND activeSourceType='DAI' AND playerType LIKE '%MERCURY%'
SINCE '2022-10-23 07:41:00+0000' 
FACET playerType, adManagerProfile
TIMESERIES UNTIL '2022-10-23 23:03:00+0000'
```

## RLIKE
RLIKE is for regular expressions:
RLIKE '[0-9]{5}' means only accept numbers with up to 5 digits

https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/nrql-syntax-clauses-functions/


## LOGS
Run the query:
```
SELECT cid FROM JavaScriptError 
WHERE playerType='[DAZN 2.0] MERCURY BROWSER' AND errorMessage='PLAYBACK_UNEXPECTED_STALL'
```

grab the `cid` from the table, for example: `1667569215532-09002`

Use the NR UI to get to Logs. Paste into the log:
`cid:1667569215532-09002` which will output your log. c/p the context.message string

browse to: https://messagereader.octo.indazn.com/ and paste that context.nessage string into that URL.

## JAVASCRIPT-ERROR TABLE

```
SELECT uniqueCount(sessionId) FROM JavaScriptError 
WHERE playerType LIKE '%[DAZN 2.0] MERCURY%' AND packageName='@dazn/playback-web-player'
FACET errorCategory
TIMESERIES
SINCE 1 day ago
```

```
SELECT uniqueCount(sessionId) FROM JavaScriptError 
WHERE playerType LIKE '%[DAZN 2.0] MERCURY%' AND packageName='@dazn/playback-web-player' AND errorCategory LIKE '%SOLUTION_%'
FACET errorMessage, errorCode, adManagerProfile
TIMESERIES
SINCE 1 day ago
```