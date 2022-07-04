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

### Idiomas disponíveis

- [Read this page in English](https://github.com/DP6/easy-collect/blob/master/documentations/docs/en/gtm-reference.md)
- [Leia esta página em Português](https://github.com/DP6/easy-collect/blob/master/documentations/docs/pt/gtm-reference.md)

---

# Sumário

- [Sumário](#sumário)
- [Referência técnica](#referência-técnica)
  - [Objeto options](#objeto-options)
    - [init(opt_options)](#initopt_options)
  - [API](#api)
    - [Coleta Google Analytics (GA)](#coleta-google-analytics-ga)
      - [pageview(path, object)](#pageviewpath-object)
        - [Parâmetros](#parâmetros)
        - [Exemplo de código](#exemplo-de-código)
      - [event(category, action, label, object)](#eventcategory-action-label-object)
      - [event(category, action, label, value, object)](#eventcategory-action-label-value-object)
        - [Parâmetros](#parâmetros-1)
        - [Exemplo de código](#exemplo-de-código-1)
    - [Utilidades](#utilidades)
      - [getDataLayer(key)](#getdatalayerkey)
        - [Argumentos](#argumentos)
        - [Retorno:](#retorno)
        - [Exemplo de código](#exemplo-de-código-2)
      - [getKey(key, opt_root)](#getkeykey-opt_root)
        - [Argumentos](#argumentos-1)
        - [Retorno](#retorno-1)
        - [Exemplo de código](#exemplo-de-código-3)
      - [sanitize(text, opts)](#sanitizetext-opts)
        - [Argumentos](#argumentos-2)
        - [Retorno](#retorno-2)
        - [Exemplo de código](#exemplo-de-código-4)
      - [cookie(name, value, opts)](#cookiename-value-opts)
        - [Argumentos](#argumentos-3)
        - [Retorno](#retorno-3)
        - [Exemplo de criação de cookie](#exemplo-de-criação-de-cookie)
        - [Exemplo de recuperar valor de um cookie](#exemplo-de-recuperar-valor-de-um-cookie)
    - [SafeFn](#safefn)
      - [Argumentos da função](#argumentos-da-função)
      - [Retorno](#retorno-4)
        - [Exemplo de código](#exemplo-de-código-5)
      - [Lançamento de Exceptions](#lançamento-de-exceptions)
    - [Easy Collect Interno](#easy-collect-interno)
      - [on(event, selector, callback, parent)](#onevent-selector-callback-parent)
      - [Argumentos](#argumentos-4)
        - [Exemplo de código](#exemplo-de-código-6)
      - [delegate(event, selector, callback)](#delegateevent-selector-callback)
      - [Argumentos](#argumentos-5)
        - [Exemplo de código](#exemplo-de-código-7)
      - [wrap(elm)](#wrapelm)
        - [Argumentos](#argumentos-6)
        - [Retorno](#retorno-5)
        - [Exemplos de código](#exemplos-de-código)
    - [Objeto Wrap](#objeto-wrap)
      - [Atributo nodes](#atributo-nodes)
      - [hasClass(className, opts)](#hasclassclassname-opts)
        - [Argumentos](#argumentos-7)
        - [Retorno](#retorno-6)
        - [Exemplo de código](#exemplo-de-código-8)
      - [log(type, message, object)](#logtype-message-object)
        - [Argumentos](#argumentos-8)
        - [Retorno](#retorno-7)
        - [Exemplo de código](#exemplo-de-código-9)
      - [matches(selector, reduce)](#matchesselector-reduce)
        - [Argumentos](#argumentos-9)
        - [Retorno](#retorno-8)
        - [Exemplo de código](#exemplo-de-código-10)
      - [closest(selector)](#closestselector)
        - [Argumentos](#argumentos-10)
        - [Retorno](#retorno-9)
        - [Exemplo de código](#exemplo-de-código-11)
      - [text(opt)](#textopt)
        - [Argumentos](#argumentos-11)
        - [Retorno](#retorno-10)
        - [Exemplo de código](#exemplo-de-código-12)
      - [find(sel)](#findsel)
        - [Argumentos](#argumentos-12)
        - [Retorno](#retorno-11)
        - [Exemplo de código](#exemplo-de-código-13)
      - [map(func, params)](#mapfunc-params)
        - [Argumentos](#argumentos-13)
      - [Exemplo de código](#exemplo-de-código-14)
      - [Tamanho do Pacote](#tamanho-do-pacote)
      - [Créditos](#créditos)

# Referência técnica

> Easy Collect para o Google Tag Manager

Este documento introduz as APIs e funcionalidades desenvolvidas para o suporte ao Google Tag Manager (GTM). São importantes algumas configurações do lado da própria ferramenta para que o código implementado na tag do Easy Collect tenha o comportamento esperado. Mais detalhes sobre [aqui](https://github.com/DP6/easy-collect/blob/master/README-pt.md).

## Objeto options

O objeto `options` contém as configurações globais do _Analytics Helper_. Os valores padrões servem na maioria dos casos, por isso devem ser alterados com cautela e de forma consciente.

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

Utilize esta função, de caráter opcional, para inicializar o Easy Collect com opções diferentes das padrões. Recebe como argumento o objeto `opt_options`, que possui as seguintes chaves:

- `helperName` -- Por padrão `"easyCollect"`.
  Uma string que indentifica o nome da instância do _Analytics Helper_ no objeto _window_ do navegator. O tagueamento não é afetado pela mudança desse valor, se feito pela função `safeFn` (recomendado).

- `dataLayerName` -- Por padrão `"dataLayer"`.
  Uma string que identifica o nome da instância da _camada de dados_ no objeto _window_ do navegador. Deve ser o mesmo valor configurado no _snippet_ do GTM para que as funções de interface do _Analytics Helper_ (ex: `getDataLayer`) funcionem.

- `debug` -- Por padrão é a variavél `{{Debug Mode}}` do GTM. Se desabilitada, é `false`.
  Um booleano que sinaliza para o _Analytics Helper_ se o contexto atual é de depuração ou produção. Caso verdadeiro, os eventos serão disparados apenas via `console.log`, sem envios para o GA.

- `waitQueue` -- Por padrão é `true`
  Um booleano que sinaliza para o _Analytics Helper_ se ele deve utilizar uma fila de espera nos eventos. Caso verdadeiro, todos eventos serão empilhados numa estrutura interna até que ocorra o primeiro pageview na página. Recomendamos que essa opção esteja sempre ativada, pois evita inconsistências nos relatórios do Google Analytics.

- `containerId` -- Por padrão é a variável `{{Container ID}}` do GTM. Se desabilitada, é a string vazia `''`.
  Uma string que deve ser equivalente ao ID do contêiner do GTM onde o _Analytics Helper_ foi configurado (GTM-XXXXX).

- `exceptionEvent` -- Por padrão `"gtm_dataQuality_event"`.
  Uma string que identifica o evento enviado à camada de dados caso ocorra alguma exceção no código do GTM. Esta opção suporta a ideia da coleta para uma propriedade do Google Analytics de [_Quality Assurence_](https://www.observepoint.com/blog/why-automate-your-web-analytics-qa/) . Para entender melhor o uso desta configuração, [consultar documentação de configuração do GTM](https://github.com/DP6/easy-collect/blob/master/documentations/docs/pt/gtm-config-gau.md).

- `exceptionCategory` -- Por padrão `"GTM Exception"`.
  Uma string que indica qual o valor que deve ser preenchido na chave `"event_category"` do evento enviado à camada de dados caso ocorra alguma exceção no código do GTM. Esta opção suporta a ideia da coleta para uma propriedade do Google Analytics de [_Quality Assurence_](https://www.observepoint.com/blog/why-automate-your-web-analytics-qa/) . Para entender melhor o uso desta configuração, [consultar documentação de configuração do GTM](https://github.com/DP6/easy-collect/blob/master/documentations/docs/pt/gtm-config-gau.md)

- `customNamePageview` -- Por padrão `"ga_pageview"`.
  Uma string que identifica o evento enviado à camada de dados toda vez que a função `pageview` (ver abaixo) for chamada.

- `customNameEvent` -- Por padrão `"ga_event"`.
  Uma string que identifica o evento enviado à camada de dados toda vez que a função `event` (ver abaixo) for chamada.

- `customNameTiming` -- Por padrão `"ga_timing"`.
  Uma string que identifica o evento de timing enviado à camada de dados toda vez que a função `timing` (ver abaixo) for chamada.

- `errorSampleRate` -- Por padrão `1` .
  Deve ser um inteiro entre 0 e 1, que controla o nível de amostragem dos erros enviados ao GA de _Data Quality_ **(mais detalhes à adicionar)**. Serve para controlar a coleta em ambientes onde o volume de disparos é muito grande.

## API

### Coleta Google Analytics (GA)

As funções a seguir possuem especificidades para coleta de dados baseado nas ferramentas GA e GTM. Devido a isso, as funções internas desta API utilizam a variável criada pelo GTM chamada [`dataLayer`](https://developers.google.com/tag-manager/devguide). Para garantir que as funcionalidades das funções estejam corretas, será necessário garantir que o ambiente em questão possua a camada de dados inicializada corretamente.

#### pageview(path, object)

Utilizada para o disparo de pageview personalizado.

##### Parâmetros

- `path` (opcional): String que recebe o path do Pageview personalizado.
- `object` (opcional): Objeto que será atribuído ao pageview. Pode ser utilizado para passar objetos de Enhanced Ecommerce, além de métricas e dimensões personalizadas. Qualquer chave personalizada será inserida como push no dataLayer.

##### Exemplo de código

```javascript
easyCollect.pageview('/post/finalizou-leitura', {
  area: 'Aberta',
  categoria: 'Data Science'
});
```

#### event(category, action, label, object)

#### event(category, action, label, value, object)

Utilizada para efetuar disparos de eventos.

##### Parâmetros

- `category`: String que representa a categoria do evento.
- `action`: String que representa a ação do evento.
- `label` (opcional): String que pode representar o label do evento.
- `object` (opcional): Objeto que será atribuído ao evento. Pode ser utilizado para passar objetos de Enhanced Ecommerce, além de métricas e dimensões personalizadas. Qualquer chave personalizada será inserida como push no dataLayer.

_Importante_: A chave value pode ser passada tanto como o quarto valor da chamada quanto como um parâmetro do objeto `"object"`.

##### Exemplo de código

```javascript
easyCollect.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo', 0, {
  cidade: 'São Paulo'
});
```

```javascript
easyCollect.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo', {
  eventValue: 0,
  cidade: 'São Paulo'
});
```

### Utilidades

#### getDataLayer(key)

Retorna qualquer objeto contido no dataLayer exposto no ambiente. Esta função é um encapsulamento da [macro .get() do GTM](https://developers.google.com/tag-manager/api/v1/reference/accounts/containers/macros).

##### Argumentos

- `key`: String que representa a chave do objeto a ser recuperado.

##### Retorno:

- **ANY**: O valor recuperado do modelo de dados do GTM.

##### Exemplo de código

```javascript
dataLayer.push({
  meuObjeto: 'valor',
  meuOutroObjeto: 'outroValor'
});

easyCollect.getDataLayer('meuObjeto'); // valor
```

#### getKey(key, opt_root)

Encontra um objeto ou valor pela chave informada. Caso alguma das chaves em cadeia não existir, a função retorna undefined, evitando assim o lançamento de erros.

##### Argumentos

- `key`: String que representa a chave do objeto a ser encontrado
- `opt_root` (Opcional): Objeto que possui a chave a ser encontrada. Por padrão é `window`.

##### Retorno

- **ANY**: O valor recuperado do modelo de dados da variável informada.

##### Exemplo de código

```javascript
var objeto = {
  meuObjeto: {
    meuArray: [
      {
        minhaChave: 'encontrei meu valor'
      }
    ]
  }
};

easyCollect.getKey('objeto.meuObjeto.meuArray.0.minhaChave'); // encontrei meu valor
easyCollect.getKey('meuObjeto.meuArray.0.minhaChave', objeto); // encontrei meu valor
easyCollect.getKey('chaveNaoExistente.meuArray.0.minhaChave', objeto); // undefined
```

#### sanitize(text, opts)

Retorna um texto sem caracteres especiais, acentuação, espaços ou letras maiúsculas (opcionalmente).

##### Argumentos

- `text`: String a ser tratada
- `opts` (opcional): Objeto com variáveis para configuração da função sanitize.
  _ `capitalized`: Define a forma com que a String será tratada. - true: Coloca a String como Camel Case; - false: Coloca a String como Snake Case.
  _ `spacer`: Define qual texto será utilizado como separador no lugar de `_`.

##### Retorno

- **String**: O valor recebido por parâmetro e modificado pela função.

##### Exemplo de código

```javascript
easyCollect.sanitize('Minha String Suja'); // minha_string_suja
easyCollect.sanitize('Minha String Suja', { capitalized: true }); // MinhaStringSuja
easyCollect.sanitize('Minha String Suja', { spacer: '-' }); // minha-string-suja
easyCollect.sanitize('Minha String Suja', {
  capitalized: true,
  spacer: '-'
}); // Minha-String-Suja
```

#### cookie(name, value, opts)

Cria um cookie ou retorna seu valor baseado nos parâmetros recebidos na função.

##### Argumentos

- `name`: String que representa o nome do cookie;
- `value`: String que representa o valor do cookie;
- `opts` (opcional): Objeto com variáveis para configuração da função cookie:
  - `exdays` (opcional): Numeric que representa a quantidade de dias para a expiração do cookie;
  - `domain`: (opcional): String que representa o domínio ao qual o cookie deve ser atribuído;
  - `path` (opcional): String que representa o path do site ao qual o cookie deve ser atribuído;

##### Retorno

- **String**: Valor completo do cookie criado ou recuperado.

##### Exemplo de criação de cookie

```javascript
easyCollect.cookie('meuCookie', 'meuValor', {
  exdays: 3, // Dias para expiração
  domain: '.meudominio.com.br', // Domínio que o cookie atribuído
  path: '/meu-path' // Path do cookie
}); // meuCookie=meuValor; expires=Sun, 16 Oct 2016 19:18:17 GMT; domain=.meudominio.com.br; path=/meu-path
```

##### Exemplo de recuperar valor de um cookie

```javascript
easyCollect.cookie('meuCookie'); // meuValor
```

### SafeFn

Função segura do Easy Collect. O principal conceito por trás da sua utilização é a garantia da não interferência da coleta de dados no comportamento natural do portal de sua utilização, evitando vazamento de logs e erros ao ambiente em questão.

Para efetivar essa proposta, a função recebe um callback de parâmetro. Dentro do escopo deste callback, é possível receber um objeto de parâmetro com funções estendidas do Easy Collect, com o intuito de garantir o encapsulamento de funções sensíveis. Este objeto será representado daqui em diante como "Easy Collect Interno" (mais detalhes na próxima seção).

#### Argumentos da função

- `id`: Deve receber o nome da tag (do GTM) em que o código em questão estiver contido.
- `callback`: Função de callback que cria o escopo para o ambiente seguro do safeFn. Passa via parâmetro o Easy Collect Interno para utilização.
- `immediate` (Opcional): Variável booleana, que por default (**true**) executa a função de callback imediatamente. Caso **false**, o retorno da função será a própria função segura, que deverá ser executada manualmente quando necessário.

#### Retorno

- **Function** ou **undefined**: Caso o parâmetro `immediate` receba o valor true, o safeFn executa o callback e retorna undefined. Porém se o parâmetro `immediate` ter o valor false, o retorno é a própria função de callback para ser executada posteriormente.

##### Exemplo de código

```javascript
easyCollect.safeFn('Nome da Tag do GTM', function(collect) {
  collect.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo', 'MeuValor', {
    dimension1: 'São Paulo'
  });
});

var fn = easyCollect.safefn(
  'Nome da Tag do GTM',
  function(collect) {
    console.log(new Date());
  },
  { immediate: false }
);

setTimeout(fn, 2000);
```

#### Lançamento de Exceptions

A função `safeFn` tem um tratamento específico para as Exceptions que ocorrerem dentro do seu escopo seguro. Utilizando as variáveis de personalização do Easy Collect options.debug, options.exceptionEvent, options.exceptionCategory e options.errorSampleRate, a função atribui valores ao dataLayer do GTM, que utilizará a configuração do GTM para o envio de eventos ao Google Analytics. Esta prática é baseada na concepção de [Quality Assurance](https://www.observepoint.com/blog/why-automate-your-web-analytics-qa/).

### Easy Collect Interno

Objeto com funções internas passados via parâmetro no callback da função `safeFn`.

#### on(event, selector, callback, parent)

O método `on` serve para executar um callback ao executar algum evento em um elemento HTML específico. Em caso de não haver jQuery na página, ele se baseia na função querySelectorAll do javascript, e por conta disso, é preciso ficar atento a compatibilidade dos navegadores. Não é recomendado a utilização desta função em páginas que oferecem suporte a IE 7 ou inferior.

A presença do quarto argumento, `parent`, transforma a funcionalidade do método `on` na do método [`delegate`](#delegateevent-selector-callback).

#### Argumentos

- `event`: String do evento que ira executar o callback, exemplos: 'mousedown', 'click', etc.
  [Saiba mais](https://mdn.mozilla.org/en-US/docs/Web/Events).

- `selector`: String do Seletor CSS que irá buscar os elementos que executarão o callback no disparo do evento.
  [Saiba mais](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

- `callback`: Função executada no disparo do evento suprido no parâmetro `event`.

- `parent` (opcional): Elemento raíz a partir de onde o evento deverá ser ouvido.

##### Exemplo de código

```javascript
easyCollect.safeFn('Nome da Tag', function(collect) {
  collect.on('mousedown', '#botaoX', function(collect) {
    collect.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo');
  });
});

easyCollect.safeFn('Nome da Tag', function(collect) {
  collect.on(
    'mousedown',
    '#botaoX',
    function(collect) {
      collect.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo');
    },
    '#caixaY'
  );
});
```

#### delegate(event, selector, callback)

O método `delegate` serve para executar um callback ao executar algum evento em um elemento HTML específico. Diferentemente do `on`, ele assume como padrão que o evento deverá ser atrelado ao `document.body` e não ao seletor passado no argumento `selector`, esperando por qualquer evento que ocorra em um elemento que case com o argumento `selector`.

Este método é preferível contra o método `on` nos casos em que o elemento ainda não exista na página ou quando ele pode existir e deixar de existir dependendo da navegação do usuário, como opções de um menu suspenso ou uma lista de scroll infinito.

#### Argumentos

- `event`: String do evento que ira executar o callback, exemplos: 'mousedown', 'click', etc.
  [Saiba mais](https://mdn.mozilla.org/en-US/docs/Web/Events).

- `selector`: String do Seletor CSS ao qual os elementos que acionarem o evento do `body` deverão ser comparados.
  [Saiba mais](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

- `callback`: Função executada no disparo do evento suprido no parâmetro `event`.

##### Exemplo de código

```javascript
easyCollect.safeFn('Nome da Tag', function(collect) {
  collect.delegate('mousedown', '#botaoX', function(collect) {
    collect.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo');
  });
});

// Equivalente a
easyCollect.safeFn('Nome da Tag', function(collect) {
  collect.on(
    'mousedown',
    '#botaoX',
    function(collect) {
      collect.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo');
    },
    document.body
  );
});
```

#### wrap(elm)

A função `wrap` provê diversas funções facilitadoras para interações com o DOM no intuito de padronizar e compatibilizar a coleta de dados em ambientes sem o conceito de [camada de dados](https://blog.dp6.com.br/o-que-%C3%A9-a-camada-de-dados-ou-data-layer-80f37fa3429c). A motivação para a elaboração desta função é a não dependências de bibliotecas de mercado, como o jQuery, com o intuito de não depender da instalação das mesmas nos ambientes tagueados. Ao executar a função, um objeto com as funções facilitadoras será retornado.

##### Argumentos

- `elm` String, elemento HTML ou Array de elementos HTML.
  - String: o texto é utilizado como seletor CSS, criando um encapsulamento com todos os elementos que cruzarem com o seletor.
  - Elemento HTML, NodeList ou array de Elementos HMTL: serão utilizados os elementos supridos como base para o encapsulamento.

##### Retorno

- **Object**: Encapsulamento com funções facilitadoras.

##### Exemplos de código

```javascript
// Apenas um elemento
easyCollect.safeFn('Nome da Tag', function(collect) {
  collect.on('mousedown', '#botaoX', function() {
    var text = collect.wrap(this).text({ sanitize: true });
    collect.event('Categoria', 'Ação', 'Label_' + text);
  });
});

// Múltiplos elementos
easyCollect.safeFn('Nome da Tag', function(collect) {
  var urls = collect.wrap('a');
  console.log(urls.nodes); // Array de nodes a.
});
```

### Objeto Wrap

Objeto gerado pela função wrap, inclui diversas funções que ajudam na manipulação do DOM. As funções facilitadoras contidas neste objeto tem como objetivo diminuir a verbosidade do código JavaScript e evitar o uso de bibliotecas dependentes dos ambientes tagueados.

#### Atributo nodes

Array de elementos HTML ou [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) que será a base das funções.

#### hasClass(className, opts)

Função que verifica se o elemento HTML tem a classe passada por parâmetro.

##### Argumentos

- `className`: String do nome da classe a ser batida com o elemento.

- `opts` (opcional): Objeto com variáveis para configuração da função hasClass. \* `toArray`: Caso o valor seja true, retorna o array de resultados relacionados à comparação.

##### Retorno

- **Boolean** ou **Array de Boolean**: Caso o parâmetro `opts`seja informado com o atributo `toArray`recebendo o valor true, o retorno da função será o array o boolean de elementos encontrados. Caso somente o parâmetro `className` seja informado, a função retorno true ou false se encontrar ou não algum elemento com a classe especificada.

##### Exemplo de código

```javascript
easyCollect.safeFn('Nome da Tag', function(collect) {
  collect.on('mousedown', '.button', function() {
    if (collect.wrap(this).hasClass('myClass')) {
      collect.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo');
    }
  });
});
```

#### log(type, message, object)

Um wrapper ao redor do Console nativo. Criado para garantir que execute apenas durante Debug Mode e apenas se console[type] existir.

##### Argumentos

- `type` Tipo de console a ser realizado. Pode ser qualquer tipo suportado pelo console: `log`, `warn`, `error`, `table`, `group`...

- `message` Texto a ser enviado para o console.

- `object` (opcional): Qualquer objeto com mais detalhes do que deve ser enviado para o método escolhido.

##### Retorno

- **undefined**: Nenhum retorno é enviado ou deverá ser esperado após a execução desta função.

##### Exemplo de código

```javascript
easyCollect.safeFn('Nome da Tag', function(collect) {
  collect.on('mousedown', '.button', function() {
    if (collect.wrap(this).hasClass('myClass')) {
      collect.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo');
    } else {
      collect.log('log', 'Classe "myClass" não encontrada');
    }
  });
});
```

#### matches(selector, reduce)

Função que verifica se o elemento HTML confere com o seletor.

##### Argumentos

- `selector`String do seletor a ser batido com o elemento.

- `opts` (opcional): Objeto com variáveis para configuração da função matches. \* `toArray`: Caso o valor seja true, retorna o array de resultados relacionados à comparação.

##### Retorno

- **Boolean** ou **Array de Boolean**: Caso o parâmetro `opts`seja informado com o atributo `toArray`recebendo o valor true, o retorno da função será o array o boolean de elementos encontrados. Caso somente o parâmetro `selector` seja informado, a função retorno true ou false se encontrar ou não algum elemento com a classe especificada.

##### Exemplo de código

```javascript
easyCollect.safeFn('Nome da Tag', function(collect) {
  collect.on('mousedown', '.button', function() {
    if (collect.wrap(this).matches('.myForm .button')) {
      collect.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo');
    }
  });
});
```

#### closest(selector)

Para cada elemento no conjunto, obtenha o primeiro elemento que corresponde ao seletor, testando o próprio elemento e atravessando seus antepassados ​​na árvore [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).

##### Argumentos

- `selector`: String do seletor CSS que baterá com o elemento HTML.

##### Retorno

- **Wrap**: Um encapsulamento com os elementos que bateram com o seletor informado.

##### Exemplo de código

```javascript
easyCollect.safeFn('Nome da Tag', function(collect) {
  collect.on('mousedown', '.button', function() {
    var text = collect
      .wrap(this)
      .closest('div.parentDivWithText')
      .text({ sanitize: true, onlyFirst: true });
    collect.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo' + text);
  });
});
```

#### text(opt)

Função que retorna o texto do elemento.

##### Argumentos

- `opt`: Objeto com variáveis para configuração da função text.
  - `sanitize`: Caso booleano `true`, utilizará o sanitize com as opções padrão. Caso seja um objeto, repassará as opções escolhidas ao sanitize interno.
  - `onlyFirst`: Boolean que em caso de true retorna somente o texto direto do elemento e não de todos os seus filhos.
  - `onlyText`: Boolean que em caso de true retorna o texto concatenado ao invés de um array de Strings.

##### Retorno

##### Exemplo de código

```javascript
easyCollect.safeFn('Nome da Tag', function(collect) {
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

Função que retorna um objeto Wrap de todos os elementos que batem com o seletor.

##### Argumentos

- `sel`: String do seletor CSS que baterá com o elemento HTML.

##### Retorno

##### Exemplo de código

```javascript
easyCollect.safeFn('Nome da Tag', function(collect) {
  var text = collect
    .wrap('#myId')
    .find('.myClass')
    .text({ sanitize: true });
  collect.pageview('/' + text);
});
```

#### map(func, params)

Função que executa um código para cada elemento. Possui o mesmo comportamento da API [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

##### Argumentos

- `func`: Função a ser executada, pode receber um parâmetro que será a referência do elemento iterado.

- `params`: Array de parâmetros utilizados na função.

#### Exemplo de código

```javascript
easyCollect.safeFn('Nome da Tag', function(collect) {
  var sources = collect.wrap('img').map(function(elm) {
    return elm.src;
  });
  console.log(sources); // Array com os valores do atributo src de cada elemento img.
});
```

#### Tamanho do Pacote

| Compactação         | Tamanho (KB) |
| ------------------- | ------------ |
| Sem compactação     | 14.71        |
| Minificado pelo GTM | 7.14         |
| Com GZip            | 2.72         |

#### Créditos

**DP6 Koopas !!!**
