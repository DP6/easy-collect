/*

  TESTE 1: utilize os exemplos abaixo para enviar o objeto de ecommerce

*/

//IMPRESSIONS COMPLETO [OK]
var ecommerce = {
  'currencyCode': 'EUR',
  'list': 'Search Results',
  'impressions': [
    {
      'name': 'Triblend Android T-Shirt',
      'id': '12345',
      'price': '15.25',
      'brand': 'Google',
      'category': 'Apparel',
      'variant': 'Gray',
      'list': 'Search Results',
      'position': 1
    },
    {
      'name': 'Donut Friday Scented T-Shirt',
      'id': '67890',
      'price': '33.75',
      'brand': 'Google',
      'category': 'Apparel',
      'variant': 'Black',
      'list': 'Search Results',
      'position': 2
    }
  ]
}
//mapGa4Ecommerce(ecommerce)
ga4Event('view_item_list', {'ecommerce': ecommerce})

//IMPRESSIONS (ALGUNS PARAMETROS COM UNDEFINED) [OK]
var ecommerce = {
    'currencyCode': 'EUR',
    'list': undefined,
    'impressions': [
      {
        'name': 'Triblend Android T-Shirt',
        'id': '12345',
        'price': '15.25',
        'brand': 'Google',
        'category': 'Apparel',
        'variant': 'Gray',
        'list': 'Search Results',
        'position': 1
      },
      {
        'name': 'Donut Friday Scented T-Shirt',
        'id': '67890',
        'price': '33.75',
        'brand': undefined,
        'category': 'Apparel',
        'list': undefined,
        'position': 2
      }
    ]
}
mapGa4Ecommerce(ecommerce)

//CLICK [OK]
var ecommerce = {
  'click': {
    'actionField': {'list': 'Search Results'},
    'products': [
      {
        'name': 'Donut Friday Scented T-Shirt',
        'id': '67890',
        'price': '33.75',
        'brand': 'Google',
        'category': 'Apparel',
        'variant': 'Black',
        'list': 'Search Results',
        'position': 2
      }
    ]
  }
}
mapGa4Ecommerce(ecommerce)

//CLICK (SEM ACTION FIELD) [OK]
var ecommerce = {
    'click': {
      'products': [
        {
          'name': 'Donut Friday Scented T-Shirt',
          'id': '67890',
          'price': '33.75',
          'brand': 'Google',
          'category': 'Apparel',
          'variant': 'Black',
          'list': 'Search Results',
          'position': 2
        }
      ]
    }
}
mapGa4Ecommerce(ecommerce)

//CLICK (ALGUNS PARAMETROS UNDEFINED) [OK]
var ecommerce = {
  'click': {
    'actionField': {'list': 'Search Results'},
    'products': [
      {
        'name': 'Donut Friday Scented T-Shirt',
        'id': '67890',
        'price': '33.75',
        'brand': 'Google',
        'category': undefined,
        'variant': 'Black',
        'position': 2
      }
    ]
  }
}
mapGa4Ecommerce(ecommerce)

//PRODUCT DETAILS [OK]
var ecommerce = {
  'detail': {
    'actionField': {'list': 'Apparel Gallery'},
    'products': [{
      'name': 'Triblend Android T-Shirt',
      'id': '12345',
      'price': '15.25',
      'brand': 'Google',
      'category': 'Apparel',
      'variant': 'Gray'
      }
    ]
  }
}
mapGa4Ecommerce(ecommerce)

//PRODUCT DETAILS (LIST UNDEFINED) [OK]
var ecommerce = {
  'detail': {
    'actionField': {'list': undefined},
    'products': [{
      'name': 'Triblend Android T-Shirt',
      'id': '12345',
      'price': '15.25',
      'brand': 'Google',
      'category': 'Apparel',
      'variant': 'Gray'
      }
    ]
  }
}
mapGa4Ecommerce(ecommerce)

//PRODUCT DETAILS (SEM ACTION FIELD E PARAMETROS UNDEFINED, VARIAS CATEGORY) [OK]
var ecommerce = {
  'detail': {
    'products': [{
      'name': 'Triblend Android T-Shirt',
      'id': '12345',
      'price': '15.25',
      'brand': undefined,
      'category': 'Apparel/Apparel2/Apparel3',
      'variant': 'Gray'
      }
    ]
  }
}
mapGa4Ecommerce(ecommerce)

//ADD TO CART [OK]
var ecommerce = {
  'currencyCode': 'EUR',
  'add': {
    'actionField': {'list': 'Apparel Gallery'},
    'products': [{
      'name': 'Triblend Android T-Shirt',
      'id': '12345',
      'price': '15.25',
      'brand': 'Google',
      'category': 'Apparel',
      'variant': 'Gray',
      'quantity': 1
      }
    ]
  }
}
mapGa4Ecommerce(ecommerce)

//ADD TO CART (PARAMETROS AUSENTES + SEM ACTION FIELD) [OK]
var ecommerce = {
  'currencyCode': 'EUR',
  'add': {
    'products': [{
      'name': 'Triblend Android T-Shirt',
      'id': '12345',
      'price': '15.25',
      'brand': 'Google',
      'variant': 'Gray',
      'quantity': 1
      }
    ]
  }
}
mapGa4Ecommerce(ecommerce)

//REMOVE FROM CART [OK]
var ecommerce = {
  'remove': {
    'actionField': {'list': 'Apparel Gallery'},
    'products': [{
        'name': 'Triblend Android T-Shirt',
        'id': '12345',
        'price': '15.25',
        'brand': 'Google',
        'category': 'Apparel',
        'variant': 'Gray',
        'quantity': 1
      }
    ]
  }
}
mapGa4Ecommerce(ecommerce)

//REMOVE FROM CART (PARAMETROS AUSENTES + SEM ACTION FIELD) [OK]
var ecommerce = {
  'currencyCode': 'EUR',
  'remove': {
    'products': [{
      'name': 'Triblend Android T-Shirt',
      'id': '12345',
      'price': '15.25',
      'brand': 'Google',
      'quantity': 1
      }
    ]
  }
}
mapGa4Ecommerce(ecommerce)

//PROMOTIONS VIEW
var ecommerce = {
  'promoView': {
    'promotions': [
      {
        'id': 'JUNE_PROMO13',
        'name': 'June Sale',
        'creative': 'banner1',
        'position': 'slot1'
      },
      {
        'id': 'FREE_SHIP13',
        'name': 'Free Shipping Promo',
        'creative': 'skyscraper1',
        'position': 'slot2'
      }
    ]
  }
}
mapGa4Ecommerce(ecommerce)

//PROMOTIONS VIEW (parametros ausentes)
var ecommerce = {
  'promoView': {
    'promotions': [
      {
        'id': 'JUNE_PROMO13',
        'name': 'June Sale',
        'creative': 'banner1'
      },
      {
        'id': 'FREE_SHIP13',
        'name': 'Free Shipping Promo',
        'creative': undefined,
        'position': 'slot2'
      }
    ]
  }
}
mapGa4Ecommerce(ecommerce)

//PROMOTION CLICK
var ecommerce = {
  'promoClick': {
    'promotions': [
      {
        'id': 'JUNE_PROMO13',
        'name': 'June Sale',
        'creative': 'banner1',
        'position': 'slot1'
      }
    ]
  }
}
mapGa4Ecommerce(ecommerce)

//PROMOTION CLICK (parametros ausentes)
var ecommerce = {
  'promoClick': {
    'promotions': [
      {
        'id': 'JUNE_PROMO13',
        'name': 'June Sale',
        'position': undefined
      }
    ]
  }
}
mapGa4Ecommerce(ecommerce)

//CHECKOUT
var ecommerce = {
  'checkout': {
    'actionField': {'step': 1, 'option': 'Visa'},
    'products': [{
      'name': 'Triblend Android T-Shirt',
      'id': '12345',
      'price': '15.25',
      'brand': 'Google',
      'category': 'Apparel',
      'variant': 'Gray',
      'quantity': 1
    }]
  }
}
mapGa4Ecommerce(ecommerce)

//CHECKOUT (paametros ausentes + varias categorias)
var ecommerce = {
  'checkout': {
    'actionField': {'step': 1, 'option': 'Visa'},
    'products': [{
      'name': 'Triblend Android T-Shirt',
      'id': '12345',
      'price': '15.25',
      'category': 'Apparel/Apparel2/Apparel3/Apparel4',
      'variant': undefined,
      'quantity': 1
    }]
  }
}
mapGa4Ecommerce(ecommerce)

//PURCHASE
var ecommerce = {
  'purchase': {
    'actionField': {
      'id': 'T12345',
      'affiliation': 'Online Store',
      'revenue': '35.43',
      'tax':'4.90',
      'shipping': '5.99',
      'coupon': 'SUMMER_SALE'
    },
    'products': [{
      'name': 'Triblend Android T-Shirt',
      'id': '12345',
      'price': '15.25',
      'brand': 'Google',
      'category': 'Apparel',
      'variant': 'Gray',
      'quantity': 1,
      'coupon': 'SUMMER_SALE2'
    },
    {
      'name': 'Donut Friday Scented T-Shirt',
      'id': '67890',
      'price': '33.75',
      'brand': 'Google',
      'category': 'Apparel',
      'variant': 'Black',
      'quantity': 1
    }]
  }
}
mapGa4Ecommerce(ecommerce)

//PURCHASE (PARAMETROS AUSENTES + VARIAS CATEGORIAS)
var ecommerce = {
  'purchase': {
    'actionField': {
      'id': 'T12345',
      'affiliation': 'Online Store',
      'revenue': '35.43',
      'tax':'4.90',
      'shipping': '5.99'
    },
    'products': [{
      'name': 'Triblend Android T-Shirt',
      'id': '12345',
      'price': '15.25',
      'brand': 'Google',
      'category': 'Apparel/Apparel2/Apparel3/Apparel4',
      'variant': undefined,
      'quantity': 1,
      'coupon': 'SUMMER_SALE2'
    },
    {
      'name': 'Donut Friday Scented T-Shirt',
      'id': '67890',
      'price': '33.75',
      'category': 'Apparel',
      'variant': 'Black',
      'quantity': 1
    }]
  }
}
mapGa4Ecommerce(ecommerce)