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

- [Read this page in English](https://github.com/DP6/easy-collect/blob/master/documentations/docs/en/gtm-config-gau.md)
- [Leia esta página em Português](https://github.com/DP6/easy-collect/blob/master/documentations/docs/pt/gtm-config-gau.md)

---

# Google Tag Manager Configuration - Easy Collect + Google Analytics Universal

This document describe the steps to use the Easy Collect library with Google Tag Manager in addition to explaining all the necessary settings.

## Main Tag Creation

In the folder _build_ copy the `main.js` (either the example file available in this repository or a custom version generated via Gulp) and pasted it into a Tag Custom HTML in GTM.

In _Advanced settings > Tag firing options_ choose "once per page".

![One per page configuration](/documentations/images/once_per_page.png)

Tags that use the `easyCollect` object in the HTML code must configure the previously created tag in _Advanced settings > Tag Sequencing_. This way it's assure that the object will be defined on the page before use.

## Triggers Configuration

Four triggers of type _custom event_ must be created.

The event names will be the same names used to identify them in the data layer: _gtm\_dataQuality\_event_, _ga\_pageview_, _ga\_event_ and _ga\_timing_.

![Triggers](/documentations/images/event_name.png)

## Template Tags

Four Universal Analytics tags must be created, one for each trigger created above.

These tags must be populated with the data layer variables listed in the next section. Tags can be modified to include or remove custom dimensions, ecommerce data, and other settings.

### Pageview Template (+ GA Settings)

![Pageview Template Tag](/documentations/images/tag_pageview.png)

### Event Template (+ GA Settings)

![Event Template Tag](/documentations/images/tag_event.png)

### Timing Template (+ GA Settings)

![Timing Template Tag](/documentations/images/tag_timing.png)

### Data Quality Template

![Data Quality Template Tag](/documentations/images/tag_dataquality.png)

### GA Settings Template

![GA Settings Variable](/documentations/images/var_gasettings.png)

## Variables

The default variables _Container ID_ and _Debug Mode_ must be enabled, as they are used by the _main tag_ code.

The following table describes all variables of type _data layer variable_ that must be created for use in Google Analytics template tags:

| Variable name | Tag/Variable that uses | Template field |
| --- | --- | --- |
| eventCategory | Event Tag | Category |
| eventAction | Event Tag | Action |
| eventValue | Event Tag | Value |
| eventNoInteraction | Event Tag       | Non-Interaction Hit |
| timingCategory | Event Tag | Category |
| timingVariable | Event Tag | Variável |
| timingValue | Event Tag | Value |
| timingLabel | Event Tag | Label |
| path | GA Settings | Fields to Set -> page |
| userId | GA Settings| Fields to Set -> userId |
| dataQuality.category | Data Quality Tag | Category |
| dataQuality.action| Data Quality Tag | Action |
| dataQuality.label | Data Quality Tag | Label |
| dataQuality.selector | Data Quality Tag | Custom dimensions -> 1 |
| dataQuality.event | Data Quality Tag | Custom dimensions -> 2 |

If you use the waitQueue option (enabled by default), the following _custom javascript_ variable must be created and added to the _hitCallback_ field in _Fields to Set_ in the Google Analytics template tags.

```javascript
function () {
  return function () {
    easyCollect.internal.sentPageview = true;
    while (easyCollect.internal.eventQueue.length) {
      easyCollect.event.apply(easyCollect, easyCollect.internal.eventQueue.shift());
    }
    while (easyCollect.internal.timingQueue.length) {
      easyCollect.timing.apply(easyCollect, easyCollect.internal.timingQueue.shift());
    }
  };
}
```

![Tag de template de GA Settings](/documentations/images/hit_callback.png)