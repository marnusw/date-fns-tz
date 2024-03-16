### v3.0.0-beta.0 (9 March 2024)

- [UPGRADE] Support date-fns v3 (#265) Thank you, @christopherklint97

### v2.0.1 (9 March 2024)

- [DOCS] Fix incorrect output comment (#270)
- [DEPS] Limit to date-fns 2.x (#262, #267)
- [REFACTOR] `tzTokenizeDate`: Remove weird unneeded regex (#254)
- [BUGFIX] Improving correctness of the `formatInTimeZone` close to the DST threshold (#247)
- [ENHANCEMENT] Use hourCycle for browsers that support hour cycle formatting (#231)
- [BUGFIX] Fix tzParseTimezone to parse 00:30 timezones properly (#229)

### v2.0.0 (30 January 2023)

- [BREAKING CHANGE] Optimize configuration for ESM exports (entry points for cjs / esm / typescript) (#212)

**Upgrade guide:** Both CJS and ESM imports now use the default import paths. CJS will continue working unchanged;
to fix ESM imports:

Before:

```js
import { format } from 'date-fns-tz/esm'
import utcToZonedTime from 'date-fns-tz/esm/utcToZonedTime'
```

After:

```js
import { format } from 'date-fns-tz'
import utcToZonedTime from 'date-fns-tz/utcToZonedTime'
```

### v1.3.8 (30 January 2023)

- [TESTS] Tests documenting `zonedTimeToUtc` daylight saving jumps (#220)
- [TYPES] Update `format` types to match date-fns (#199)
- [BUGFIX] Fixed `undefined` timezone error (#214)

### v1.3.7 (31 August 2022)

- [BUGFIX] Fixed getting the time zone name in `partsTimeZone` out of `formatToParts` (#196)
- [BUGFIX] `tzTokenizeDate` uses `month: numeric` as a possible fix for #190

### v1.3.6 (13 July 2022)

- [BUGFIX] Remove the use of `const` (#192)

### v1.3.5 (18 June 2022)

- [BUGFIX] Fixed `utcToZonedTime` not working with year < 100; thanks @healqq (#185)

### v1.3.4 (28 April 2022)

- [BUGFIX] Add new to `DateTimeFormat` invocation to fix mocking it in tests (#181)
- [DOCS] Add notes on usage with Android

### v1.3.3 (1 April 2022)

- [BUGFIX] Fix broken ESM import (#177)

### v1.3.2 (31 March 2022)

- [BUGFIX] Support tz offsets up to +/-23:59 (#171)
- [BUGFIX] Fixed zonedTimeToUtc not working with year < 100 (#87, #170)

### v1.3.1 (25 March 2022)

- [BUGFIX] ESM export of package.json (#173)
- [BUGFIX] Round tz offset correctly to format old dates (#169, #168)

### v1.3.0 (24 February 2022)

- [ENHANCEMENT] Native ESM support via `exports` configuration in `package.json` (#133, #150)
- [DOCS] Clarify the use of ESM vs CommonJS import paths
- [DOCS] Clarify when `format` throws a `RangeError` and fix the test for it
- [ENHANCEMENT] More extensive validation of numeric time zone offsets
- [BUGFIX] Fixed `zonedTimeToUtc` throwing `RangeError` instead of returning an Invalid Date (#151)
- [BUGFIX] Fixed `format` not throwing `RangeError` for invalid time zones with offset tokens (#152)

### v1.2.2 (21 December 2021)

- [BUGFIX] Fix `formatInTimeZone` types and fp arguments

### v1.2.1 (21 December 2021)

- [DOCS] Fixed a broken link (#148)

### v1.2.0 (18 December 2021)

- [ENHANCEMENT] Add `formatInTimeZone`
- [DOCS] Various improvements and corrections
- [BUGFIX] Fixed `zonedTimeToUtc` parsing of date strings with time zone specifiers
- [ENHANCEMENT] Functions that return dates will return `Invalid Date` for bad date / time zone
  inputs, and `format` functions throw a `RangeError`
- [BUGFIX] Fix `format` returning wrong time zone offset close to DST. (#138)

### v1.1.7 (17 December 2021)

- [PERFORMANCE] Improve performance when validating the same timezones many times through caching; thanks @billthornton (#135)
- [TESTS] Added a test for #33 which now passes
- [BUGFIX] Fix `format` handling of quoted text next to a time zone token (#136)

### v1.1.6 (27 July 2021)

- [BUGFIX] Added an error object to the catch of isValidTimezoneIANAString for older JS (#131)

### v1.1.5 (27 July 2021)

- [BUGFIX] Fixed parsing IANA strings (#129)

### v1.1.4 (13 April 2021)

- [UPGRADE] Use Yarn berry
- [BUGFIX] Restore IE11 support (#112)

### v1.1.3 (27 February 2021)

- [BUGFIX] Support IANA timezones with a hyphen in the name! (#110)

### v1.1.2 (20 February 2021)

- [BUGFIX] Fix time zone offset around DST; thanks @bsvetlik & @yharaskrik! (#108, #99, #93)

### v1.1.1 (30 January 2021)

- [DOCS] Add `getTimezoneOffset` to TOC

### v1.1.0 (30 January 2021)

- [ENHANCEMENT] Add the `getTimezoneOffset` function (#100).
- [UPGRADE] Upgrade dependencies

### v1.0.12 (9 October 2020)

- [BUGFIX] Improve the #46 fix for `toDate` using the UTC timestamp for determining offset (#86).

### v1.0.11 (5 October 2020)

- [BUGFIX] Fix uctToZonedTime during timezone changes (#80).
- [BUGFIX] Fix `toDate` using the UTC timestamp for determining offset (#46).

### v1.0.10 (10 February 2020)

- [BUGFIX] Fix day wrapping when the result is midnight in new browsers supporting DTF `hourCycle` (#38, #41, #43).

### v1.0.9 (28 December 2019)

- [DOCS] Improve the documentation, particularly on the usage of `format`.

### v1.0.8 (12 October 2019)

- [BUGFIX] Not losing milliseconds when converting time zones. (#25)
- [BUGFIX] Fix missing `_lib/convertToFP/index.js`. (#20)
- [UPGRADE] Upgrade dependencies and match the `date-fns@2` build config.

### v1.0.6 (2 February 2019)

- [BUGFIX] Rewrite import paths in esm version to use esm version of date-fns. (#8 @pkaske)

### v1.0.3 (21 January 2019)

- [BUGFIX] Removed `const`, `let`, template string and arrow function syntax which is not transpiled in
  the ems build to fix for IE11.

### v1.0.0 (12 January 2019)

- [ENHANCEMENT] Typescript typings.

### v0.1.1 (13 November 2018)

Initial release.
