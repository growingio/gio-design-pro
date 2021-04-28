## [21.4.3-alpha.5](https://github.com/growingio/gio-design-pro/compare/v21.4.2...v21.4.3-alpha.5) (2021-04-28)


### Bug Fixes

* **event-selector:** bind onCancel ([0da8232](https://github.com/growingio/gio-design-pro/commit/0da8232cfcb4629d5fa0f16e6799ae39e2fe2d9a))
* **filter-picker:** 修复日期类型,返回值为数字,以及添加op配置字段 ([#214](https://github.com/growingio/gio-design-pro/issues/214)) ([dcb5a7d](https://github.com/growingio/gio-design-pro/commit/dcb5a7d5fc707f2b2f6a35ed4da320db207aaab3))
* **operation-menu:** 修复因为gio-design版本升级导致的样式问题 ([#212](https://github.com/growingio/gio-design-pro/issues/212)) ([da7c3e7](https://github.com/growingio/gio-design-pro/commit/da7c3e72fa44086c776dbd399005f733811b9bdc))


### Features

* **event-picker:** add component event-picker ([41dfcc3](https://github.com/growingio/gio-design-pro/commit/41dfcc318396404acc4c51cefe3fca719bcfb99a))
* **event-picker:** add component event-picker ([1417fdc](https://github.com/growingio/gio-design-pro/commit/1417fdc7113ae067d980c15dc5dd4fe6a47d400a))
* **event-selector:** add component event-selector ([efb0fb6](https://github.com/growingio/gio-design-pro/commit/efb0fb67d31f4cf7fbc5590dab5c5d36ce7e199d))



## [21.4.2](https://github.com/growingio/gio-design-pro/compare/v21.4.1...v21.4.2) (2021-04-22)


### Features

* **tablecard:** add showtabs prop ([f748aac](https://github.com/growingio/gio-design-pro/commit/f748aacef0b8811660a5912db2d6a17d24fb181a))
* **tablecard:** button support tooltip ([#210](https://github.com/growingio/gio-design-pro/issues/210)) ([d1439ac](https://github.com/growingio/gio-design-pro/commit/d1439acead2f066cc54d8c170c86573ef6b211c9))
* **tooltip-button:** add tooltip button 组件 ([#209](https://github.com/growingio/gio-design-pro/issues/209)) ([d2d9697](https://github.com/growingio/gio-design-pro/commit/d2d9697b6bf24eea9cd09f57b6282b8958a14762))
* **treecard:** add treecard component ([#200](https://github.com/growingio/gio-design-pro/issues/200)) ([033d1d8](https://github.com/growingio/gio-design-pro/commit/033d1d8c14447b43a16694a61cb4d7134263490f))
* **user-picker:** add parameters disabledValues and showSegmentCard ([#203](https://github.com/growingio/gio-design-pro/issues/203)) ([b1e9dfe](https://github.com/growingio/gio-design-pro/commit/b1e9dfe51dde1b4eb88bd5aa406e662d52458021))



## [21.4.1](https://github.com/growingio/gio-design-pro/compare/v21.4.0...v21.4.1) (2021-04-14)


### Features

* **title-info-card:** add title-info-card component ([7d50c73](https://github.com/growingio/gio-design-pro/commit/7d50c73bab72e5650ce2bc4f65e34280cc4d63af))



# [21.4.0](https://github.com/growingio/gio-design-pro/compare/v21.3.4...v21.4.0) (2021-04-02)


### Bug Fixes

* **user-picker:** add onShowSegmentChart to show chart in segment card ([#167](https://github.com/growingio/gio-design-pro/issues/167)) ([5088bba](https://github.com/growingio/gio-design-pro/commit/5088bba6bbae223e45ef41888e0552ed3beb35ed))


### Features

* **peer depend gio-design/icons gio-design/tokens:** set icons and tokens as peer dependencies ([5e37235](https://github.com/growingio/gio-design-pro/commit/5e37235418b4d47f35218110e5b06ca4d0974c83))
* **tablecard:** add tablecard component ([a8ecaad](https://github.com/growingio/gio-design-pro/commit/a8ecaad7087f7479e1702b52e89d9f26b208758e))
* **user-picker:** add property disabledValues ([7b2d06d](https://github.com/growingio/gio-design-pro/commit/7b2d06dc96dcd13b4970cd62fbc056cd6e18fea6))



## [21.3.4](https://github.com/growingio/gio-design-pro/compare/v21.3.3...v21.3.4) (2021-03-19)


### Bug Fixes

* **property-picker:** 修复右侧浮动窗口 bug ([#159](https://github.com/growingio/gio-design-pro/issues/159)) ([383f5e4](https://github.com/growingio/gio-design-pro/commit/383f5e4e1f05677ed49d550e7670f303be362a5b))
* **property-selector:** 修复property-selector value 没有监听变化,修改value,property-select没有变化 ([#165](https://github.com/growingio/gio-design-pro/issues/165)) ([7cdb303](https://github.com/growingio/gio-design-pro/commit/7cdb3037fca07d8279b04927b53d21d5684a6ae4))
* **user-selector:** update recent with 100ms delay ([#164](https://github.com/growingio/gio-design-pro/issues/164)) ([b6e7a78](https://github.com/growingio/gio-design-pro/commit/b6e7a78813f6511f1cb6f2fe517e65e2a7852119)), closes [#130](https://github.com/growingio/gio-design-pro/issues/130)


### Features

* upgrade dependencies ([#163](https://github.com/growingio/gio-design-pro/issues/163)) ([0944eaf](https://github.com/growingio/gio-design-pro/commit/0944eaf24fb25d0975d779ca1b0b5737e40ee5d4))


### BREAKING CHANGES

* Use @gio-design/components as peer dependency.



## [21.3.3](https://github.com/growingio/gio-design-pro/compare/v21.3.2...v21.3.3) (2021-03-12)


### Bug Fixes

* **filter-picker:** 添加 fetchDetailData 方法, 删除 Picker ([#151](https://github.com/growingio/gio-design-pro/issues/151)) ([41e9f15](https://github.com/growingio/gio-design-pro/commit/41e9f15387859645c84018d90e7d6c603acc13fd))
* **selector:** 修复 selector 组件的样式覆盖问题 ([#150](https://github.com/growingio/gio-design-pro/issues/150)) ([244ce56](https://github.com/growingio/gio-design-pro/commit/244ce5647cf3086435e7b8b402de12bd0740d3d2))


### Performance Improvements

* **property-picker:** 给 Fragment 组件添加 key，修复开发环境报 warning 的问题 ([#152](https://github.com/growingio/gio-design-pro/issues/152)) ([940ccb8](https://github.com/growingio/gio-design-pro/commit/940ccb8616e597fd006d8f9b873f10125e6fface))



## [21.3.2](https://github.com/growingio/gio-design-pro/compare/v21.3.1...v21.3.2) (2021-03-11)


### Features

* **filter-picker:** add Filter-Picker ([#69](https://github.com/growingio/gio-design-pro/issues/69)) ([af9990d](https://github.com/growingio/gio-design-pro/commit/af9990d1874e90b6f6094446de1f60ee18e1ab92))
* **operation-menu:** operation-menu组件dropdowm默认弹出位置修改 ([edb37ae](https://github.com/growingio/gio-design-pro/commit/edb37aeef6d38426c62cbc4953f53f9c6673d9e6))



## [21.3.1](https://github.com/growingio/gio-design-pro/compare/v21.3.0...v21.3.1) (2021-03-09)


### Features

* **operation-menu:** 将dropdown拿到body下面 ([35212cf](https://github.com/growingio/gio-design-pro/commit/35212cfcaf4cfc381816c1e43b45e223519dd399))



# [21.3.0](https://github.com/growingio/gio-design-pro/compare/v21.2.0...v21.3.0) (2021-03-05)


### Features

* **property-picker:** add component property-picker  ([#104](https://github.com/growingio/gio-design-pro/issues/104)) ([051ba9d](https://github.com/growingio/gio-design-pro/commit/051ba9d1f9db984841e4479b641f43f4dc813722))



# [21.2.0](https://github.com/growingio/gio-design-pro/compare/v20.12.2...v21.2.0) (2021-02-07)


### Features

* **base-picker:** add base picker for business pickers ([dc87f4a](https://github.com/growingio/gio-design-pro/commit/dc87f4a8d83d4b31e402a08cf585f5647b948d89))
* **list:** complete list component with new style ([bc290a2](https://github.com/growingio/gio-design-pro/commit/bc290a2bbcb121cbaa09169e3f05c322415835cf))
* **list:** set text-overflow for list item ([a93dfba](https://github.com/growingio/gio-design-pro/commit/a93dfba313de1af54a73017f98374751b8b9395d))
* **user-selector:** add components for segement ([41878cb](https://github.com/growingio/gio-design-pro/commit/41878cbe845d391413a5f78ce3647dba7bc8dc7b))



## [20.12.2](https://github.com/growingio/gio-design-pro/compare/v20.12.1...v20.12.2) (2020-12-31)


### Bug Fixes

* **operation-menu:** update icons name with components' new version ([4b61cce](https://github.com/growingio/gio-design-pro/commit/4b61ccea78a0b96e43adacb06b6ef2145d298fda))
* import components less files in ts files ([312d961](https://github.com/growingio/gio-design-pro/commit/312d961655fc96e00bae467366f47a4f3fe94ff4))



## [20.12.1](https://github.com/growingio/gio-design-pro/compare/v20.12.0...v20.12.1) (2020-12-09)


### Bug Fixes

* **user-picker:** fix compile errors ([0b8df40](https://github.com/growingio/gio-design-pro/commit/0b8df40a8e4dbd7b60ff8e0d7a44bfaf1dd610a9))
* **user-picker:** fix picker props type error ([121b613](https://github.com/growingio/gio-design-pro/commit/121b613aeb3d57d170667f614b378a1dbaf08c5c))
* option item text-align: center bug ([#31](https://github.com/growingio/gio-design-pro/issues/31)) ([7fdcd74](https://github.com/growingio/gio-design-pro/commit/7fdcd74ed05f800dafa6de61d2cf6b27c99e8ff6))


### Features

* add base picker and user picker ([#27](https://github.com/growingio/gio-design-pro/issues/27)) ([392497b](https://github.com/growingio/gio-design-pro/commit/392497be56244348bec1d77664852344f292be3e))


### Reverts

* Revert "docs(release): version 20.12.1 changelog" ([1091398](https://github.com/growingio/gio-design-pro/commit/10913980f32c827dea795ae5eba2fcc30fa4a64e))



# [20.12.0](https://github.com/growingio/gio-design-pro/compare/3bd2d879ac6d248dfb3f41611080e9b08aa5cad1...v20.12.0) (2020-12-09)


### Bug Fixes

* update test job in ci/cd workflows ([93227c9](https://github.com/growingio/gio-design-pro/commit/93227c9db8a3d60001a12ba01d3271b58ba1f053))


### Features

* **emptyprompt:** add empty prompt component ([3bd2d87](https://github.com/growingio/gio-design-pro/commit/3bd2d879ac6d248dfb3f41611080e9b08aa5cad1))
* **operation-menu:** add OperationMenu component ([#21](https://github.com/growingio/gio-design-pro/issues/21)) ([1251ffd](https://github.com/growingio/gio-design-pro/commit/1251ffd25c00a8d06a9487ab61ce5f9574098473))
* **types:** generate types with graphql schema ([b411739](https://github.com/growingio/gio-design-pro/commit/b41173904277fd71f524dee280343ead9ee0d7fa))
* **user-picker:** add user picker component ([2bdac8c](https://github.com/growingio/gio-design-pro/commit/2bdac8c00ea3e02678c0440924d5569742fc8115))


### Reverts

* Revert "docs(release): v20.12.0 changelog" ([6bb5e4a](https://github.com/growingio/gio-design-pro/commit/6bb5e4a4fa56a0f2205a4a460eb88eded629122b))



