# Easy Collect

<div align="center">
<img src="https://raw.githubusercontent.com/DP6/templates-centro-de-inovacoes/main/public/images/centro_de_inovacao_dp6.png" height="100px" />
</div>

<p align="center">
  <a href="#badge">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
  <a href="https://codecov.io/gh/DP6/easy-collect">
    <img src="https://codecov.io/gh/DP6/easy-collect/branch/master/graph/badge.svg?token=GAQ88UQJQN"/>
  </a>
  <a href="#badge">
    <img alt="Test" src="https://github.com/dp6/easy-collect/actions/workflows/test.yml/badge.svg">
  </a>
  <a href="https://www.codacy.com/gh/DP6/easy-collect/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=DP6/easy-collect&amp;utm_campaign=Badge_Grade">
    <img src="https://app.codacy.com/project/badge/Grade/741dc3805af14444b9e6b4cb9b4269f4"/>
  </a>
</p>


### Available Languages

- [Read this page in English](https://github.com/DP6/easy-collect/blob/master/README.md)
- [Leia esta página em Português](https://github.com/DP6/easy-collect/blob/master/README-pt.md)

---

## 1. What is it for?

Easy Collect aims to facilitate the implementation, maintenance and standardization of *tags* in the context of *digital analytics*.

An example of the efforts involved in supporting standardization is the implementation of functions similar to the functions of the _jQuery_ library, commonly used in tagging projects. In this way, even in the absence of this, it will be possible to guarantee the standard and quality of data collection (See the compatibility table). If _jQuery_ exists, _Easy Collect_ simply delegates execution to it. The code in both cases will be the same.

** _Easy Collect_ Features:**

- DOM manipulation functions without relying on the _jQuery_ library;
- Simplified functions for data collection;
- Tag code standardization;
- Automatically sends JavaScript error alerts to _Google Universal Analytics_;
- Sends events to _Google Analytics Universal_ and _Google Analytics 4_;

**[Access here the "Technical Reference Document"](https://github.com/DP6/easy-collect/blob/master/documentations/docs/en/gtm-reference.md)**

### 1.1. Understanding the library

One of the main concepts of _Easy Collect_ is the maintenance of its API through a basic versioning [SemVer](https://semver.org/). For specific situations that will not happen again, we recommend expanding your API through the `fn` object.

#### The Object `fn`

It's a global variable within the scope of the _Easy Collect_ object, in order to group functions that do not belong to the current scope of the project.

```javascript
easyCollect.fn.myFunction = function(name) {
  console.log(name);
};
easyCollect.fn.myFunction('DP6'); // DP6
```

### 1.2. Compatibility

_Easy Collect_ depends on the native `querySelectorAll` function. The browsers that support this functionality are:

| Chrome | Firefox | IE  | Opera | Safari |
| ------ | ------- | --- | ----- | ------ |
| 1      | 3.5     | 8   | 10    | 3.2    |

## 2. Tag Managers

Initially, in version 1.0, the library supports _Google Tag Manager_ with sending data to _Google Analytics_. It's planned to support other tools on the market as well.

### 2.1. Google Tag Manager

- [Implementation Guide - Easy Collect + GTM + GAU](https://github.com/DP6/easy-collect/blob/master/documentations/docs/pt/gtm-config-gau.md)
- [Implementation Guide - Easy Collect + GTM + GA4](https://github.com/DP6/easy-collect/blob/master/documentations/docs/pt/gtm-config-ga4.md)
- [Implementation Guide - Easy Collect + GTM + GAU -> GA4 (Enhanced Ecommerce Migration)](https://github.com/DP6/easy-collect/blob/master/documentations/docs/pt/gtm-config-gau-ga4.md )

## 3. How to contribute

Pull requests welcome! We would love some help to evolve this module. Feel free to search for open issues. If there's a new feature or bug, please open a new issue, so our team can follow up.

### 3.1 Prerequirements

It will only be accepted contributions that follows the below requirements:

- [Commit pattern](https://www.conventionalcommits.org/en/v1.0.0/)

## Support

**DP6 Koopa-troopa Team**

_e-mail: <koopas@dp6.com.br>_

<img src="https://raw.githubusercontent.com/DP6/templates-centro-de-inovacoes/main/public/images/koopa.png" height="100" />