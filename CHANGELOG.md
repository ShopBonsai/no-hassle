# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.1] - 2023-02-13

- 💥 **Important**: Version `3.0.0` is not to be used as this patch introduces more breaking changes. It is the "true" version 3, as both breaking changes should have been released simultaneously.
- 🔥 Removed default `DEFAULT_API_KEY_HEADER`, this will be provided by the package user.
- 💥 Removed `authOptions` and changed `auth` in `ISwaggerOptions` to be more flexible. Allows multiple `securityDefinitions` and a custom root-level `security`.
- ✨ Allows passing `security` at the operation/route level to specify the authentication to use with individual routes.

## [3.0.0] - 2023-02-10

### Breaking

- Replaced `shouldOmitPrefix` with `prefixToOmit`. Now an optional string is provided instead of a boolean.
- This string will be replaced from the start of generated URL path for the given route.

## [2.10.0] - 2023-01-07

### Fixed

- Fixed issue where routes and generating swagger would use different swagger definitions

## [2.9.0] - 2023-01-07

### Fixed

- Fixed issue where responses were duplicated in multiple paths in OpenAPI
- Added tests for swagger generation
- Added an option to provide initial swagger definition

## [2.8.0] - 2023-01-06

### Added

- Added response status codes 402, 403, and 500 to OpenAPI
- Filtered out responses without a schema

## [2.7.0] - 2022-12-20

### Added

- Added support for `externalDocs` in OpenAPI

## [2.6.0] - 2022-12-08

### Added

- Added support for requiring headers and query parameters in OpenAPI

## [2.5.0] - 2022-12-08

### Added

- Added support for validating headers

## [2.4.0] - 2022-12-08

### Added

- Added `apiKey` as an auth option
- Added `authOptions` to config to set the header name for the API key

## [2.3.0] - 2022-12-08

### Added

- Added `schemes` option to config to set the schemes in the docs

## [2.2.0] - 2022-12-06

### Added

- Added `shouldOmitPrefixInDocs` option to config to omit the path prefix in the docs

## [2.0.0] - 2021-10-02

### Breaking

- Dropped support for Node 10!

### Changed

- Updated devDependencies to latest versions
