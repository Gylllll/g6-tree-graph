! function (a) {
    "use strict";
    if ("function" == typeof bootstrap) bootstrap("promise", a);
    else if ("object" == typeof exports && "object" == typeof module) module.exports = a();
    else if ("function" == typeof define && define.amd) define(a);
    else if ("undefined" != typeof ses) {
        if (!ses.ok()) return;
        ses.makeQ = a
    } else {
        if ("undefined" == typeof window && "undefined" == typeof self) throw new Error("This environment was not anticipated by Q. Please file a bug.");
        var b = "undefined" != typeof window ? window : self,
            c = b.Q;
        b.Q = a(), b.Q.noConflict = function () {
            return b.Q = c, this
        }
    }
}(function () {
    "use strict";

    function a(a) {
        return function () {
            return W.apply(a, arguments)
        }
    }

    function b(a) {
        return a === Object(a)
    }

    function c(a) {
        return "[object StopIteration]" === ca(a) || a instanceof S
    }

    function d(a, b) {
        if (P && b.stack && "object" == typeof a && null !== a && a.stack && -1 === a.stack.indexOf(da)) {
            for (var c = [], d = b; d; d = d.source) d.stack && c.unshift(d.stack);
            c.unshift(a.stack);
            var f = c.join("\n" + da + "\n");
            a.stack = e(f)
        }
    }

    function e(a) {
        for (var b = a.split("\n"), c = [], d = 0; d < b.length; ++d) {
            var e = b[d];
            h(e) || f(e) || !e || c.push(e)
        }
        return c.join("\n")
    }

    function f(a) {
        return -1 !== a.indexOf("(module.js:") || -1 !== a.indexOf("(node.js:")
    }

    function g(a) {
        var b = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(a);
        if (b) return [b[1], Number(b[2])];
        var c = /at ([^ ]+):(\d+):(?:\d+)$/.exec(a);
        if (c) return [c[1], Number(c[2])];
        var d = /.*@(.+):(\d+)$/.exec(a);
        return d ? [d[1], Number(d[2])] : void 0
    }

    function h(a) {
        var b = g(a);
        if (!b) return !1;
        var c = b[0],
            d = b[1];
        return c === R && d >= T && ia >= d
    }

    function i() {
        if (P) try {
            throw new Error
        } catch (a) {
            var b = a.stack.split("\n"),
                c = b[0].indexOf("@") > 0 ? b[1] : b[2],
                d = g(c);
            if (!d) return;
            return R = d[0], d[1]
        }
    }

    function j(a, b, c) {
        return function () {
            return "undefined" != typeof console && "function" == typeof console.warn && console.warn(b + " is deprecated, use " + c + " instead.", new Error("").stack), a.apply(a, arguments)
        }
    }

    function k(a) {
        return a instanceof o ? a : s(a) ? B(a) : A(a)
    }

    function l() {
        function a(a) {
            b = a, f.source = a, Y(c, function (b, c) {
                k.nextTick(function () {
                    a.promiseDispatch.apply(a, c)
                })
            }, void 0), c = void 0, d = void 0
        }

        var b, c = [],
            d = [],
            e = _(l.prototype),
            f = _(o.prototype);
        if (f.promiseDispatch = function (a, e, f) {
                var g = X(arguments);
                c ? (c.push(g), "when" === e && f[1] && d.push(f[1])) : k.nextTick(function () {
                    b.promiseDispatch.apply(b, g)
                })
            }, f.valueOf = function () {
                if (c) return f;
                var a = q(b);
                return r(a) && (b = a), a
            }, f.inspect = function () {
                return b ? b.inspect() : {
                    state: "pending"
                }
            }, k.longStackSupport && P) try {
            throw new Error
        } catch (g) {
            f.stack = g.stack.substring(g.stack.indexOf("\n") + 1)
        }
        return e.promise = f, e.resolve = function (c) {
            b || a(k(c))
        }, e.fulfill = function (c) {
            b || a(A(c))
        }, e.reject = function (c) {
            b || a(z(c))
        }, e.notify = function (a) {
            b || Y(d, function (b, c) {
                k.nextTick(function () {
                    c(a)
                })
            }, void 0)
        }, e
    }

    function m(a) {
        if ("function" != typeof a) throw new TypeError("resolver must be a function.");
        var b = l();
        try {
            a(b.resolve, b.reject, b.notify)
        } catch (c) {
            b.reject(c)
        }
        return b.promise
    }

    function n(a) {
        return m(function (b, c) {
            for (var d = 0, e = a.length; e > d; d++) k(a[d]).then(b, c)
        })
    }

    function o(a, b, c) {
        void 0 === b && (b = function (a) {
            return z(new Error("Promise does not support operation: " + a))
        }), void 0 === c && (c = function () {
            return {
                state: "unknown"
            }
        });
        var d = _(o.prototype);
        if (d.promiseDispatch = function (c, e, f) {
                var g;
                try {
                    g = a[e] ? a[e].apply(d, f) : b.call(d, e, f)
                } catch (h) {
                    g = z(h)
                }
                c && c(g)
            }, d.inspect = c, c) {
            var e = c();
            "rejected" === e.state && (d.exception = e.reason), d.valueOf = function () {
                var a = c();
                return "pending" === a.state || "rejected" === a.state ? d : a.value
            }
        }
        return d
    }

    function p(a, b, c, d) {
        return k(a).then(b, c, d)
    }

    function q(a) {
        if (r(a)) {
            var b = a.inspect();
            if ("fulfilled" === b.state) return b.value
        }
        return a
    }

    function r(a) {
        return a instanceof o
    }

    function s(a) {
        return b(a) && "function" == typeof a.then
    }

    function t(a) {
        return r(a) && "pending" === a.inspect().state
    }

    function u(a) {
        return !r(a) || "fulfilled" === a.inspect().state
    }

    function v(a) {
        return r(a) && "rejected" === a.inspect().state
    }

    function w() {
        ea.length = 0, fa.length = 0, ha || (ha = !0)
    }

    function x(a, b) {
        ha && ("object" == typeof process && "function" == typeof process.emit && k.nextTick.runAfter(function () {
            -1 !== Z(fa, a) && (process.emit("unhandledRejection", b, a), ga.push(a))
        }), fa.push(a), b && "undefined" != typeof b.stack ? ea.push(b.stack) : ea.push("(no stack) " + b))
    }

    function y(a) {
        if (ha) {
            var b = Z(fa, a); -
            1 !== b && ("object" == typeof process && "function" == typeof process.emit && k.nextTick.runAfter(function () {
                var c = Z(ga, a); -
                1 !== c && (process.emit("rejectionHandled", ea[b], a), ga.splice(c, 1))
            }), fa.splice(b, 1), ea.splice(b, 1))
        }
    }

    function z(a) {
        var b = o({
            when: function (b) {
                return b && y(this), b ? b(a) : this
            }
        }, function () {
            return this
        }, function () {
            return {
                state: "rejected",
                reason: a
            }
        });
        return x(b, a), b
    }

    function A(a) {
        return o({
            when: function () {
                return a
            },
            get: function (b) {
                return a[b]
            },
            set: function (b, c) {
                a[b] = c
            },
            "delete": function (b) {
                delete a[b]
            },
            post: function (b, c) {
                return null === b || void 0 === b ? a.apply(void 0, c) : a[b].apply(a, c)
            },
            apply: function (b, c) {
                return a.apply(b, c)
            },
            keys: function () {
                return ba(a)
            }
        }, void 0, function () {
            return {
                state: "fulfilled",
                value: a
            }
        })
    }

    function B(a) {
        var b = l();
        return k.nextTick(function () {
            try {
                a.then(b.resolve, b.reject, b.notify)
            } catch (c) {
                b.reject(c)
            }
        }), b.promise
    }

    function C(a) {
        return o({
            isDef: function () {}
        }, function (b, c) {
            return I(a, b, c)
        }, function () {
            return k(a).inspect()
        })
    }

    function D(a, b, c) {
        return k(a).spread(b, c)
    }

    function E(a) {
        return function () {
            function b(a, b) {
                var g;
                if ("undefined" == typeof StopIteration) {
                    try {
                        g = d[a](b)
                    } catch (h) {
                        return z(h)
                    }
                    return g.done ? k(g.value) : p(g.value, e, f)
                }
                try {
                    g = d[a](b)
                } catch (h) {
                    return c(h) ? k(h.value) : z(h)
                }
                return p(g, e, f)
            }

            var d = a.apply(this, arguments),
                e = b.bind(b, "next"),
                f = b.bind(b, "throw");
            return e()
        }
    }

    function F(a) {
        k.done(k.async(a)())
    }

    function G(a) {
        throw new S(a)
    }

    function H(a) {
        return function () {
            return D([this, J(arguments)], function (b, c) {
                return a.apply(b, c)
            })
        }
    }

    function I(a, b, c) {
        return k(a).dispatch(b, c)
    }

    function J(a) {
        return p(a, function (a) {
            var b = 0,
                c = l();
            return Y(a, function (d, e, f) {
                var g;
                r(e) && "fulfilled" === (g = e.inspect()).state ? a[f] = g.value : (++b, p(e, function (d) {
                    a[f] = d, 0 === --b && c.resolve(a)
                }, c.reject, function (a) {
                    c.notify({
                        index: f,
                        value: a
                    })
                }))
            }, void 0), 0 === b && c.resolve(a), c.promise
        })
    }

    function K(a) {
        if (0 === a.length) return k.resolve();
        var b = k.defer(),
            c = 0;
        return Y(a, function (d, e, f) {
            function g(a) {
                b.resolve(a)
            }

            function h(a) {
                c--, 0 === c && (a.message = "Q can't get fulfillment value from any promise, all promises were rejected. Last error message: " + a.message, b.reject(a))
            }

            function i(a) {
                b.notify({
                    index: f,
                    value: a
                })
            }

            var j = a[f];
            c++, p(j, g, h, i)
        }, void 0), b.promise
    }

    function L(a) {
        return p(a, function (a) {
            return a = $(a, k), p(J($(a, function (a) {
                return p(a, U, U)
            })), function () {
                return a
            })
        })
    }

    function M(a) {
        return k(a).allSettled()
    }

    function N(a, b) {
        return k(a).then(void 0, void 0, b)
    }

    function O(a, b) {
        return k(a).nodeify(b)
    }

    var P = !1;
    try {
        throw new Error
    } catch (Q) {
        P = !!Q.stack
    }
    var R, S, T = i(),
        U = function () {},
        V = function () {
            function a() {
                for (var a, d; c.next;) c = c.next, a = c.task, c.task = void 0, d = c.domain, d && (c.domain = void 0, d.enter()), b(a, d);
                for (; h.length;) a = h.pop(), b(a);
                e = !1
            }

            function b(b, c) {
                try {
                    b()
                } catch (d) {
                    if (g) throw c && c.exit(), setTimeout(a, 0), c && c.enter(), d;
                    setTimeout(function () {
                        throw d
                    }, 0)
                }
                c && c.exit()
            }

            var c = {
                    task: void 0,
                    next: null
                },
                d = c,
                e = !1,
                f = void 0,
                g = !1,
                h = [];
            if (V = function (a) {
                    d = d.next = {
                        task: a,
                        domain: g && process.domain,
                        next: null
                    }, e || (e = !0, f())
                }, "object" == typeof process && "[object process]" === process.toString() && process.nextTick) g = !0, f = function () {
                process.nextTick(a)
            };
            else if ("function" == typeof setImmediate) f = "undefined" != typeof window ? setImmediate.bind(window, a) : function () {
                setImmediate(a)
            };
            else if ("undefined" != typeof MessageChannel) {
                var i = new MessageChannel;
                i.port1.onmessage = function () {
                    f = j, i.port1.onmessage = a, a()
                };
                var j = function () {
                    i.port2.postMessage(0)
                };
                f = function () {
                    setTimeout(a, 0), j()
                }
            } else f = function () {
                setTimeout(a, 0)
            };
            return V.runAfter = function (a) {
                h.push(a), e || (e = !0, f())
            }, V
        }(),
        W = Function.call,
        X = a(Array.prototype.slice),
        Y = a(Array.prototype.reduce || function (a, b) {
            var c = 0,
                d = this.length;
            if (1 === arguments.length)
                for (;;) {
                    if (c in this) {
                        b = this[c++];
                        break
                    }
                    if (++c >= d) throw new TypeError
                }
            for (; d > c; c++) c in this && (b = a(b, this[c], c));
            return b
        }),
        Z = a(Array.prototype.indexOf || function (a) {
            for (var b = 0; b < this.length; b++)
                if (this[b] === a) return b;
            return -1
        }),
        $ = a(Array.prototype.map || function (a, b) {
            var c = this,
                d = [];
            return Y(c, function (e, f, g) {
                d.push(a.call(b, f, g, c))
            }, void 0), d
        }),
        _ = Object.create || function (a) {
            function b() {}

            return b.prototype = a, new b
        },
        aa = a(Object.prototype.hasOwnProperty),
        ba = Object.keys || function (a) {
            var b = [];
            for (var c in a) aa(a, c) && b.push(c);
            return b
        },
        ca = a(Object.prototype.toString);
    S = "undefined" != typeof ReturnValue ? ReturnValue : function (a) {
        this.value = a
    };
    var da = "From previous event:";
    k.resolve = k, k.nextTick = V, k.longStackSupport = !1, "object" == typeof process && process && process.env && process.env.Q_DEBUG && (k.longStackSupport = !0), k.defer = l, l.prototype.makeNodeResolver = function () {
        var a = this;
        return function (b, c) {
            b ? a.reject(b) : arguments.length > 2 ? a.resolve(X(arguments, 1)) : a.resolve(c)
        }
    }, k.Promise = m, k.promise = m, m.race = n, m.all = J, m.reject = z, m.resolve = k, k.passByCopy = function (a) {
        return a
    }, o.prototype.passByCopy = function () {
        return this
    }, k.join = function (a, b) {
        return k(a).join(b)
    }, o.prototype.join = function (a) {
        return k([this, a]).spread(function (a, b) {
            if (a === b) return a;
            throw new Error("Q can't join: not the same: " + a + " " + b)
        })
    }, k.race = n, o.prototype.race = function () {
        return this.then(k.race)
    }, k.makePromise = o, o.prototype.toString = function () {
        return "[object Promise]"
    }, o.prototype.then = function (a, b, c) {
        function e(b) {
            try {
                return "function" == typeof a ? a(b) : b
            } catch (c) {
                return z(c)
            }
        }

        function f(a) {
            if ("function" == typeof b) {
                d(a, h);
                try {
                    return b(a)
                } catch (c) {
                    return z(c)
                }
            }
            return z(a)
        }

        function g(a) {
            return "function" == typeof c ? c(a) : a
        }

        var h = this,
            i = l(),
            j = !1;
        return k.nextTick(function () {
            h.promiseDispatch(function (a) {
                j || (j = !0, i.resolve(e(a)))
            }, "when", [function (a) {
                j || (j = !0, i.resolve(f(a)))
            }])
        }), h.promiseDispatch(void 0, "when", [void 0, function (a) {
            var b, c = !1;
            try {
                b = g(a)
            } catch (d) {
                if (c = !0, !k.onerror) throw d;
                k.onerror(d)
            }
            c || i.notify(b)
        }]), i.promise
    }, k.tap = function (a, b) {
        return k(a).tap(b)
    }, o.prototype.tap = function (a) {
        return a = k(a), this.then(function (b) {
            return a.fcall(b).thenResolve(b)
        })
    }, k.when = p, o.prototype.thenResolve = function (a) {
        return this.then(function () {
            return a
        })
    }, k.thenResolve = function (a, b) {
        return k(a).thenResolve(b)
    }, o.prototype.thenReject = function (a) {
        return this.then(function () {
            throw a
        })
    }, k.thenReject = function (a, b) {
        return k(a).thenReject(b)
    }, k.nearer = q, k.isPromise = r, k.isPromiseAlike = s, k.isPending = t, o.prototype.isPending = function () {
        return "pending" === this.inspect().state
    }, k.isFulfilled = u, o.prototype.isFulfilled = function () {
        return "fulfilled" === this.inspect().state
    }, k.isRejected = v, o.prototype.isRejected = function () {
        return "rejected" === this.inspect().state
    };
    var ea = [],
        fa = [],
        ga = [],
        ha = !0;
    k.resetUnhandledRejections = w, k.getUnhandledReasons = function () {
        return ea.slice()
    }, k.stopUnhandledRejectionTracking = function () {
        w(), ha = !1
    }, w(), k.reject = z, k.fulfill = A, k.master = C, k.spread = D, o.prototype.spread = function (a, b) {
        return this.all().then(function (b) {
            return a.apply(void 0, b)
        }, b)
    }, k.async = E, k.spawn = F, k["return"] = G, k.promised = H, k.dispatch = I, o.prototype.dispatch = function (a, b) {
        var c = this,
            d = l();
        return k.nextTick(function () {
            c.promiseDispatch(d.resolve, a, b)
        }), d.promise
    }, k.get = function (a, b) {
        return k(a).dispatch("get", [b])
    }, o.prototype.get = function (a) {
        return this.dispatch("get", [a])
    }, k.set = function (a, b, c) {
        return k(a).dispatch("set", [b, c])
    }, o.prototype.set = function (a, b) {
        return this.dispatch("set", [a, b])
    }, k.del = k["delete"] = function (a, b) {
        return k(a).dispatch("delete", [b])
    }, o.prototype.del = o.prototype["delete"] = function (a) {
        return this.dispatch("delete", [a])
    }, k.mapply = k.post = function (a, b, c) {
        return k(a).dispatch("post", [b, c])
    }, o.prototype.mapply = o.prototype.post = function (a, b) {
        return this.dispatch("post", [a, b])
    }, k.send = k.mcall = k.invoke = function (a, b) {
        return k(a).dispatch("post", [b, X(arguments, 2)])
    }, o.prototype.send = o.prototype.mcall = o.prototype.invoke = function (a) {
        return this.dispatch("post", [a, X(arguments, 1)])
    }, k.fapply = function (a, b) {
        return k(a).dispatch("apply", [void 0, b])
    }, o.prototype.fapply = function (a) {
        return this.dispatch("apply", [void 0, a])
    }, k["try"] = k.fcall = function (a) {
        return k(a).dispatch("apply", [void 0, X(arguments, 1)])
    }, o.prototype.fcall = function () {
        return this.dispatch("apply", [void 0, X(arguments)])
    }, k.fbind = function (a) {
        var b = k(a),
            c = X(arguments, 1);
        return function () {
            return b.dispatch("apply", [this, c.concat(X(arguments))])
        }
    }, o.prototype.fbind = function () {
        var a = this,
            b = X(arguments);
        return function () {
            return a.dispatch("apply", [this, b.concat(X(arguments))])
        }
    }, k.keys = function (a) {
        return k(a).dispatch("keys", [])
    }, o.prototype.keys = function () {
        return this.dispatch("keys", [])
    }, k.all = J, o.prototype.all = function () {
        return J(this)
    }, k.any = K, o.prototype.any = function () {
        return K(this)
    }, k.allResolved = j(L, "allResolved", "allSettled"), o.prototype.allResolved = function () {
        return L(this)
    }, k.allSettled = M, o.prototype.allSettled = function () {
        return this.then(function (a) {
            return J($(a, function (a) {
                function b() {
                    return a.inspect()
                }

                return a = k(a), a.then(b, b)
            }))
        })
    }, k.fail = k["catch"] = function (a, b) {
        return k(a).then(void 0, b)
    }, o.prototype.fail = o.prototype["catch"] = function (a) {
        return this.then(void 0, a)
    }, k.progress = N, o.prototype.progress = function (a) {
        return this.then(void 0, void 0, a)
    }, k.fin = k["finally"] = function (a, b) {
        return k(a)["finally"](b)
    }, o.prototype.fin = o.prototype["finally"] = function (a) {
        if (!a || "function" != typeof a.apply) throw new Error("Q can't apply finally callback");
        return a = k(a), this.then(function (b) {
            return a.fcall().then(function () {
                return b
            })
        }, function (b) {
            return a.fcall().then(function () {
                throw b
            })
        })
    }, k.done = function (a, b, c, d) {
        return k(a).done(b, c, d)
    }, o.prototype.done = function (a, b, c) {
        var e = function (a) {
                k.nextTick(function () {
                    if (d(a, f), !k.onerror) throw a;
                    k.onerror(a)
                })
            },
            f = a || b || c ? this.then(a, b, c) : this;
        "object" == typeof process && process && process.domain && (e = process.domain.bind(e)), f.then(void 0, e)
    }, k.timeout = function (a, b, c) {
        return k(a).timeout(b, c)
    }, o.prototype.timeout = function (a, b) {
        var c = l(),
            d = setTimeout(function () {
                b && "string" != typeof b || (b = new Error(b || "Timed out after " + a + " ms"), b.code = "ETIMEDOUT"), c.reject(b)
            }, a);
        return this.then(function (a) {
            clearTimeout(d), c.resolve(a)
        }, function (a) {
            clearTimeout(d), c.reject(a)
        }, c.notify), c.promise
    }, k.delay = function (a, b) {
        return void 0 === b && (b = a, a = void 0), k(a).delay(b)
    }, o.prototype.delay = function (a) {
        return this.then(function (b) {
            var c = l();
            return setTimeout(function () {
                c.resolve(b)
            }, a), c.promise
        })
    }, k.nfapply = function (a, b) {
        return k(a).nfapply(b)
    }, o.prototype.nfapply = function (a) {
        var b = l(),
            c = X(a);
        return c.push(b.makeNodeResolver()), this.fapply(c).fail(b.reject), b.promise
    }, k.nfcall = function (a) {
        var b = X(arguments, 1);
        return k(a).nfapply(b)
    }, o.prototype.nfcall = function () {
        var a = X(arguments),
            b = l();
        return a.push(b.makeNodeResolver()), this.fapply(a).fail(b.reject), b.promise
    }, k.nfbind = k.denodeify = function (a) {
        if (void 0 === a) throw new Error("Q can't wrap an undefined function");
        var b = X(arguments, 1);
        return function () {
            var c = b.concat(X(arguments)),
                d = l();
            return c.push(d.makeNodeResolver()), k(a).fapply(c).fail(d.reject), d.promise
        }
    }, o.prototype.nfbind = o.prototype.denodeify = function () {
        var a = X(arguments);
        return a.unshift(this), k.denodeify.apply(void 0, a)
    }, k.nbind = function (a, b) {
        var c = X(arguments, 2);
        return function () {
            function d() {
                return a.apply(b, arguments)
            }

            var e = c.concat(X(arguments)),
                f = l();
            return e.push(f.makeNodeResolver()), k(d).fapply(e).fail(f.reject), f.promise
        }
    }, o.prototype.nbind = function () {
        var a = X(arguments, 0);
        return a.unshift(this), k.nbind.apply(void 0, a)
    }, k.nmapply = k.npost = function (a, b, c) {
        return k(a).npost(b, c)
    }, o.prototype.nmapply = o.prototype.npost = function (a, b) {
        var c = X(b || []),
            d = l();
        return c.push(d.makeNodeResolver()), this.dispatch("post", [a, c]).fail(d.reject), d.promise
    }, k.nsend = k.nmcall = k.ninvoke = function (a, b) {
        var c = X(arguments, 2),
            d = l();
        return c.push(d.makeNodeResolver()), k(a).dispatch("post", [b, c]).fail(d.reject), d.promise
    }, o.prototype.nsend = o.prototype.nmcall = o.prototype.ninvoke = function (a) {
        var b = X(arguments, 1),
            c = l();
        return b.push(c.makeNodeResolver()), this.dispatch("post", [a, b]).fail(c.reject), c.promise
    }, k.nodeify = O, o.prototype.nodeify = function (a) {
        return a ? void this.then(function (b) {
            k.nextTick(function () {
                a(null, b)
            })
        }, function (b) {
            k.nextTick(function () {
                a(b)
            })
        }) : this
    }, k.noConflict = function () {
        throw new Error("Q.noConflict only works when Q is used as a global")
    };
    var ia = i();
    return k
});

function NativeInterface() {
    if (typeof AndroidInterface != 'undefined') {
        return AndroidInterface;
    } else if (typeof iOSInterface != 'undefined') {
        return iOSInterface;
    } else if (typeof PCInterface != 'undefined') {
        return PCInterface;
    } else if (typeof iOSWKInterface != 'undefined') {
        return iOSWKInterface;
    } else {
        console.log("Native interface not found!");
        return null;
    }
}

function loadJsBridge ()  {
    var helper = {
        init: function() {
            // 添加监听
            if (this.inIframe()) {
                var self = this;
                window.addEventListener("message", function (event) {
                    self.dealWindowEventMessage(event.data);
                }, false);
            }
        },

        dealWindowEventMessage: function(eventData) {
            if (eventData.type === this.TYPE_EVENT_CALLBACK) {
                // 处理事件回调
                this.dealNativeEventCallback(eventData.payload);
            } else if (eventData.type === this.TYPE_METHOD_CALLBACK) {
                // 处理函数回调
                this.dealNativeMethodCallback(eventData.payload);
            } else if (eventData.type === this.TYPE_PAGE_LIFE_CYCLE_CALLBACK) {
                // 处理页面声明周期回调
                dealNativePageLifeCycleCallback(eventData.payload);
            }
        },

        dealNativeEventCallback: function(payload) {
            this.callCurrentWindowEventCallback(payload);
            this.sendMessageToChildIFrame(this.TYPE_EVENT_CALLBACK, payload);
        },

        dealNativeMethodCallback: function(payload) {
            this.callCurrentWindowMethodCallback(payload);
            this.sendMessageToChildIFrame(this.TYPE_METHOD_CALLBACK, payload);
        },

        dealNativePageLifeCycleCallback: function(payload) {
            this.callCurrentWindowLifeCycleCallback(payload);
            this.sendMessageToChildIFrame(this.TYPE_PAGE_LIFE_CYCLE_CALLBACK, payload);
        },

        // 调用当前窗口的回调函数
        callCurrentWindowEventCallback: function(payload) {
            o.listenerInvokeFromNativeInWindow(payload.key, payload.param);
        },

        // 调用当前window的函数回调函数
        callCurrentWindowMethodCallback: function(payload) {
            o.doCurrentWindowCallback(payload.type, payload.callbackId, payload.args);
        },

        // 调用当前window的生命周期回调函数
        callCurrentWindowLifeCycleCallback: function(payload) {
            // TODO 这个下一期和原生一起改
        },

        // 将消息往下层iframe派发
        sendMessageToChildIFrame: function(type, payload) {
            var elements = document.getElementsByTagName('iframe');
            Array.prototype.forEach.call(elements, function(element) {
                element.contentWindow.postMessage({type: type, payload: payload}, '*');
            });
        },

        inIframe: function() {
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        },

        TYPE_EVENT_CALLBACK: 0,
        TYPE_METHOD_CALLBACK: 1,
        TYPE_PAGE_LIFE_CYCLE_CALLBACK: 2,

        INVOKER_STATE_FULLFILLED: 0,
        INVOKER_STATE_REJECTED: 1,
        INVOKER_STATE_PROGRESSING: 2,

        PAGE_LIFE_CYCLE_ON_RESUME: 0,
        PAGE_LIFE_CYCLE_ON_PAUSE: 1,
    };

    var o = {
        versions: function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            var sdkVersion = 'AndoidSDKVersion/';
            return {
                trident: u.indexOf('Trident') > -1,
                presto: u.indexOf('Presto') > -1,
                webKit: u.indexOf('AppleWebKit') > -1,
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                mobile: !!u.match(/AppleWebKit.*Mobile.*/),
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: parseInt(u.substring(u.indexOf(sdkVersion) + sdkVersion.length, u.indexOf(sdkVersion) + sdkVersion.length + 2)) <= 17,
                iPhone: u.indexOf('iPhone') > -1,
                iPad: u.indexOf('iPad') > -1,
            };
        },
        runOnAndroid41: function () {
            return o.versions().android && (NativeInterface() == undefined || NativeInterface() == null);
        },
        useiOSWKWebView: function () {
            return o.versions().ios && typeof iOSWKInterface != 'undefined' && NativeInterface() == iOSWKInterface
        },
        init: function () {
            if (o.runOnAndroid41()) {
                prompt(JSON.stringify({
                    type: 'injectSuccess'
                }));
            } else {
                if (NativeInterface() != null) {
                    NativeInterface().onInjectSuccess();
                }
            }

            if (NativeInterface() != null) {
                var __args = o.__processArgs(null);
                NativeInterface().onBridgeInjectSuccess(JSON.stringify(__args));
            }

            if (o.versions().ios) {
                o.injectConsoleOutput()
            }

            helper.init();
            o.onReadyPromise().then(function () {
                console.log("on ready promise ===== ");
                if (typeof window.bridgeReady === 'function') {
                    window.bridgeReady();
                }
                window.dispatchEvent(new Event('bridgeReady'));
            })
        },
        injectConsoleOutput: function () {
            if (NativeInterface() == undefined) {
                return;
            }

            var origin_console_error = console.error;
            var injectLog = function (type, old_log) {
                return function (message) {
                    try {
                        var path = window.location.pathname;
                        NativeInterface().sendMessageToNative("console", JSON.stringify({
                            type: "console",
                            location: path,
                            method: type,
                            arguments: arguments
                        }));
                    } catch (e) {
                        origin_console_error('save to local fial:' + JSON.stringify(e));
                    }
                    old_log.apply(console, arguments)
                }
            };

            console.error = (function (message) {
                var log = console.error;
                return injectLog('Error', log, arguments)
            })();

            console.info = (function (message) {
                var log = console.info;
                return injectLog('Info', log, arguments)
            })();

            console.log = (function (message) {
                var log = console.log;
                return injectLog('Log', log, arguments)
            })();

            console.trace = (function (message) {
                var log = console.trace;
                return injectLog('Trace', log, arguments)
            })();

            console.warn = (function (message) {
                var log = console.warn;
                return injectLog('Warn', log, arguments)
            })();
        },
        onReadyPromise: function () {
            var deferred = Q.defer();
            var readyState = document.readyState;
            if (readyState == 'interactive' || readyState == 'complete') {
                deferred.resolve();
            } else {
                window.addEventListener('DOMContentLoaded', deferred.resolve);
            }
            return deferred.promise;
        },
        //内部方法，请勿直接调用。若此前有调用该方法，该改为使用 bridge 对象属性调用，具体调用方法如下：
        //http://reference.sdp.nd/appfactory/userguide/react/jssdk/
        callNative: function () {
            console.warn("callNative 即将屏蔽，请勿直接调用。");
            var number_of_params = arguments.length;
            var className = arguments[0];
            var methodName = arguments[1];
            var argLen = number_of_params - 2;
            switch (argLen) {
                case 0:
                    return NativeInterface().invokeMethod(o.getEntryNameFromOldClassName(className), methodName);
                case 1:
                    var args = arguments[2];
                    NativeInterface().printLog('==IcPlayer Player callNative: ' + className + "." + methodName + " arg=" + JSON.stringify(args));
                    args = o.__processArgs(args);
                    var result = NativeInterface().invokeMethod(o.getEntryNameFromOldClassName(className), methodName, JSON.stringify(args));
                    try {
                        var resultObj = JSON.parse(result);
                        return resultObj;
                    } catch (e) {
                        return {};
                    }
                default:
                    console.log("too mach arguments");
                    break;
            }
        },
        //内部方法，请勿直接调用。若此前有调用该方法，改为使用 bridge 对象属性调用，具体调用方法如下：
        //http://reference.sdp.nd/appfactory/userguide/react/jssdk/
        callNativeAsync: function () {
            console.warn("callNativeAsync 即将屏蔽，请勿直接调用。");
            var number_of_params = arguments.length;
            var className = arguments[0];
            var methodName = arguments[1];
            var func = arguments[2];
            var callBack;
            if (typeof func == "function") {
                var callbackId = o.randomkey(5);
                o.callbackMap[callbackId] = {
                    success: func,
                    fail: func
                };
                return NativeInterface().invokeMethodAsync(o.getEntryNameFromOldClassName(className), methodName, callbackId);
            } else {
                var param = func;
                func = arguments[3];
                if (typeof func != "function") {
                    o.log("invalid call back func")
                    return;
                }
                var callbackId = o.randomkey(5);
                o.callbackMap[callbackId] = {
                    success: func,
                    fail: func
                };
                return NativeInterface().invokeMethodAsync(o.getEntryNameFromOldClassName(className), methodName, callbackId, JSON.stringify(o.__processArgs(param)));
            }
        },
        invokeCallExec: function (entry, method, args, callback, isPromise, sync, deferred, options) {
            o.__processDeprecated(entry, method);
            var __args = o.__processArgs(args);
            var __options = o.__processOptions(options);
            if (isPromise) {
                return o.callPromise(entry, method, __args, sync, deferred, __options);
            } else {
                return o.callExec(entry, method, __args, callback, sync, __options);
            }
        },
        callPromise: function (entry, method, args, sync, promise, options) {
            var deferred = promise == undefined ? Q.defer() : promise;
            if (sync && !o.useiOSWKWebView()) {
                var ret = o.exec(entry, method, args, options);
                deferred.resolve(ret);
            } else {
                o.execAsync(entry, method, args, deferred.resolve, deferred.reject, deferred.notify, options);
            }
            return deferred.promise;
        },
        callExec: function (entry, method, args, callback, sync, options) {
            if (sync && !o.useiOSWKWebView()) {
                return o.exec(entry, method, args, options);
            } else {
                if (!callback) {
                    callback = {};
                }
                return o.execAsync(entry, method, args, callback.success, callback.fail, callback.listener, options);
            }
        },
        exec: function (entry, method, args, options) {
            console.log("exec");
            var result;
            o.log('==IcPlayer Player exec: ' + entry + "." + method + " arg=" + JSON.stringify(args));
            if (o.runOnAndroid41()) {
                result = prompt(JSON.stringify({
                    type: 'exec',
                    entry: entry,
                    method: method,
                    args: JSON.stringify(args)
                }));
            } else {
                result = NativeInterface().invokeMethod(entry, method, JSON.stringify(args));
            }

            var finalResult = o.__processResponseObject(result, options);
            o.log('JSSDK exec [' + entry + "." + method + "] response:" + finalResult);

            return finalResult;
        },
        execAsync: function (entry, method, args, success, fail, listener, options) {
            var callbackId = o.randomkey(5);
            var result;
            if (success || fail || listener) {
                o.callbackMap[callbackId] = {
                    success: success,
                    fail: fail,
                    listener: listener,
                    options: options
                };
            }
            if (o.runOnAndroid41()) {
                result = prompt(JSON.stringify({
                    type: 'exec',
                    entry: entry,
                    method: method,
                    args: JSON.stringify(args),
                    callback: callbackId
                }));
            } else {
                result = NativeInterface().invokeMethodAsync(entry, method, JSON.stringify(args), callbackId);
            }
            var finalResult = o.__processResponseObject(result, options);
            return finalResult;
        },
        trigger: function (eventCode, param) {
            if (o.runOnAndroid41()) {
                prompt(JSON.stringify({
                    type: 'trigger_event',
                    code: eventCode,
                    param: JSON.stringify(param)
                }));
            } else {
                NativeInterface().triggerEvent(eventCode, JSON.stringify(param));
            }
        },
        registerListener: function (eventName, func) {
            console.warn("This function is deprecated. Please use Bridge.addListener() to instead.");
            var callBackStruct = o.addListenerFunc(eventName, func, false);
            if (o.runOnAndroid41()) {
                prompt(JSON.stringify({
                    type: 'register_event',
                    eventName: eventName,
                    callback: callBackStruct.evalString
                }));
            } else {
                console.log("registerListener");
                o.log("register event for " + eventName);
                NativeInterface().registerListener(eventName, callBackStruct.evalString);
            }
            return callBackStruct.key;
        },
        unregisterListener: function (eventName, callback) {
            console.warn("This function is deprecated. Please use Bridge.removeListener() to instead.");
            if (o.runOnAndroid41()) {
                prompt(JSON.stringify({
                    type: 'unregister_event',
                    eventName: eventName,
                    callback: callback
                }));
            } else {
                console.log("unregisterListener");
                o.log("unregister event for " + eventName);
                o.removeNativeListenerFunc(eventName, callback);
            }
            o.removeListenerFunc(callback);
        },
        addListener: function (eventName, func, scope) {
            var callBackStruct = o.addListenerFunc(eventName, func, true, scope);
            if (o.runOnAndroid41()) {
                prompt(JSON.stringify({
                    type: 'register_event',
                    eventName: eventName,
                    callback: callBackStruct.evalString
                }));
            } else {
                console.log("addListener");
                o.log("add event for " + eventName);
                NativeInterface().registerListener(eventName, callBackStruct.evalString);
            }
            return callBackStruct.key;
        },
        removeListener: function (eventName, callback) {
            if (o.runOnAndroid41()) {
                prompt(JSON.stringify({
                    type: 'unregister_event',
                    eventName: eventName,
                    callback: callback
                }));
            } else {
                console.log("removeListener");
                o.log("remove event for " + eventName);
                o.removeNativeListenerFunc(eventName, callback);
            }
            o.removeListenerFunc(callback);
        },
        removeNativeListenerFunc: function (eventName, callback) {
            var listenerEvalString = "Bridge.listenerInvokeFromNative('" + callback + "',==param==)";
            NativeInterface().unRegisterListener(eventName, listenerEvalString);
            //兼容registerListener对应的事件。
            var listenerEvalStringOld = "Bridge.listenerInvokeFromNative('" + callback + "','==param==')";
            NativeInterface().unRegisterListener(eventName, listenerEvalStringOld);
        },
        log: function (str) {
            if (o.runOnAndroid41()) {
                prompt(JSON.stringify({
                    type: 'log',
                    message: str
                }));
            } else {
                NativeInterface().printLog(str)
            }
        },
        takePhoto: function () {

        },
        goPage: function (index) {},
        entry: {},
        classEntry: {},
        promiseEntry: {},
        lastInstanceID: null,
        funcMap: {},
        callbackMap: {},
        listenerMap: {},
        listenerMapByEvent: {},
        deprecatedMap: {},
        Options: {
            ConvertResponseObjectKey : "__maf_convert_response_object"
        },
        listenerInvokeFromNative: function (key, param) {
            helper.dealNativeEventCallback({
                key: key,
                param: param,
            });
        },
        listenerInvokeFromNativeInWindow: function(key, param) {
            o.log("param=" + param);
            var func = o.listenerMap[key];
            if (func == undefined) {
                o.log("call back func not found");
                o.listenerMap[key] = null;
                return;
            }
            func.callback(param);
        },
        callBackFromNative: function (key, param) {
            o.log("param=" + param);
            var callbackObject = o.funcMap[key];
            var func = callbackObject.callback;
            if (func == undefined) {
                o.log("call back func not found");
                o.funcMap[key] = null;
                return;
            }
            func.call(callbackObject.scope, param);
            o.funcMap[key] = null;
        },
        addListenerFunc: function (eventName, func, isNewInterface, scope) {
            var key = o.randomkey(10);
            var listenerEvalString = null;
            if (isNewInterface) {
                listenerEvalString = "Bridge.listenerInvokeFromNative('" + key + "',==param==)";
            } else {
                listenerEvalString = "Bridge.listenerInvokeFromNative('" + key + "','==param==')";
            }

            var object = {
                key: key,
                evalString: listenerEvalString,
                callback: func,
                scope: scope == undefined ? window : scope
            }
            o.listenerMap[key] = object;

            return object;
        },
        removeListenerFunc: function (key) {
            if (null === key || typeof key == "undefined") {
                return;
            }
            var func = o.listenerMap[key];
            if (null !== func) {
                o.listenerMap[key] = null;
                delete o.listenerMap[key];
            }
        },
        randomkey: function (l) {
            var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
            var tmp = "";
            var timestamp = new Date().getTime();
            for (var i = 0; i < l; i++) {
                tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
            }
            return timestamp + tmp;
        },
        getEntryNameFromOldClassName: function (className) {
            var classNameArray = className.split(".");
            if (classNameArray.length > 0) {
                return classNameArray[classNameArray.length - 1];
            } else {
                return className;
            }
        },
        callbackSuccess: function (callbackId, args) {
            o.log("call back success ====");
            o.doCallback(helper.INVOKER_STATE_FULLFILLED, callbackId, args);
        },
        callbackFail: function (callbackId, args) {
            o.log("call back fail ====");
            o.doCallback(helper.INVOKER_STATE_REJECTED, callbackId, args);
        },
        callbackListen: function (callbackId, args) {
            o.log("call back listen ====");
            o.doCallback(helper.INVOKER_STATE_PROGRESSING, callbackId, args);
        },

        doCallback: function(type, callbackId, args) {
            helper.dealNativeMethodCallback({
                type: type,
                callbackId: callbackId,
                args: args,
            });
        },

        doCurrentWindowCallback: function (type, callbackId, args) {
            var callBack = o.callbackMap[callbackId];
            if (callBack) {                
                var result = o.__processResponseObject(args, callBack.options);
                if (type == helper.INVOKER_STATE_FULLFILLED) {
                    callBack.success && callBack.success.call(null, result);
                    o.callbackMap[callbackId] = null;
                } else if (type == helper.INVOKER_STATE_REJECTED) {
                    callBack.fail && callBack.fail.call(null, result);
                    o.callbackMap[callbackId] = null;
                } else if (type == helper.INVOKER_STATE_PROGRESSING) {
                    callBack.listener && callBack.listener.call(null, result);
                }
            }
        },
        loadNative: function (type, href) {
            o.exec('apkManager', 'loadApk', args);
        },
        import: function (entryName) {
            var success;
            if (o.runOnAndroid41()) {
                success = prompt(JSON.stringify({
                    type: 'importJsSdk',
                    entry: entryName
                }));
            } else {
                success = NativeInterface().importJsSdk(entryName);
            }

            if (success === 'false') {
                throw new Error('import failed : ' + entryName);
            }
        },
        //该 API 只提供 promise 用法
        apisAvailable: function (param) {
            var deferred = Q.defer();
            if (!param["entries"] || param["entries"].constructor != Array || param["entries"].length == 0) {
                throw new Error("apisAvailable check failed: entries is not available");
            }
            if (o.useiOSWKWebView()) {
                var asyncWrapper = new WKAsyncWrapper();
                asyncWrapper.returnStringCallBack = function (resString) {
                    deferred.resolve(JSON.parse(resString));
                };
                asyncWrapper.apisAvailable(JSON.stringify(param));
            } else {
                var resString = NativeInterface().apisAvailable(JSON.stringify(param));
                deferred.resolve(JSON.parse(resString));
            }
            return deferred.promise;
        },
        require: function (entryName) {
            if (o.entry[entryName]) {
                return o.entry[entryName];
            } else if (o.classEntry[entryName]) {
                return o.classEntry[entryName];
            }

            if (o.useiOSWKWebView()) {
                var wrapper = new WKRequireWrapper()
                wrapper.requireName = entryName
                return wrapper
            }

            var jsEntry;
            if (o.runOnAndroid41()) {
                jsEntry = prompt(JSON.stringify({
                    type: 'require',
                    entry: entryName
                }));
            } else {
                jsEntry = NativeInterface().require(entryName);
            }

            if (jsEntry.length > 0) {
                eval(jsEntry);
                o.__processDeprecated(entryName);
                if (o.entry[entryName]) {
                    return o.entry[entryName];
                } else if (o.classEntry[entryName]) {
                    return o.classEntry[entryName];
                }
            } else {
                o.log(entryName + " not found !");
            }
        },
        newInstance: function (param) {
            var jsEntry;

            if (o.runOnAndroid41()) {
                jsEntry = prompt(JSON.stringify({
                    type: 'newInstance',
                    params: JSON.stringify(param)
                }));
            } else if (o.useiOSWKWebView()) {
                var wrapper = new WKRequireWrapper()
                wrapper.isObject = false
                wrapper.classParam = param
                return wrapper
            } else {
                jsEntry = NativeInterface().newInstance(JSON.stringify(param));
            }

            eval(jsEntry);
            var lastInstanceID = Bridge.lastInstanceID;
            var object = Bridge.entry[lastInstanceID];
            Bridge.lastInstanceID = null;
            return object;
        },
        deleteInstance: function (entry) {
            var jsString;

            if (o.runOnAndroid41()) {
                jsString = prompt(JSON.stringify({
                    type: 'deleteInstance',
                    entryName: entry
                }));
            } else {
                jsString = NativeInterface().deleteInstance(entry);
            }

            eval(jsString);
        },
        sendMessageToNative: function (bizCode, param) {
            var __args = o.__processArgs(param);
            console.log("NativeInterface sendMessageToNative: code = " + bizCode, +"param = " + param);
            if (o.runOnAndroid41()) {
                prompt(JSON.stringify({
                    type: 'sendMessageToNative',
                    eventName: bizCode,
                    callback: JSON.stringify(__args)
                }));
            } else {
                console.log("addListener");
                NativeInterface().sendMessageToNative(bizCode, JSON.stringify(__args)); // Android Only: allow js send param to Native
            }
        },
        __processArgs: function (args) {

            var __args = args;
            if (null === __args || typeof __args == "undefined") {
                __args = {};
            }

            if ("object" == typeof __args && !__args.hasOwnProperty("_maf_url")) {
                __args["_maf_url"] = window.location.href;
            }
            return __args;
        },
        __processDeprecated: function (entryName, method) {
            if (null === entryName || typeof entryName == "undefined") {
                return;
            }

            var deprecated = o.deprecatedMap[entryName];
            if (null === deprecated || typeof deprecated == "undefined") {
                return;
            }

            var isClassDeprecated = true;
            var deprecatedObject = deprecated["*"];
            if (null === deprecatedObject || typeof deprecatedObject == "undefined") {
                deprecatedObject = deprecated[method];
                isClassDeprecated = false;
            }

            if (null === deprecatedObject || typeof deprecatedObject == "undefined") {
                return;
            }

            var deprecatedVersion = deprecatedObject["version"];
            var deprecatedMessage = deprecatedObject["message"];

            var warningString = (isClassDeprecated ? ("Class " + entryName) : ("Method " + entryName + ":" + method)) + " deprecated";
            if (deprecatedVersion) {
                warningString = warningString + " at " + deprecatedVersion;
            }
            if (deprecatedMessage) {
                warningString = warningString + ", " + deprecatedMessage;
            }
            o.log(warningString);
            console.warn(warningString);
        },
        __processOptions: function (origin) {
            var __options = origin
            if (null === __options || typeof __options == "undefined") {
                __options = {};
            }

            if ("object" == typeof __options && !__options.hasOwnProperty(o.Options.ConvertResponseObjectKey)) {
                __options[o.Options.ConvertResponseObjectKey] = true;
            }
            return __options;
        },
        __processResponseObject: function (origin, options) {
            var finalResult = origin;
            var convertResponseObjectValue = options[o.Options.ConvertResponseObjectKey]
            if (null !== convertResponseObjectValue && convertResponseObjectValue) {
                try {
                    finalResult = JSON.parse(origin);
                } catch (e) {
                    finalResult = origin;
                }
            }
            return finalResult;
        },
        //该方法提供给外面Override
        __isTakeKeyBack: function () {
            return false;
        },

        //该方法给Webview使用，外面不要Override
        __isJsTakeKeyBack: function () {
            var isTake = o.__isTakeKeyBack();
            if (isTake) {
                console.warn("返回键现在由Js处理！");
            } else {
                console.log("返回键仍然由Webview处理！");
            }
            //传值回Webview
            var appFactory = o.require('sdp.appfactory');
            appFactory.isJsTakeKeyBack({
                "isJsTakeKeyBack": isTake
            });
        }
    }
    return o;
};

! function (a) {
    a();
}(function() {
    console.warn("Use JsBridge by online! Please migrate to the new resolution. Visit: http://reference.doc.101.com/appfactory/design/design/client/jssdk-import-optmize-solution/jssdk-import-optmize-solution.html");
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf('SmartCanWebView') < 0) {
        console.error("Not running on SmartCanWebView, it should not be right. A best practice can be referenced, visit: http://reference.doc.101.com/appfactory/userguide/light/h5/use-js-sdk.html");
        return;
    }

    window.Bridge = loadJsBridge();
    window.Bridge.init();
    window.Bridge.require('webcontainer');
    window.Bridge.require('sdp.webcontainer');
    window.Bridge.require('sys');
    window.Bridge.require('sdp.sys');
});
