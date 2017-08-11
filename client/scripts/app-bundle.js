define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ContactUpdated = exports.ContactUpdated = function ContactUpdated(contact) {
    _classCallCheck(this, ContactUpdated);

    this.contact = contact;
  };

  var ContactViewed = exports.ContactViewed = function ContactViewed(contact) {
    _classCallCheck(this, ContactViewed);

    this.contact = contact;
  };
});
define('utility',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.areEqual = areEqual;
	function areEqual(obj1, obj2) {
		return Object.keys(obj1).every(function (key) {
			return obj2.hasOwnProperty(key) && obj1[key] === obj2[key];
		});
	};
});
define('app/header',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Header = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor;

  var Header = exports.Header = (_class = function Header() {
    _classCallCheck(this, Header);

    _initDefineProp(this, 'title', _descriptor, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'title', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('app/no-selection',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var NoSelection = exports.NoSelection = function NoSelection() {
    _classCallCheck(this, NoSelection);

    this.message = "Please Select a Contact.";
  };
});
define('app/view',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: '', moduleId: './app/no-selection', title: 'Select' }, { route: 'contacts/:id', moduleId: './contacts/view', name: 'contacts' }]);

      this.router = router;
    };

    return App;
  }();
});
define('contacts/model',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Contact = exports.Contact = function () {
    function Contact(data) {
      _classCallCheck(this, Contact);

      this.first = '';
      this.last = '';
      this.email = '';
      this.phone = '';

      this.id = data._id;
      this.first = data.first;
      this.last = data.last;
      this.email = data.email;
      this.phone = data.phone;
    }

    Contact.prototype.toData = function toData() {
      return {
        first: this.first,
        last: this.last,
        email: this.email,
        phone: this.phone
      };
    };

    return Contact;
  }();
});
define('contacts/service',['exports', 'aurelia-framework', 'aurelia-http-client', './model'], function (exports, _aureliaFramework, _aureliaHttpClient, _model) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ContactService = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ContactService = exports.ContactService = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient), _dec(_class = function () {
    function ContactService(httpClient) {
      _classCallCheck(this, ContactService);

      this.http = httpClient.configure(function (x) {
        x.withBaseUrl('/api/contacts');
        x.withHeader('Content-Type', 'application/json');
      });
    }

    ContactService.prototype.getAllContacts = function getAllContacts() {
      return this.http.get('').then(function (response) {
        return response.content.contacts.map(function (x) {
          return new _model.Contact(x);
        });
      });
    };

    ContactService.prototype.getContact = function getContact(id) {
      return this.http.get(id).then(function (response) {
        return new _model.Contact(response.content);
      });
    };

    ContactService.prototype.addContact = function addContact(contact) {
      return this.http.post('', contact.toData()).then(function (response) {
        return new _model.Contact(response.content.obj);
      });
    };

    ContactService.prototype.updateContact = function updateContact(contact) {
      return this.http.patch(contact.id, contact.toData()).then(function (response) {
        return new _model.Contact(response.content.obj);
      });
    };

    ContactService.prototype.deleteContact = function deleteContact(contact) {
      return this.http.delete(contact.id).then(function (response) {});
    };

    return ContactService;
  }()) || _class);
});
define('contacts/view-list',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './service', '../messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _service, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ContactList = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ContactList = exports.ContactList = (_dec = (0, _aureliaFramework.inject)(_service.ContactService, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function ContactList(service, eq) {
      var _this = this;

      _classCallCheck(this, ContactList);

      this.service = service;
      this.contacts = [];

      eq.subscribe(_messages.ContactViewed, function (msg) {
        return _this.select(msg.contact);
      });
      eq.subscribe(_messages.ContactUpdated, function (msg) {
        var id = msg.contact.id;
        var found = _this.contacts.find(function (x) {
          return x.id === id;
        });
        Object.assign(found, msg.contact);
      });
    }

    ContactList.prototype.created = function created() {
      var _this2 = this;

      this.service.getAllContacts().then(function (contacts) {
        return _this2.contacts = contacts;
      });
    };

    ContactList.prototype.select = function select(contact) {
      this.selectedId = contact.id;
      return true;
    };

    return ContactList;
  }()) || _class);
});
define('contacts/view',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../utility', './service', '../messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _utility, _service, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ContactDetail = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var ContactDetail = exports.ContactDetail = (_dec = (0, _aureliaFramework.inject)(_service.ContactService, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function ContactDetail(service, ea) {
      _classCallCheck(this, ContactDetail);

      this.service = service;
      this.ea = ea;
    }

    ContactDetail.prototype.activate = function activate(params, routeConfig) {
      var _this = this;

      this.routeConfig = routeConfig;

      return this.service.getContact(params.id).then(function (contact) {
        _this.contact = contact;
        _this.routeConfig.navModel.setTitle(contact.first);
        _this.originalContact = JSON.parse(JSON.stringify(contact));
        _this.ea.publish(new _messages.ContactViewed(_this.originalContact));
      });
    };

    ContactDetail.prototype.save = function save() {
      var _this2 = this;

      this.service.saveContact(this.contact).then(function (contact) {
        _this2.contact = contact;
        _this2.routeConfig.navModel.setTitle(contact.first);
        _this2.originalContact = JSON.parse(JSON.stringify(contact));
        _this2.ea.publish(new _messages.ContactUpdated(_this2.contact));
      });
    };

    ContactDetail.prototype.canDeactivate = function canDeactivate() {
      if (!(0, _utility.areEqual)(this.originalContact, this.contact)) {
        var result = confirm('You have unsaved changes.  Are you sure you wish to leave?');

        if (!result) {
          this.ea.publish(new _messages.ContactViewed(this.contact));
        }

        return result;
      }

      return true;
    };

    _createClass(ContactDetail, [{
      key: 'canSave',
      get: function get() {
        return this.contact.first && this.contact.last && !this.service.http.isRequesting;
      }
    }]);

    return ContactDetail;
  }()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./elements/loading-indicator']);
  }
});
define('resources/elements/loading-indicator',['exports', 'nprogress', 'aurelia-framework'], function (exports, _nprogress, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LoadingIndicator = undefined;

  var nprogress = _interopRequireWildcard(_nprogress);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var LoadingIndicator = exports.LoadingIndicator = (_dec = (0, _aureliaFramework.noView)(['nprogress/nprogress.css']), _dec(_class = (_class2 = function () {
    function LoadingIndicator() {
      _classCallCheck(this, LoadingIndicator);

      _initDefineProp(this, 'loading', _descriptor, this);
    }

    LoadingIndicator.prototype.loadingChanged = function loadingChanged(newValue) {
      if (newValue) {
        nprogress.start();
      } else {
        nprogress.done();
      }
    };

    return LoadingIndicator;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'loading', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class2)) || _class);
});
define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: '', moduleId: './app/no-selection', title: 'Select' }, { route: 'contacts/:id', moduleId: './contacts/view', name: 'contacts' }]);

      this.router = router;
    };

    return App;
  }();
});
define('text!styles.css', ['module'], function(module) { module.exports = "body { padding-top: 70px; }\n\nsection {\n  margin: 0 20px;\n}\n\na:focus {\n  outline: none;\n}\n\n.navbar-nav li.loader {\n    margin: 12px 24px 0 6px;\n}\n\n.no-selection {\n  margin: 20px;\n}\n\n.contact-list {\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  padding: 10px;\n}\n\n.panel {\n  margin: 20px;\n}\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white;\n}\n\n.button-bar > button {\n  float: right;\n  margin: 20px;\n}\n\nli.list-group-item {\n  list-style: none;\n}\n\nli.list-group-item > a {\n  text-decoration: none;\n}\n\nli.list-group-item.active > a {\n  color: white;\n}\n"; });
define('text!app/header.html', ['module'], function(module) { module.exports = "<template><nav class=\"navbar\" role=\"navigation\"><div class=\"navbar-brand\"><a class=\"navbar-item\" href=\"#\"><i class=\"fa fa-user\"></i>&nbsp;<span>${title}</span></a></div></nav></template>"; });
define('text!app/no-selection.html', ['module'], function(module) { module.exports = "<template><div class=\"has-text-centered\"><h2 class=\"title\">${message}</h2></div></template>"; });
define('text!app/view.html', ['module'], function(module) { module.exports = "<template><require from=\"./header\"></require><require from=\"../contacts/view-list\"></require><div class=\"container\"><header title.bind=\"Contacts\"></header><loading-indicator loading.bind=\"router.isNavigating || api.http.isRequesting\"></loading-indicator><div class=\"columns\"><contact-list class=\"column is-one-third\"></contact-list><router-view class=\"column is-two-thirds\"></router-view></div></div></template>"; });
define('text!contacts/view-list.html', ['module'], function(module) { module.exports = "<template><div class=\"panel\"><ul class=\"menu-list\"><a class=\"panel-block ${contact.id === $parent.selectedId ? 'is-active' : ''}\" repeat.for=\"contact of contacts\" route-href=\"route: contacts; params.bind: {id:contact.id}\" click.delegate=\"$parent.select(contact)\"><h4>${contact.first} ${contact.last}</h4><p>${contact.email}</p></a></ul></div></template>"; });
define('text!contacts/view.html', ['module'], function(module) { module.exports = "<template><div class=\"panel\"><div class=\"panel-heading\"><h3 class=\"title\">Profile</h3></div><div class=\"panel-block\"><form role=\"form\"><div class=\"field is-horizontal\"><div class=\"field-label is-normal\"><label class=\"label\" for=\"first\">First Name</label></div><div class=\"field-body\"><div class=\"field\"><div class=\"control\"><input class=\"input\" id=\"first\" type=\"text\" value.bind=\"contact.first\"/></div></div></div></div><div class=\"field is-horizontal\"><div class=\"field-label is-normal\"><label class=\"label\" for=\"last\">Last Name</label></div><div class=\"field-body\"><div class=\"field\"><div class=\"control\"><input class=\"input\" id=\"last\" type=\"text\" value.bind=\"contact.last\"/></div></div></div></div><div class=\"field is-horizontal\"><div class=\"field-label is-normal\"><label class=\"label\" for=\"email\">Email</label></div><div class=\"field-body\"><div class=\"field\"><div class=\"control\"><input class=\"input\" id=\"email\" type=\"text\" value.bind=\"contact.email\"/></div></div></div></div><div class=\"field is-horizontal\"><div class=\"field-label is-normal\"><label class=\"label\" for=\"phone\">Phone Number</label></div><div class=\"field-body\"><div class=\"field\"><div class=\"control\"><input class=\"input\" id=\"phone\" type=\"text\" value.bind=\"contact.phone\"/></div></div></div></div><div class=\"field is-horizontal\"><div class=\"field-label\"><!-- Left empty for spacing--></div><div class=\"field-body\"><div class=\"field\"><div class=\"control\"><button class=\"button is-primary\" click.delegate=\"save()\" disabled.bind=\"!canSave\">Save</button></div></div></div></div></form></div></div></template>"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./app/header\"></require><require from=\"./contacts/view-list\"></require><div class=\"container\"><header title.bind=\"Contacts\"></header><loading-indicator loading.bind=\"router.isNavigating || api.http.isRequesting\"></loading-indicator><div class=\"columns\"><contact-list class=\"column is-one-third\"></contact-list><router-view class=\"column is-two-thirds\"></router-view></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map