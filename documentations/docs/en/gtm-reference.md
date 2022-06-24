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

- [Read this page in English](https://github.com/DP6/easy-collect/blob/master/documentations/docs/en/gtm-reference.md)
- [Leia esta página em Português](https://github.com/DP6/easy-collect/blob/master/documentations/docs/pt/gtm-reference.md)

---

# Summary

- [Technical Reference](#referência-técnica)
  - [Options object](#object-options)
    - [init(opt_options)](#initopt_options)
  - [API](#api)
    - [Google Analytics Collection (GA)](#coleta-google-analytics-ga)
      - [pageview(path, object)](#pageviewpath-object)
        - [Parameters](#parâmetros)
        - [Code example](#exemplo-de-código)
      - [event(category, action, label, object)](#eventcategory-action-label-object)
      - [event(category, action, label, value, object)](#eventcategory-action-label-value-object)
        - [Parameters](#parâmetros-1)
        - [Code example](#exemplo-de-código-1)
    - [Utilities](#utilidades)
      - [getDataLayer(key)](#getdatalayerkey)
        - [Arguments](#argumentos)
        - [Return:](#retorno)
        - [Code example](#exemplo-de-código-2)
      - [getKey(key, opt_root)](#getkeykey-opt_root)
        - [Arguments](#argumentos-1)
        - [Return](#retorno-1)
        - [Code example](#exemplo-de-código-3)
      - [sanitize(text, opts)](#sanitizetext-opts)
        - [Arguments](#argumentos-2)
        - [Return](#retorno-2)
        - [Code example](#exemplo-de-código-4)
      - [cookie(name, value, opts)](#cookiename-value-opts)
        - [Arguments](#argumentos-3)
        - [Return](#retorno-3)
        - [Cookie creation example](#exemplo-de-criação-de-cookie)
        - [Example of retrieving cookie value](#exemplo-de-recuperar-value-de-um-cookie)
    - [SafeFn](#safefn)
      - [Function arguments](#argumentos-da-função)
      - [Return](#retorno-4)
        - [Code example](#exemplo-de-código-5)
      - [Throwing exceptions](#lançamento-de-exceptions)
    - [Internal Easy Collect](#easy-collect-interno)
      - [on(event, selector, callback, parent)](#onevent-selector-callback-parent)
      - [Arguments](#argumentos-4)
        - [Code example](#exemplo-de-código-6)
      - [delegate(event, selector, callback)](#delegateevent-selector-callback)
      - [Arguments](#argumentos-5)
        - [Code example](#exemplo-de-código-7)
      - [wrap(elm)](#wrapelm)
        - [Arguments](#argumentos-6)
        - [Return](#retorno-5)
        - [Code example](#exemplos-de-código)
    - [Object Wrap](#object-wrap)
      - [Nodes Attribute](#atributo-nodes)
      - [hasClass(className, opts)](#hasclassclassname-opts)
        - [Arguments](#argumentos-7)
        - [Return](#retorno-6)
        - [Code example](#exemplo-de-código-8)
      - [log(type, message, object)](#logtype-message-object)
        - [Arguments](#argumentos-8)
        - [Return](#retorno-7)
        - [Code example](#exemplo-de-código-9)
      - [matches(selector, reduce)](#matchesselector-reduce)
        - [Arguments](#argumentos-9)
        - [Return](#retorno-8)
        - [Code example](#exemplo-de-código-10)
      - [closest(selector)](#closestselector)
        - [Arguments](#argumentos-10)
        - [Return](#retorno-9)
        - [Code example](#exemplo-de-código-11)
      - [text(opt)](#textopt)
        - [Arguments](#argumentos-11)
        - [Return](#retorno-10)
        - [Code example](#exemplo-de-código-12)
      - [find(sel)](#findsel)
        - [Arguments](#argumentos-12)
        - [Return](#retorno-11)
        - [Code example](#exemplo-de-código-13)
      - [map(func, params)](#mapfunc-params)
        - [Arguments](#argumentos-13)
      - [Code example](#exemplo-de-código-14)
      - [Package size](#tamanho-do-pacote)
      - [Credits](#créditos)

# Technical Reference

> Easy Collect para o Google Tag Manager

This document introduces the APIs and functionality developed to support Google Tag Manager (GTM). Some settings on the tool's side are important so that the code implemented in the Easy Collect tag has the expected behavior. More details about [here](https://github.com/DP6/easy-collect/blob/master/README.md).

## Options object

The `options` object contains the global _Easy Collect_ settings. The default values will work in most cases, so they should be changed carefully and consciously.

```javascript
    var options = {
      helperName: 'easyCollect',
      dataLayerName: 'dataLayer',
      debug: ({{Debug Mode}} || false),
      waitQueue: true,
      containerId: ({{Container ID}} || ''),
      exceptionEvent: 'gtm_dataQuality_event',
      exceptionCategory: 'GTM Exception',
      customNamePageview: 'ga_pageview',
      customNameEvent: 'ga_event',
      customNameTiming: 'ga_timing',
      errorSampleRate: 1
    };
```

### init(opt_options)

Use this optional function to start Easy Collect with options other than the default ones. It takes as an argument the `opt_options` object, which has the following keys:

- `helperName` -- By default `"easyCollect"`.
   A string that identifies the name of the _Easy Collect_ instance in the _window_ object of the browser. Tagging is not affected by changing this value if done by the `safeFn` function (recommended).

- `dataLayerName` -- By default `"dataLayer"`.
   A string that identifies the name of the _data layer_ instance in the browser's _window_ object. It must be the same value set in the _snippet_ of the GTM in order for the _Easy Collect_ interface functions (eg `getDataLayer`) to work.

- `debug` -- By default this is the GTM variable `{{Debug Mode}}`. If disabled, it is `false`.
   A boolean that signals to _Easy Collect_ whether the current context is debug or production. If true, events will be triggered only via `console.log`, without sending them to GA.

- `waitQueue` -- Default is `true`
   A boolean that signals to _Easy Collect_ whether it should use a queue on events. If true, all events will be stacked in an internal structure until the first pageview on the page occurs. We recommend that this option is always enabled, as it avoids inconsistencies in Google Analytics reports.

- `containerId` -- By default this is the GTM variable `{{Container ID}}`. If disabled, it is the empty string `''`.
   A string that should match the ID of the GTM container where _Easy Collect_ was configured (GTM-XXXXX).

- `exceptionEvent` -- By default `"gtm_dataQuality_event"`.
  A string that identifies the event sent to the data layer if an exception occurs in the GTM code. This option supports the idea of ​​collecting for a Google Analytics property of [_Quality Assurance_](https://www.observepoint.com/blog/why-automate-your-web-analytics-qa/) . To better understand the use of this configuration, [see GTM configuration documentation](https://github.com/DP6/easy-collect/blob/master/documentations/docs/en/gtm-config-gau.md).

- `exceptionCategory` -- By default `"GTM Exception"`.
  A string that indicates which value should be filled in the `"event_category"` key of the event sent to the data layer in case an exception occurs in the GTM code. This option supports the idea of ​​collecting for a Google Analytics property of [_Quality Assurance_](https://www.observepoint.com/blog/why-automate-your-web-analytics-qa/) . To better understand the usage of this configuration, [see GTM configuration documentation](https://github.com/DP6/easy-collect/blob/master/documentations/docs/en/gtm-config-gau.md)
- `customNamePageview` -- By default `"ga_pageview"`.
   The string that identifies the event sent to the data layer each time the `pageview` function (see below) is called.

- `customNameEvent` -- By default `"ga_event"`.
   A string that identifies the event sent to the data layer each time the `event` function (see below) is called.

- `customNameTiming` -- By default `"ga_timing"`.
   A string that identifies the timing event sent to the data layer each time the `timing` function (see below) is called.

- `errorSampleRate` -- By default `1` .
   Must be an integer between 0 and 1, which controls the sampling level of errors sent to the GA of _Data Quality_ **(more details to be added)**. It is used to control the collection in environments where the volume of shots is very large.

## API

### Google Analytics Collection (GA)

The following functions have specificities for collecting data based on GA and GTM tools. Because of this, the internal functions of this API use the variable created by GTM called [`dataLayer`](https://developers.google.com/tag-manager/devguide). To ensure that the functionalities of the functions are correct, it will be necessary to ensure that the environment in question has the data layer correctly initialized.

#### pageview(path, object)

Used to trigger custom pageview.

##### Parameters

- `path` (optional): String that receives the path of the custom Pageview.
- `object` (optional): Object that will be assigned to the pageview. It can be used to pass Enhanced Ecommerce objects, as well as custom metrics and dimensions. Any custom key will be pushed into the dataLayer.

##### Code example

```javascript
easyCollect.pageview('/post/finished-reading', {
  area: 'Open',
  categoria: 'Data Science'
});
```

#### event(category, action, label, object)

#### event(category, action, label, value, object)

Used to trigger events.

##### Parameters

- `category`: String representing the event category.
- `action`: String representing the action of the event.
- `label` (optional): String that can represent the event label.
- `object` (optional): Object that will be assigned to the event. It can be used to pass Enhanced Ecommerce objects, as well as custom metrics and dimensions. Any custom key will be pushed into the dataLayer.

_Important_: The value key can be passed either as the fourth value of the call or as a parameter of the object `"object"`.

##### Code example

```javascript
easyCollect.event('MyCategory', 'MyAction', 'MyLabel', 0, {
  city: 'São Paulo'
});
```

```javascript
easyCollect.event('MyCategory', 'MyAction', 'MyLabel', {
  eventValue: 0,
  city: 'São Paulo'
});
```

### Utilities

#### getDataLayer(key)

Returns any object contained in the dataLayer exposed in the environment. This function is an encapsulation of the GTM [macro .get()](https://developers.google.com/tag-manager/api/v1/reference/accounts/containers/macros).

##### Arguments

- `key`: String representing the key of the object to be retrieved.

##### Return:

- **ANY**: The value retrieved from the GTM data model.

##### Code example

```javascript
dataLayer.push({
  myObject: 'value',
  myOtherObject: 'otherValue'
});

easyCollect.getDataLayer('myObject'); // value
```

#### getKey(key, opt_root)

Finds an object or value by the given key. If any of the keys in the chain does not exist, the function returns undefined, thus avoiding throwing errors.

##### Arguments

- `key`: String representing the key of the object to be found
- `opt_root` (Optional): Object that has the key to find. By default it is `window`.

##### Return

- **ANY**: The value retrieved from the data model of the given variable.

##### Code example

```javascript
var object = {
  myObject: {
    myArray: [
      {
        myKey: 'found my value'
      }
    ]
  }
};

easyCollect.getKey('object.myObject.myArray.0.myKey'); // found my value
easyCollect.getKey('myObject.myArray.0.myKey', object); // found my value
easyCollect.getKey('chaveNaoExistente.myArray.0.myKey', object); // undefined
```

#### sanitize(text, opts)

Returns text without special characters, accents, spaces or capital letters (optionally).

##### Arguments

- `text`: String to be treated
- `opts` (optional): Object with variables to configure the sanitize function.
   _ `capitalized`: Defines the way the String will be treated. - true: Put the String as Camel Case; - false: Sets the String as Snake Case.
   _ `spacer`: Defines which text will be used as a separator in place of `_`.

##### Return

- **String**: The value received by parameter and modified by the function.

##### Code example

```javascript
easyCollect.sanitize('My Disorganized String'); // my_disorganized_string
easyCollect.sanitize('My Disorganized String', { capitalized: true }); // MyDisorganizedString
easyCollect.sanitize('My Disorganized String', { spacer: '-' }); // my-disorganized-string
easyCollect.sanitize('My Disorganized String', {
  capitalized: true,
  spacer: '-'
}); // My-Disorganized-String
```

#### cookie(name, value, opts)
Creates a cookie or returns its value based on the Parameters received in the function.

##### Arguments

- `name`: String representing the name of the cookie;
- `value`: String representing the value of the cookie;
- `opts` (optional): Object with variables to configure the cookie function:
   - `exdays` (optional): Numeric representing the number of days for the cookie to expire;
   - `domain`: (optional): String representing the domain to which the cookie should be assigned;
   - `path` (optional): String representing the website path to which the cookie should be assigned;

##### Return

- **String**: complete value of the created or retrieved cookie.

##### Cookie creation example

```javascript
easyCollect.cookie('myCookie', 'myValue', {
  exdays: 3, // Expire days
  domain: '.mydomain.com.br', // Domain that the cookie assigned
  path: '/my-path' // Cookie path
}); // myCookie=myValue; expires=Sun, 16 Oct 2016 19:18:17 GMT; domain=.mydomain.com.br; path=/my-path
```

##### Example of retrieving cookie value

```javascript
easyCollect.cookie('myCookie'); // myValue
```

### SafeFn
Easy Collect safe function. The main concept behind its use is to guarantee that data collection does not interfere with the natural behavior of the portal when it is used, avoiding leakage of logs and errors to the environment in question.

To make this proposal effective, the function receives a parameter callback. Within the scope of this callback, it is possible to receive a parameter object with extended Easy Collect functions, in order to guarantee the encapsulation of sensitive functions. This object will be represented from now on as "Internal Easy Collect" (more details in the next section).

#### Function arguments

- `id`: It must receive the name of the tag (from the GTM) in which the code in question is contained.
- `callback`: Callback function that scopes to the safeFn environment. Pass via parameter the Internal Easy Collect for use.
- `immediate` (Optional): Boolean variable, which by default (**true**) executes the callback function immediately. If **false**, the function's return will be the safe function itself, which must be executed manually when necessary.

#### Return

- **Function** or **undefined**: If the `immediate` parameter receives the value true, safeFn executes the callback and returns undefined. But if the `immediate` parameter has the value false, the return is the callback function itself to be executed later.

##### Code example

```javascript
easyCollect.safeFn('GTM Tag Name', function(collect) {
  collect.event('MyCategory', 'MyAction', 'MyLabel', 'Meuvalue', {
    dimension1: 'São Paulo'
  });
});

var fn = easyCollect.safefn(
  'GTM Tag Name',
  function(collect) {
    console.log(new Date());
  },
  { immediate: false }
);

setTimeout(fn, 2000);
```

#### Throwing exceptions
The `safeFn` function has a specific treatment for Exceptions that occur within its safe scope. Using the Easy Collect customization variables options.debug, options.exceptionEvent, options.exceptionCategory and options.errorSampleRate, the function assigns valuees to the GTM dataLayer, which will use the GTM configuration to send events to Google Analytics. This practice is based on the design of [Quality Assurance](https://www.observepoint.com/blog/why-automate-your-web-analytics-qa/).

### Internal Easy Collect

Object with built-in functions passed via parameter in the `safeFn` function callback.

#### on(event, selector, callback, parent)

The `on` method is used to execute a callback when executing some event in a specific HTML element. In case there is no jQuery on the page, it is based on the querySelectorAll javascript function, and because of that, it is necessary to pay attention to browser compatibility. It is not recommended to use this function on pages that support IE 7 or lower.

The presence of the fourth argument, `parent`, transforms the functionality of the `on` method into that of the [`delegate`](#delegateevent-selector-callback) method.

#### Arguments
- `event`: String of the event that will execute the callback, examples: 'mousedown', 'click', etc.
   [Learn more](https://mdn.mozilla.org/en-US/docs/Web/Events).

- `selector`: CSS Selector String that will fetch the elements that will execute the callback in the event firing.
   [Learn More](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

- `callback`: Function executed on triggering the event supplied in the `event` parameter.

- `parent` (optional): Root element from where the event should be heard.

##### Code example

```javascript
easyCollect.safeFn('Tag Name', function(collect) {
  collect.on('mousedown', '#buttonX', function(collect) {
    collect.event('MyCategory', 'MyAction', 'MyLabel');
  });
});

easyCollect.safeFn('Tag Name', function(collect) {
  collect.on(
    'mousedown',
    '#buttonX',
    function(collect) {
      collect.event('MyCategory', 'MyAction', 'MyLabel');
    },
    '#boxY'
  );
});
```

#### delegate(event, selector, callback)

The `delegate` method is used to execute a callback when executing some event on a specific HTML element. Unlike `on`, it defaults to binding the event to the `document.body` and not to the selector passed in the `selector` argument, waiting for any event that occurs on an element that matches the `selector` argument. .

This method is preferable against the `on` method in cases where the element does not already exist on the page or when it may exist and cease to exist depending on the user's navigation, such as options from a drop-down menu or an infinite scrolling list.

#### Arguments

- `event`: String of the event that will execute the callback, examples: 'mousedown', 'click', etc.
  [Learn more](https://mdn.mozilla.org/en-US/docs/Web/Events).

- `selector`: CSS Selector String to which the elements that trigger the `body` event should be compared.
  [Learn More](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

- `callback`: Function executed on triggering the event supplied in the `event` parameter.

##### Code example

```javascript
easyCollect.safeFn('Tag Name', function(collect) {
  collect.delegate('mousedown', '#buttonX', function(collect) {
    collect.event('MyCategory', 'MyAction', 'MyLabel');
  });
});

// Equivalente a
easyCollect.safeFn('Tag Name', function(collect) {
  collect.on(
    'mousedown',
    '#buttonX',
    function(collect) {
      collect.event('MyCategory', 'MyAction', 'MyLabel');
    },
    document.body
  );
});
```

#### wrap(elm)

The `wrap` function provides several facilitating functions for interactions with the DOM in order to standardize and make data collection compatible in environments without the concept of [data layer](https://blog.dp6.com.br/o-que-%C3%A9-a-camada-de-dados-ou-data-layer-80f37fa3429c). The motivation for the elaboration of this function is the non-dependence of market libraries, such as jQuery, in order not to depend on their installation in tagged environments. When executing the function, an object with the facilitating functions will be returned.

##### Arguments

- `elm` String, HTML element or Array of HTML elements.
   - String: the text is used as a CSS selector, creating an encapsulation with all the elements that cross the selector.
   - HTML Element, NodeList or array of HTML Elements: the supplied elements will be used as a base for the encapsulation.

##### Return

- **Object**: Encapsulation with facilitating functions.

##### Code example

```javascript
// Apenas um elemento
easyCollect.safeFn('Tag Name', function(collect) {
  collect.on('mousedown', '#buttonX', function() {
    var text = collect.wrap(this).text({ sanitize: true });
    collect.event('Category', 'Action', 'Label_' + text);
  });
});

// Múltiplos elementos
easyCollect.safeFn('Tag Name', function(collect) {
  var urls = collect.wrap('a');
  console.log(urls.nodes); // Array of nodes a.
});
```

### Object Wrap

Object generated by the wrap function, includes several functions that help in DOM manipulation. The facilitating functions contained in this object aim to reduce JavaScript code verbosity and avoid the use of libraries dependent on tagged environments.

#### Nodes Attribute

Array of HTML elements or [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) that will be the basis of the functions.

#### hasClass(className, opts)

Function that checks if the HTML element has the class passed by parameter.

##### Arguments

- `className`: String of the name of the class to be matched with the element.

- `opts` (optional): Object with variables for setting the hasClass function. \* `toArray`: If the value is true, returns the array of results related to the comparison.

##### Return

- **Boolean** or **Array of Boolean**: If the `opts` parameter is informed with the `toArray` attribute receiving the value true, the function will return the array or boolean of found elements. If only the `className` parameter is informed, the function returns true or false whether or not it finds an element with the specified class.

##### Code example

```javascript
easyCollect.safeFn('Tag Name', function(collect) {
  collect.on('mousedown', '.button', function() {
    if (collect.wrap(this).hasClass('myClass')) {
      collect.event('MyCategory', 'MyAction', 'MyLabel');
    }
  });
});
```

#### log(type, message, object)

A wrapper around the Native Console. Created to ensure it runs only during Debug Mode and only if console[type] exists.

##### Arguments

- `type` Type of console to be realized. Can be any type supported by the console: `log`, `warn`, `error`, `table`, `group`...

- `message` Text to be sent to the console.

- `object` (optional): Any object with more details than should be sent to the chosen method.

##### Return

- **undefined**: No return is sent or should be expected after executing this function.

##### Code example

```javascript
easyCollect.safeFn('Tag Name', function(collect) {
  collect.on('mousedown', '.button', function() {
    if (collect.wrap(this).hasClass('myClass')) {
      collect.event('MyCategory', 'MyAction', 'MyLabel');
    } else {
      collect.log('log', 'Class "myClass" not found');
    }
  });
});
```

#### matches(selector, reduce)

Function that checks if the HTML element matches the selector.

##### Arguments

- `selector`String of the selector to be matched with the element.

- `opts` (optional): Object with variables for setting the matches function. \* `toArray`: If the value is true, returns the array of results related to the comparison.

##### Return

- **Boolean** or **Array of Boolean**: If the `opts` parameter is informed with the `toArray` attribute receiving the value true, the function will return the array or boolean of found elements. If only the `selector` parameter is informed, the function returns true or false whether or not it finds an element with the specified class.

##### Code example

```javascript
easyCollect.safeFn('Tag Name', function(collect) {
  collect.on('mousedown', '.button', function() {
    if (collect.wrap(this).matches('.myForm .button')) {
      collect.event('MyCategory', 'MyAction', 'MyLabel');
    }
  });
});
```

#### closest(selector)

For each element in the set, get the first element that matches the selector by testing the element itself and traversing its ancestors in the [DOM] tree(https://developer.mozilla.org/en-US/docs/Web/API /Document_Object_Model).

##### Arguments

- `selector`: CSS selector string that will match the HTML element.

##### Return

- **Wrap**: An encapsulation with the elements that match the selected selector.

##### Code example

```javascript
easyCollect.safeFn('Tag Name', function(collect) {
  collect.on('mousedown', '.button', function() {
    var text = collect
      .wrap(this)
      .closest('div.parentDivWithText')
      .text({ sanitize: true, onlyFirst: true });
    collect.event('MyCategory', 'MyAction', 'MyLabel' + text);
  });
});
```

#### text(opt)

Function that returns the text of the element.

##### Arguments

- `opt`: Object with variables to configure the text function.
   - `sanitize`: If boolean `true`, will use sanitize with default options. If it is an object, it will pass the chosen options to the internal sanitize.
   - `onlyFirst`: Boolean that in case of true returns only the direct text of the element and not of all its children.
   - `onlyText`: Boolean that in case of true returns the concatenated text instead of an array of Strings.

##### Return

##### Code example

```javascript
easyCollect.safeFn('Tag Name', function(collect) {
  var text = collect
    .wrap('#myId')
    .text({ sanitize: true, onlyFirst: true, onlyText: true });

  var text2 = collect
    .wrap('#myOtherId')
    .text({ sanitize: { spacer: '/', capitalized: false } });
  collect.pageview('/' + text + '/' + text2);
});
```

#### find(sel)

Function that returns a Wrap object of all elements that match the selector.

##### Arguments

- `sel`: String of the CSS selector that will match the HTML element.

##### Return

##### Code example

```javascript
easyCollect.safeFn('Tag Name', function(collect) {
  var text = collect
    .wrap('#myId')
    .find('.myClass')
    .text({ sanitize: true });
  collect.pageview('/' + text);
});
```

#### map(func, params)

Function that executes code for each element. It has the same behavior as the [Map API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

##### Arguments

- `func`: Function to be executed, it can receive a parameter that will be the reference of the iterated element.

- `params`: Array of Parameters used in the function.

#### Code example

```javascript
easyCollect.safeFn('Tag Name', function(collect) {
  var sources = collect.wrap('img').map(function(elm) {
    return elm.src;
  });
  console.log(sources); // Array with the src attribute values of each img element
});
```

#### Package size

| Compression | Size (KB) |
| -------------------- | ------------ |
| No compression | 14.71 |
| Minified by GTM | 7.14 |
| With GZip | 2.72 |

#### Credits

**DP6 Koopas !!!**
