var Abbro = (function(a){

    var mod = {}, 
        testParams = {},
        controlVariationVars = {},
        otherVariationVars = {};

    function clone(obj) { 
        if (window.jQuery)  {
            return window.jQuery.extend({}, obj);
        }

        var o = {};
        for (var p in obj) { 
            if (obj.hasOwnProperty(p)) {
                o[p] = obj[p]; 
            }
        }
        return o;
    }

    function extend(f, q)  {

        if (window.jQuery) { 
            return window.jQuery.extend(f, q);
        }

        for (var prop in q)  {
            if (q.hasOwnProperty(prop)) { 
                f[prop] = q[prop];
            }
        }
        return f;
    }

    function numVariations() { 
        var k = 0;
        if (!controlVariationVars.hasOwnProperty('name')) {
            throw {
                message: 'No control variation'
            };
        } else {
            k = 1;
        }
        for (var p in otherVariationVars) { 
            if (otherVariationVars.hasOwnProperty(p)) { 
                k++;
            }
        }
        return k;
    }

    mod.test = function(testName) { 
        testParams['Test Name'] = testName;
        return mod;
    };

    mod.control = function(variationName, setupFunc) { 
        controlVariationVars['name'] = variationName;
        controlVariationVars['setupFunc'] = setupFunc;
        return mod;
    };

    mod.variation = function(variationName, setupFunc) {
        var v = otherVariationVars[variationName] = {};
        v['name'] = variationName;
        v['setupFunc'] = setupFunc;
        return mod;
    };

    mod.track = function(eventName, parameters) { 
        //clone parameters
        var mainParams = clone(testParams);
        mainParams = extend(mainParams, parameters); 
        a.track(eventName, mainParams);
        return mod;
    };

    mod.start = function() { 
        // decide the variation to run and load the params
        var num = numVariations(), 
            selectedTestIdx = Math.floor(Math.random()*num);

        if (selectedTestIdx === 0) { 

            testParams = extend(testParams, {
                'Variation': controlVariationVars['name']
            });

            if (typeof controlVariationVars.setupFunc === 'function') { 
                controlVariationVars.setupFunc();        
            }

        } else { 
            // zero-index is the control
            var destiny;
            for (var p in otherVariationVars) { 
                if (selectedTestIdx && otherVariationVars.hasOwnProperty(p)) { 
                    destiny = otherVariationVars[p];
                    selectedTestIdx--;
                } else if (!selectedTestIdx) { 
                    break;
                }
            }

            if (destiny) { 
                testParams = extend(testParams, {
                    'Variation': destiny['name']
                });
                if (typeof destiny.setupFunc === 'function') { 
                    destiny.setupFunc();
                }
            }
        }
    };

    mod.stop = function() { 
        testParams = {};
    };

    return mod;
})(analytics||{});
