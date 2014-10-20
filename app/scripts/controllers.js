// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("404Ctrl", function($scope) {
  $scope.awesomeThings = ["HTML5 Boilerplate", "AngularJS", "Karma"];
  $scope.$on("$viewContentLoaded", function() {
    return $scope.$emit("pageChange", "404");
  });
  return false;
});

// Generated by CoffeeScript 1.7.1
Mifan.controller("friendCtrl", function($scope) {
  $scope.$on("$viewContentLoaded", function() {
    return $scope.$emit("pageChange", "friend");
  });
  $scope.feedType = "follow";
  return $scope.switchFeed = function(type) {
    return $scope.feedType = type || "follow";
  };
});

// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("globalCtrl", function($scope) {
  $scope.WIN = WIN;
  $scope.DOC = DOC;
  $scope.LOC = LOC;
  $scope.BODY = BODY;
  $scope.API = API;
  $scope.IsIPhone = IsIPhone;
  $scope.IsIPad = IsIPad;
  $scope.IsIOS = IsIOS;
  $scope.IsAndroid = IsAndroid;
  $scope.IsAndroidPad = IsAndroidPad;
  $scope.IsIEMobile = IsIEMobile;
  $scope.IsWeixin = IsWeixin;
  $scope.IsTouch = $scope.IsMobile = IsTouch;
  $scope.IsChrome = IsChrome;
  $scope.IsIE = IsIE;
  $scope.IsPhone = IsPhone;
  $scope.IsWebapp = IsWebapp;
  return $scope.DEFAULT_FACE = "http://mifan.us/public/images/user_normal.jpg";
});

// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("headCtrl", function($scope) {
  $scope.dropdownOpen = false;
  $scope.toggleDropdown = function() {
    return $scope.dropdownOpen = !$scope.dropdownOpen;
  };
  $scope.support = function() {
    return alert(1);
  };
  $scope.navs = [
    {
      page: "home",
      text: "首页"
    }, {
      page: "msg",
      text: "消息"
    }, {
      page: "me",
      text: "个人主页"
    }, {
      page: "friend",
      text: "朋友"
    }, {
      page: "square",
      text: "广场"
    }
  ];
  $scope.remind = "米饭新增豆瓣登录!";
  return $scope.remind = "";
});

// Generated by CoffeeScript 1.7.1
Mifan.controller("homeAnswer", function($scope, $http) {
  var news;
  $scope.$emit("clearAnswerRemind");
  $scope.ansMeCollect = [];
  news = {
    init: function() {
      return news.get();
    },
    get: function() {
      var cb, url;
      url = "" + API.answerme + $scope.privacyParamDir;
      if (IsDebug) {
        url = API.answerme;
      }
      cb = function(data) {
        var ret;
        ret = data.ret;
        if (String(ret) === "100000") {
          return $scope.ansMeCollect = data.result;
        }
      };
      return $http.get(url, {
        cache: "lruCache"
      }).success(cb);
    }
  };
  return news.init();
});

// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("homeAskCtrl", function($scope, $timeout) {
  var clearAsk;
  $scope.quesContent = "";
  $scope.isSending = false;
  $scope.send = function() {
    $scope.isSending = true;
    return $scope.askQues({
      content: $scope.quesContent
    });
  };
  clearAsk = function() {
    $scope.isSending = false;
    return $timeout(function() {
      return $scope.isSendSucs = false;
    }, 1000);
  };
  $scope.$on("onAskQuesSuccess", function(event, msg) {
    $scope.quesContent = "";
    $scope.isSendSucs = true;
    $scope.toast("提问成功！");
    return clearAsk();
  });
  return $scope.$on("onAskQuesFail", function(event, msg) {
    $scope.toast(msg.msg, "warn");
    return clearAsk();
  });
});

// Generated by CoffeeScript 1.7.1
Mifan.controller("homeCoverCtrl", function($scope, $timeout) {
  return $scope.bgUrl = "images/covers/fruit_large.jpg";
});

// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("homeCtrl", [
  "$scope", "$routeParams", function($scope, $routeParams) {
    var legalFeedTypes, setCaretLeft;
    legalFeedTypes = ["news", "answer", "reply", "love"];
    setCaretLeft = function(type) {
      var index;
      index = legalFeedTypes.indexOf(type);
      return $scope.caretLeft = "" + (index * 25) + "%";
    };
    $scope.legalFeedTypes = legalFeedTypes;
    $scope.caretLeft = "0";
    if (0 > legalFeedTypes.indexOf($routeParams.type)) {
      $routeParams.type = "news";
    }
    $scope.feedType = $routeParams.type;
    $scope.$on("$viewContentLoaded", function() {
      return $scope.$emit("pageChange", "home");
    });
    $scope.remind = {
      newsNum: 0,
      answerNum: 2,
      replyNum: '...',
      loveNum: 0
    };
    $scope.$on("clearAnswerRemind", function() {
      return $scope.remind.answerNum = 0;
    });
    $scope.$on("clearReplyRemind", function() {
      return $scope.remind.replyNum = 0;
    });
    $scope.loadingMore = function() {
      return $scope.isLoading = true;
    };
    $scope.switchFeed = function(type) {
      type = type || "news";
      $scope.feedType = type;
      $scope.isLoading = false;
      return setCaretLeft(type);
    };
    return false;
  }
]);

// Generated by CoffeeScript 1.7.1
Mifan.controller("homeFeed", function($scope, $http) {
  var comment, feed, loveAns;
  feed = {
    init: function() {}
  };
  feed.init();
  $scope.toggleMBubble = function(index) {
    return $scope.newsCollect[index].bblActv = !$scope.newsCollect[index].bblActv;
  };
  $scope.setMBill = function(index) {
    return $scope.toggleMBill(["love", "comment", "share"]);
  };
  loveAns = {
    init: function() {
      $scope.loveAns = loveAns.send;
      return $scope.$on("loveansCb", function(event, data) {
        return loveAns.sendCb(data);
      });
    },
    feed: null,
    send: function(item, point) {
      var data;
      if (item.love.iflove) {
        return false;
      }
      data = {
        answerid: item.answer.answerid
      };
      loveAns.feed = item;
      return $scope.$emit("loveans", data);
    },
    sendCb: function(data) {
      var msg, result, ret, toastType;
      ret = data.ret, msg = data.msg, result = data.result;
      toastType = "";
      if (String(ret) === "100000") {
        loveAns.feed.love.iflove = 1;
        loveAns.feed.answer.digg = result;
        msg = "喜欢成功";
      } else {
        toastType = "warn";
      }
      return $scope.toast(msg, toastType);
    }
  };
  loveAns.init();
  comment = {
    init: function() {
      $scope.comment = comment.send;
      $scope.$on("commentCb", function(e, data) {
        return comment.sendCb(data);
      });
      $scope.$on("getcommentCb", function(e, data) {
        return comment.getCb(data);
      });
      $scope.expandCmtFn = comment.expand;
      $scope.expandReplyFn = comment.replyExpand;
      return $scope.reply = comment.reply;
    },
    point: null,
    feed: null,
    getcommentFeed: null,
    content: "",
    send: function(news, point, isReply) {
      var content;
      point.isSendingCmt = true;
      content = isReply ? "回复@" + comment.replyUsername + ": " + point.rplContent : point.cmtContent;
      comment.content = content;
      $scope.$emit("comment", {
        askid: news.ask.askid,
        answerid: news.answer.answerid,
        content: content
      });
      comment.point = point;
      return comment.feed = news;
    },
    sendCb: function(data) {
      var cmt, msg, result, ret, toastType, user;
      ret = data.ret, msg = data.msg, result = data.result;
      toastType = "";
      if (String(ret) === "100000") {

      } else {
        toastType = "warn";
      }
      $scope.toast(msg);
      comment.point.isSendingCmt = false;
      comment.point.isSendingRpl = false;
      comment.point.cmtContent = "";
      comment.point.rplContent = "";
      comment.point.expandReply = false;
      user = $scope.user;
      cmt = {
        content: comment.content,
        addtime: +(new Date),
        user: {
          "userid": user.userid,
          "username": user.username,
          "email": user.email,
          "face": user.email,
          "path": user.path,
          "face_120": user.face_120,
          "face_60": user.face_60
        }
      };
      return comment.feed.comment.splice(0, 0, cmt);
    },
    expand: function(feed, point) {
      point.expandCmt = !point.expandCmt;
      if (point.expandCmt) {
        comment.get(feed, point);
        return comment.getcommentFeed = feed;
      }
    },
    get: function(feed, point) {
      var data;
      data = {
        answerid: feed.answer.answerid
      };
      return $scope.$emit("getcomment", data);
    },
    getCb: function(data) {
      var msg, result, ret;
      ret = data.ret, msg = data.msg, result = data.result;
      return comment.getcommentFeed.comment = result;
    },
    replyExpand: function(feed, point) {
      return point.expandReply = !point.expandReply;
    },
    replyUsername: "",
    reply: function(index, feed, point) {
      var cmt, username;
      cmt = feed.comment[index];
      username = cmt.user.username;
      comment.replyUsername = username;
      point.isSendingRpl = true;
      return comment.send(feed, point, true);
    },
    replyCb: function(data) {}
  };
  return comment.init();
});

// Generated by CoffeeScript 1.7.1
Mifan.controller("homeLove", function($scope) {
  $scope.content = "喜欢我的";
  console.log("喜欢我的");
  return $scope.$emit("clearLoveRemind");
});

// Generated by CoffeeScript 1.7.1
Mifan.controller("homeNews", function($scope, $timeout, $http, $time) {
  var API, news;
  API = $scope.API;
  $scope.content = "";
  $scope.newsCollect = [];
  news = {
    init: function() {
      $scope.$on("getHomeNews", function() {
        return news.get();
      });
      if ($scope.isLogin) {
        return news.get();
      }
    },
    get: function() {
      var cb, url;
      url = "" + API.news + $scope.privacyParamDir;
      if (IsDebug) {
        url = API.news;
      }
      cb = function(data) {
        var ret;
        ret = data['ret'];
        if (String(ret) === "100000") {
          return $scope.newsCollect = data['result'];
        }
      };
      return $http.get(url, {
        cache: "lruCache"
      }).success(cb);
    }
  };
  return news.init();
});

// Generated by CoffeeScript 1.7.1
Mifan.controller("homeReply", function($scope) {
  $scope.content = "回应我的";
  console.log("回应我的");
  return $scope.$emit("clearReplyRemind");
});

// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("homeSideCtrl", function($scope) {
  return $scope.mifanAskContent = "情人节和谁过的？";
});

// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("loginCtrl", function($scope, $http, $timeout) {
  var API, userLogin, userLoginErrorCb, userLoginSuccessCb;
  API = $scope.API;
  $scope.error = null;
  userLoginSuccessCb = function(data, status) {

    /*
    {
      "msg": "密码错误！",
      "ret": "104003"
    }
    
    {
      "msg": "Email不存在，你可能还没有注册！",
      "ret": "104002"
    }
    
    {
      "msg": "OK",
      "ret": "100000",
      "result": {}
    }
     */
    var result, ret;
    ret = data["ret"];
    if (ret === "100000") {
      result = data["result"];
      $scope.$emit("onLogined", result);
    } else if (ret === "104003") {
      $scope.error = {
        type: "password",
        msg: "密码错误 :("
      };
    } else if (ret === "104002") {
      $scope.error = {
        type: "username",
        msg: "用户名不存在 T_T"
      };
    }
    if ($scope.error) {
      $timeout(function() {
        return $scope.error = null;
      }, 3000);
    }
    return $scope.isLoging = false;
  };
  userLoginErrorCb = function(data, status) {
    var ret;
    ret = data["ret"];
    return $scope.isLoging = false;
  };
  userLogin = function() {
    $scope.isLoging = true;
    return $http({
      method: IsDebug ? "GET" : "POST",
      url: API.user,
      data: {
        user_email: $scope.email,
        user_password: $scope.password
      }
    }).success(userLoginSuccessCb).error(userLoginErrorCb);
  };
  $scope.$on("$viewContentLoaded", function() {
    return $scope.$emit("pageChange", "login");
  });
  $scope.$watch("email + password", function() {
    return $scope.isLogValid = $scope.email && $scope.password;
  });
  $scope.isLoging = false;
  return $scope.onSubmit = function() {
    if ($scope.email && $scope.password) {
      return userLogin();
    }
  };
});

// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("meCtrl", function($scope, $timeout, $http) {
  var legalFeedTypes, me;
  $scope.$on("$viewContentLoaded", function() {
    return $scope.$emit("pageChange", "me");
  });
  legalFeedTypes = ["ask", "answer", "love"];
  $scope.feedType = "ask";
  $scope.ta = "我";
  $scope.loadingMore = function() {
    return $scope.isLoading = true;
  };
  $scope.switchFeed = function(type) {
    type = type || "ask";
    $scope.feedType = type;
    return $scope.isLoading = false;
  };
  $scope.profile = $scope.user;
  me = {
    init: function() {
      me.getMyAsk();
      $timeout(me.getMyAnswer, 300);
      $timeout(me.getMyLove, 600);
      $scope.myAskMsg = $scope.myAnswerMsg = $scope.myLoveMsg = "";
      $scope.myAsk = $scope.myAnswer = $scope.myLove = [];
      $scope.myAskMore = $scope.myAnswerMore = $scope.myLoveMore = false;
      return $scope.myself = true;
    },
    feedWatcher: function(feed) {
      if (feed == null) {
        feed = "ask";
      }
    },
    getMyAsk: function() {
      var api;
      api = "" + API.myask + $scope.privacyParamDir;
      if (IsDebug) {
        api = API.myask;
      }
      return $http.get(api).success(me.getMyAskCb);
    },
    getMyAskCb: function(data) {
      if (String(data.msg) === "ok") {
        return $scope.myAsk = data.result || [];
      } else {
        return $scope.myAskMsg = data.msg;
      }
    },
    getMyAnswer: function() {
      var api;
      api = "" + API.myanswer + $scope.privacyParamDir;
      if (IsDebug) {
        api = API.myanswer;
      }
      return $http.get(api).success(me.getMyAnswerCb);
    },
    getMyAnswerCb: function(data) {
      if (String(data.msg) === "ok") {
        return $scope.myAnswer = data.result || [];
      } else {
        return $scope.myAnswerMsg = data.msg;
      }
    },
    getMyLove: function() {}
  };
  return me.init();
});

// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("profileCtrl", function($scope) {});

// Generated by CoffeeScript 1.7.1
Mifan.controller("mBillCtrl", function($scope) {
  var billListMap;
  billListMap = {
    "love": {
      name: "喜欢"
    },
    "comment": {
      name: "评论",
      fn: "toggleMDesign('comment')"
    },
    "share": {
      name: "分享"
    },
    "answer": {
      name: "回答",
      fn: "toggleMDesign('answer')"
    }
  };
  $scope.billList = [];
  return $scope.$on("setBillList", function(event, msg) {
    var type;
    return $scope.billList = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = msg.length; _i < _len; _i++) {
        type = msg[_i];
        _results.push(billListMap[type]);
      }
      return _results;
    })();
  });
});

// Generated by CoffeeScript 1.7.1
Mifan.controller("mDesginCtrl", function($scope, $timeout) {
  var DOC, elMDesignTextarea, sendData, titleMap;
  DOC = $scope.DOC;
  elMDesignTextarea = DOC["getElementById"]("m-design-input");
  titleMap = {
    "ask": "提出问题",
    "comment": "评论",
    "answer": "回答"
  };
  $scope.mDesignContent = "";
  sendData = {};
  $scope.$on("setMDesignType", function(evet, msg) {
    $scope.viewType = msg;
    $scope.title = titleMap[msg];
    switch (msg) {
      case "ask":
        sendData = {
          type: msg,
          content: $scope.mDesignContent
        };
    }
    return $timeout(function() {
      return elMDesignTextarea.focus();
    }, 800);
  });
  $scope.$on("cancelMDesingSending", function() {
    $scope.isSending = false;
    return $scope.mDesignContent = "";
  });
  $scope.onSubmit = function() {
    $scope.isSending = true;
    return $scope.$emit("onMDesignSend", sendData);
  };
  return $scope.$on("onMDesignSendSuccess", function(event, msg) {
    $scope.mDesignContent = "";
    $scope.isSending = false;
    $scope.isSendSucs = true;
    return $timeout(function() {
      $scope.isSendSucs = false;
      if ($scope.isMDesignOpen) {
        return $scope.toggleMDesign();
      }
    }, 800);
  });
});

// Generated by CoffeeScript 1.7.1
Mifan.controller("mMenuCtrl", function($scope, $timeout) {});

// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("msgCtrl", function($scope, $rootScope, $http, $debug, $timeout) {
  var DOC, ans, msg;
  DOC = $scope.DOC;
  $scope.$on("$viewContentLoaded", function() {
    return $scope.$emit("pageChange", "msg");
  });
  $scope.expander = function(target) {};
  $scope.setMBill = function(index) {
    return $scope.toggleMBill(["love", "answer", "share"]);
  };
  msg = {
    init: function() {
      msg.getAskMe();
      $scope.askMe = [];
      $scope.askMeMsg = "";
      return $scope.askMeMore = false;
    },
    getAskMe: function() {
      var api;
      api = "" + API.askme + $scope.privacyParamDir + "/type/askme";
      if (IsDebug) {
        api = API.askme;
      }
      return $http.get(api).success(msg.getAskMeCb);
    },
    getAskMeCb: function(data) {
      if (String(data.msg) === "ok") {
        $scope.askMe = data.result || [];
        return msg.count = data.result.length;
      } else {
        return $scope.askMeMsg = data.msg;
      }
    },
    count: 0
  };
  msg.init();
  ans = {
    init: function() {
      $scope.send = ans.send;
      $scope.$watch($scope.askMe, function() {
        if ($scope.askMe.length === 0) {
          return $scope.askMeMsg = "空";
        }
      });
      return $scope.$on("ansCb", function(event, data) {
        return ans.sendCb(data);
      });
    },
    send: function(item, msg) {
      var query;
      item.isSending = true;
      query = {
        askid: msg.askid,
        content: item.content
      };
      return $scope.$emit("ans", query);
    },
    sendCb: function(data) {
      var toastType;
      this.content = "";
      this.isSending = false;
      toastType = "";
      if (String(data.ret) === "100000") {
        $timeout(((function(_this) {
          return function() {
            _this.isSendSucs = true;
            _this.answerd = true;
            return _this.isSendSucs = false;
          };
        })(this)), 1000);
        ans.count++;
        if (ans.count >= msg.count) {
          $scope.askMe.length = 0;
        }
      } else {
        toastType = "warn";
      }
      return $scope.toast(data.msg, toastType);
    },
    count: 0
  };
  ans.init();
  return false;
});

// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("registerCtrl", function($scope) {
  $scope.$on("$viewContentLoaded", function() {
    return $scope.$emit("pageChange", "register");
  });
  $scope.$watch("email + password", function() {
    return $scope.isRegValid = $scope.email && $scope.password;
  });
  $scope.isReging = false;
  return $scope.regSubmit = function() {
    return $scope.isReging = true;
  };
});

// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("rootCtrl", function($scope, $cookieStore, $http, $timeout, $storage, $emoji, $cacheFactory, $extend, $location, $debug) {
  var API, Ans, Ask, Cache, Comment, Follow, LoveAns, MBill, MDesign, MMenu, Notification, Page, Toast, User, elMwrap, getUserInfo, store;
  API = $scope.API;
  $storage.put = $storage.set;
  store = IsWebapp ? $storage : $cookieStore;
  $scope.supportNum = "1万";

  /*
  用户信息，用户操作的方法
   */
  User = {
    init: function() {
      $scope.user = {};
      $scope.accessToken = $scope.UID = void 0;
      $scope.isLogin = false;
      $scope.$on("onLogined", User.onLoginCb);
      $scope.User = User;
      return User.getLocal();
    },
    set: function(user) {
      return $extend($scope.user, user);
    },
    getRemote: function() {
      var uid, url;
      uid = $scope.user.uid;
      url = ["" + API.userInfo, (IsDebug ? "" : "/" + uid), "" + $scope.privacyParam, "&uid=" + uid].join("");
      return $http.get(url).success(User.getRemoteCb).error(User.getRemoteErrorCb);
    },
    getRemoteCb: function(data) {
      var ret, user;
      ret = data["ret"];
      if (String(ret) === "100000") {
        user = data["result"];
        User.set(user);
        $scope.isLogin = true;
        return $scope.$broadcast("getHomeNews");
      } else {
        return User.onOutOfDate();
      }
    },
    getRemoteErrorCb: function(data) {},
    isLocalLogin: false,
    getLocal: function() {
      var accessToken, uid;
      uid = store.get("mUID");
      accessToken = store.get("mAccessToken");
      if (uid && accessToken) {
        return User.getLocalCb(uid, accessToken);
      } else {
        return User.login();
      }
    },
    getLocalCb: function(uid, accessToken) {
      var username;
      User.isLocalLogin = true;
      username = store.get("mUsername");
      $scope.user.uid = $scope.UID = uid;
      $scope.user.face_60 = $scope.user.face_120 = $scope.DEFAULT_FACE;
      $scope.user.username = username;
      $scope.accessToken = accessToken;
      User.setPrivacy();
      return User.getRemote();
    },
    setPrivacy: function() {
      var accessToken, uid;
      accessToken = $scope.accessToken;
      uid = $scope.UID;
      $scope.privacyParam = "?access_token=" + accessToken + "&userid=" + uid;
      return $scope.privacyParamDir = "/access_token/" + accessToken + "/userid/" + uid;
    },
    store: function(user) {
      store.put("mUID", user["userid"]);
      store.put("mUsername", user["username"]);
      return store.put("mAccessToken", $scope.accessToken);
    },
    remove: function() {
      store.remove("mUID");
      store.remove("mUsername");
      return store.remove("mAccessToken");
    },
    onLoginCb: function(event, result) {
      var accessToken, user;
      $scope.isLogin = true;
      accessToken = $scope.accessToken = result["accesstoken"];
      user = result["user"];
      $scope.UID = user["userid"];
      $scope.user.accessToken = accessToken;
      User.set(user);
      User.store(user);
      return $location.path("/");
    },
    onOutOfDate: function() {
      User.remove();
      $scope.isLogin = false;
      return User.login();
    },
    logout: function() {
      $scope.user = {};
      $cookieStore.remove("mUID");
      $cookieStore.remove("mAccessToken");
      $scope.isLogin = false;
      return $timeout(User.login, 200);
    },
    login: function() {
      if (!$location.path().match(/login/)) {
        return $location.path("login");
      }
    }
  };
  User.init();

  /*
  页面切换，页面操作
   */
  elMwrap = DOC["getElementById"]("m-wrap");
  Page = {
    init: function() {
      $scope.page = "home";
      $scope.scrollBody1Px = Page.scrollBody1Px;
      $scope.backToTop = Page.onBackToTop;
      $scope.$on("pageChange", Page.onPageChangeCb);
      $scope.logout = User.logout;
      return $scope.Page = Page;
    },
    onPageChangeCb: function(event, msg) {
      $scope.page = msg;
      return elMwrap["scrollTop"] = 1;
    },
    onBackToTop: function(isM) {
      return (isM ? elMwrap : BODY)["scrollTop"] = 0;
    },
    scrollBody1Px: function() {
      if (elMwrap["scrollTop"] === 0) {
        return elMwrap["scrollTop"] = 1;
      }
    }
  };
  Page.init();

  /*
  移动用户侧边栏菜单
   */
  MMenu = {
    init: function() {
      $scope.isMMenuOpen = false;
      $scope.toggleMMenu = MMenu.toggle;
      return $scope.MMenu = MMenu;
    },
    toggle: function() {
      return $scope.isMMenuOpen = !$scope.isMMenuOpen;
    }
  };
  MMenu.init();

  /*
  移动全屏输入框
   */
  MDesign = {
    init: function() {
      $scope.isMDesignOpen = false;
      $scope.isMDesignOpenMask = false;
      $scope.toggleMDesign = MDesign.toggle;
      return $scope.$on("onMDesignSend", MDesign.onSend);
    },
    toggle: function(type) {
      if ($scope.isMDesignOpen) {
        $scope.isMDesignOpenMask = !$scope.isMDesignOpenMask;
        $timeout(function() {
          return $scope.isMDesignOpen = !$scope.isMDesignOpen;
        }, 200);
      } else {
        $scope.isMDesignOpen = !$scope.isMDesignOpen;
        $timeout(function() {
          return $scope.isMDesignOpenMask = !$scope.isMDesignOpenMask;
        }, 200);
      }
      if ($scope.isMBillOpen) {
        MBill.toggle();
      }
      if (type && $scope.isMDesignOpen) {
        $scope.$broadcast("setMDesignType", type);
      }
      if (!$scope.isMDesignOpen) {
        return $scope.$broadcast("cancelMDesingSending");
      }
    },
    onSend: function(event, msg) {
      var content, type;
      type = msg.type;
      content = msg.content;
      switch (type) {
        case "ask":
          return Ask.ask(content);
      }
    },
    onOpen: function() {},
    onClose: function() {}
  };
  MDesign.init();

  /*
  移动底部弹出交互菜单
   */
  MBill = {
    init: function() {
      $scope.isMBillOpen = false;
      $scope.isMBillOpenMask = false;
      return $scope.toggleMBill = MBill.toggle;
    },
    toggle: function(billList) {
      if ($scope.isMBillOpen) {
        $scope.isMBillOpenMask = !$scope.isMBillOpenMask;
        return $timeout(function() {
          return $scope.isMBillOpen = !$scope.isMBillOpen;
        }, 200);
      } else {
        $scope.$broadcast("setBillList", billList);
        $scope.isMBillOpen = !$scope.isMBillOpen;
        return $timeout(function() {
          return $scope.isMBillOpenMask = !$scope.isMBillOpenMask;
        }, 100);
      }
    }
  };
  MBill.init();

  /*
  提问
   */
  Ask = {
    init: function() {
      return $scope.askQues = Ask.ask;
    },
    ask: function(data) {
      var query, url;
      url = "" + API.ask + $scope.privacyParamDir;
      if (IsDebug) {
        url = API.ask;
      }
      query = {
        content: data.content
      };
      if (data.foruser) {
        query.foruser = data.foruser;
      }
      return (IsDebug ? $http.get : $http.post)(url, query).success(Ask.askCb);
    },
    askCb: function(data) {
      var ret;
      ret = data["ret"];
      if (String(ret) === "100000") {
        $scope.$broadcast("onAskQuesSuccess", {
          queId: data["result"]
        });
        return $scope.$broadcast("onMDesignSendSuccess");
      } else {
        return $scope.$broadcast("onAskQuesFail", {
          msg: data.msg
        });
      }
    }
  };
  Ask.init();

  /*
  缓存的配置
   */
  Cache = {
    init: function() {
      var $httpDefaultCache, lruCache;
      $httpDefaultCache = $cacheFactory.get($http);
      return lruCache = $cacheFactory("lruCache", {
        capacity: 8
      });
    }
  };
  Cache.init();
  Notification = {
    init: function() {
      return Notification.get();
    },
    time: 0,
    get: function() {
      var api;
      api = IsDebug ? API.notice : "" + API.notice + $scope.privacyParamDir;
      $http.get(api).success(Notification.cb);
      return Notification.time++;
    },
    cb: function(data) {
      if (data.msg === "ok") {
        $scope.msgCount = data.result || 0;
      }
      return $timeout(Notification.get, 30000);
    }
  };
  Notification.init();
  Toast = {
    init: function() {
      $scope.toast = Toast.toast;
      return $scope.Toast = Toast;
    },
    text: "",
    isShow: false,
    type: "primary",
    toast: function(msg, type) {
      Toast.text = msg;
      Toast.isShow = true;
      Toast.type = type || "success";
      return $timeout((function() {
        return Toast.isShow = false;
      }), 3000);
    }
  };
  Toast.init();
  Follow = {
    init: function() {
      $scope.$on("follow", function(event, data) {
        return Follow.follow(data.userid);
      });
      return $scope.$on("unfollow", function(event, data) {
        return Follow.unfollow(data.userid);
      });
    },
    send: function(api, cb) {
      return (IsDebug ? $http.get : $http.post)(api).success(cb);
    },
    follow: function(uid) {
      var api;
      api = "" + API.follow + $scope.privacyParamDir + "/userid_follow/" + uid;
      if (IsDebug) {
        api = API.follow;
      }
      return Follow.send(api, Follow.followCb);
    },
    followCb: function(data) {
      return $scope.$broadcast("followCb", data);
    },
    unfollow: function(uid) {
      var api;
      api = "" + API.unfollow + $scope.privacyParamDir + "/userid_follow/" + uid;
      if (IsDebug) {
        api = API.unfollow;
      }
      return Follow.send(api, Follow.unfollowCb);
    },
    unfollowCb: function(data) {
      return $scope.$broadcast("unfollowCb", data);
    }
  };
  Follow.init();
  LoveAns = {
    init: function() {
      $scope.loveAns = LoveAns.send;
      return $scope.$on("loveans", function(event, data) {
        return LoveAns.send(data);
      });
    },
    feed: null,
    send: function(data) {
      var api, query;
      api = "" + API.loveanswer + $scope.privacyParamDir;
      if (IsDebug) {
        api = API.loveanswer;
      }
      query = data;
      return (IsDebug ? $http.get : $http.post)(api, query).success(LoveAns.sendCb);
    },
    sendCb: function(data) {
      return $scope.$broadcast("loveansCb", data);
    }
  };
  LoveAns.init();
  Ans = {
    init: function() {
      $scope.Ans = Ans.send;
      return $scope.$on("ans", function(event, data) {
        return Ans.send(data);
      });
    },
    send: function(data) {
      var api, query;
      api = "" + API.answer + $scope.privacyParamDir;
      if (IsDebug) {
        api = API.answer;
      }
      query = {
        askid: data.askid,
        content: data.content
      };
      return (IsDebug ? $http.get : $http.post)(api, query).success(function(data) {
        return Ans.sendCb(data);
      });
    },
    sendCb: function(data) {
      return $scope.$broadcast("ansCb", data);
    }
  };
  Ans.init();
  getUserInfo = {
    init: function() {
      return $scope.$on("getUserInfo", function(e, data) {
        return getUserInfo.get(data);
      });
    },
    get: function(data) {
      var api, uid;
      uid = data.uid;
      api = ["" + API.userInfo, (IsDebug ? "" : "/" + uid), "" + $scope.privacyParam, "&uid=" + uid].join("");
      return $http.get(api).success(getUserInfo.getCb);
    },
    getCb: function(data) {
      var msg, result;
      msg = data.msg, result = data.result;
      return $scope.$broadcast("getUserInfoCb", data);
    }
  };
  getUserInfo.init();
  Comment = {
    init: function() {
      $scope.$on("comment", function(e, data) {
        return Comment.send(data);
      });
      return $scope.$on("getcomment", function(e, data) {
        return Comment.get(data);
      });
    },
    send: function(data) {
      var api;
      api = "" + API.comment + $scope.privacyParamDir;
      if (IsDebug) {
        api = API.comment;
      }
      console.log(data);
      return (IsDebug ? $http.get : $http.post)(api, data).success(function(data) {
        return Comment.sendCb(data);
      });
    },
    sendCb: function(data) {
      return $scope.$broadcast("commentCb", data);
    },
    get: function(data) {
      var api;
      api = "" + API.getComment + $scope.privacyParamDir + "/answerid/" + data.answerid;
      if (IsDebug) {
        api = API.getComment;
      }
      return $http.get(api).success(function(data) {
        return Comment.getCb(data);
      });
    },
    getCb: function(data) {
      return $scope.$broadcast("getcommentCb", data);
    }
  };
  return Comment.init();
});

// Generated by CoffeeScript 1.7.1
Mifan.controller("squareCtrl", function($scope) {
  return $scope.$on("$viewContentLoaded", function() {
    return $scope.$emit("pageChange", "square");
  });
});

// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("userCtrl", function($scope, $timeout, $http, $routeParams, $location) {
  var follow, legalFeedTypes, user, userid;
  userid = $routeParams.id;
  $scope.myself = $scope.UID === userid;
  $scope.$on("$viewContentLoaded", function() {
    return $scope.$emit("pageChange", "user");
  });
  legalFeedTypes = ["ask", "answer", "love"];
  $scope.feedType = "ask";
  $scope.ta = "TA";
  $scope.loadingMore = function() {
    return $scope.isLoading = true;
  };
  $scope.switchFeed = function(type) {
    type = type || "ask";
    $scope.feedType = type;
    return $scope.isLoading = false;
  };
  $scope.profile = null;
  user = {
    init: function() {
      user.getMyAsk();
      $timeout(user.getMyAnswer, 500);
      $scope.myAskMsg = $scope.myAnswerMsg = $scope.myLoveMsg = "";
      $scope.myAsk = $scope.myAnswer = $scope.myLove = [];
      $scope.myAskMore = $scope.myAnswerMore = $scope.myLoveMore = false;
      $scope.$on("getUserInfoCb", function(event, data) {
        return user.getUserInfoCb(data);
      });
      return $timeout(user.getUserInfo, 100);
    },
    getMyAsk: function() {
      var api;
      api = "" + API.myask + $scope.privacyParamDir;
      if (IsDebug) {
        api = API.myask;
      }
      return $http.get(api).success(user.getMyAskCb);
    },
    getMyAskCb: function(data) {
      if (String(data.msg) === "ok") {
        return $scope.myAsk = data.result || [];
      } else {
        return $scope.myAskMsg = data.msg;
      }
    },
    getMyAnswer: function() {
      var api;
      api = "" + API.myanswer + $scope.privacyParamDir;
      if (IsDebug) {
        api = API.myanswer;
      }
      return $http.get(api).success(user.getMyAnswerCb);
    },
    getMyAnswerCb: function(data) {
      if (String(data.msg) === "ok") {
        return $scope.myAnswer = data.result || [];
      } else {
        return $scope.myAnswerMsg = data.msg;
      }
    },
    getUserInfo: function() {
      return $scope.$emit("getUserInfo", {
        uid: userid
      });
    },
    getUserInfoCb: function(data) {
      var msg, result, ret;
      msg = data.msg, ret = data.ret, result = data.result;
      if (String(ret) === "100000") {
        $scope.profile = result;
        $scope.iffollow = result.iffollow;
        follow.setFollowBtn(result.iffollow);
        if (!$scope.myself) {
          switch ("" + result.sex) {
            case "1":
              return $scope.ta = "他";
            case "2":
              return $scope.ta = "她";
          }
        } else {
          return $scope.ta = "我";
        }
      }
    }
  };
  user.init();
  $scope.askHim = function() {
    return $scope.showAskBox = !$scope.showAskBox;
  };
  $scope.isFollowSending = false;
  follow = {
    init: function() {
      $scope.follow = follow.follow;
      $scope.unfollow = follow.unfollow;
      $scope.$on("followCb", function(event, data) {
        return follow.onFollowCb(data);
      });
      $scope.$on("unfollowCb", function(event, data) {
        return follow.onUnfollowCb(data);
      });
      return $scope.followFn = function() {
        switch (Number($scope.iffollow)) {
          case 0:
            return follow.follow();
          case 1:
            return follow.unfollow();
          case 2:
            return follow.unfollow();
        }
      };
    },
    follow: function() {
      $scope.isFollowSending = true;
      return $scope.$emit("follow", {
        userid: userid
      });
    },
    unfollow: function() {
      $scope.isFollowSending = true;
      return $scope.$emit("unfollow", {
        userid: userid
      });
    },
    onFollowCb: function(data) {
      var msg, result, ret, toastType;
      msg = data.msg, ret = data.ret, result = data.result;
      toastType = "";
      if (msg === "ok") {
        msg = "关注成功!";
      }
      if (String(ret) === "100000") {
        $scope.iffollow = result;
        follow.setFollowBtn(result);
        $scope.profile.count_followed = $scope.profile.count_followed - 0 + 1;
        $scope.user.count_follow = $scope.user.count_follow - 0 + 1;
      } else {
        toastType = "warn";
      }
      $scope.toast(msg, toastType);
      return $scope.isFollowSending = false;
    },
    onUnfollowCb: function(data) {
      var msg, result, ret, toastType;
      msg = data.msg, ret = data.ret, result = data.result;
      toastType = "";
      if (msg === "ok") {
        msg = "取消关注成功!";
      }
      if (String(ret) === "100000") {
        $scope.iffollow = result;
        follow.setFollowBtn(result);
        $scope.profile.count_followed -= 1;
        $scope.user.count_follow -= 1;
      } else {
        toastType = "warn";
      }
      $scope.toast(msg, toastType);
      return $scope.isFollowSending = false;
    },
    setFollowBtn: function(iffollow) {
      var followBtn;
      iffollow = iffollow || 0;
      followBtn = {};
      switch (Number(iffollow)) {
        case 0:
          followBtn = {
            txt: "",
            cls: "success"
          };
          break;
        case 1:
          followBtn = {
            txt: "取消",
            cls: "warning"
          };
          break;
        case 2:
          followBtn = {
            txt: "互相",
            cls: "warning"
          };
      }
      followBtn.txt += "关注";
      return $scope.followBtn = followBtn;
    }
  };
  return follow.init();
});

// Generated by CoffeeScript 1.7.1
Mifan.controller("userAskCtrl", function($scope, $timeout, $http, $debug, $routeParams) {
  var userid;
  $scope.quesContent = "";
  userid = $routeParams.id;
  $scope.send = function() {
    $scope.isSending = true;
    return $scope.askQues({
      content: $scope.quesContent,
      foruser: userid
    });
  };
  $scope.$on("onAskQuesSuccess", function(event, msg) {
    $scope.quesContent = "";
    $scope.isSending = false;
    $scope.isSendSucs = true;
    $timeout(function() {
      return $scope.isSendSucs = $scope.showAskBox = false;
    }, 1000);
    return $scope.toast("提问成功！");
  });
  return $scope.$on("onAskQuesFail", function(event, msg) {
    $scope.toast(msg.msg);
    $scope.isSending = false;
    return $timeout(function() {
      return $scope.isSendSucs = false;
    }, 1000);
  });
});

// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("welcomeCtrl", [
  "$scope", function($scope) {
    $scope.$on("$viewContentLoaded", function() {
      return $scope.$emit("pageChange", "welcome");
    });
    $scope.$watch("email + password", function() {
      return $scope.isLoginValid = $scope.email && $scope.password;
    });
    $scope.isLoginBox = false;
    $scope.isLoging = false;
    $scope.isReging = false;
    $scope.toggleLogin = function() {
      return $scope.isLoginBox = !$scope.isLoginBox;
    };
    $scope.loginSubmit = function() {
      return $scope.isLoging = true;
    };
    $scope.regSubmit = function() {
      return $scope.isReging = true;
    };
    return false;
  }
]);
