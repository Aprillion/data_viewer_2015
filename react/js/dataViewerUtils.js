(function() {
  function map_obj_to_kv (obj, excluded) {
    if (typeof obj !== "object" || obj === null) {
      return obj
    } else {
      keys = Object.keys(obj)
      if (excluded) {
        keys = keys.filter(function (k) {
          return !excluded[k]
        })
      }
      keys = keys.map(function (k) {
        var kv = {
          k: k,
          v: map_obj_to_kv(obj[k]),
          show: false,
          is_array: false,
          //get: function(prop) {return this[prop]} // polyfil for Object to be like Map
        }
        if (obj instanceof Array) {
          kv.show = true
        }
        if (kv.v instanceof Immutable.List) {
          kv.is_array = true
        }
        return Immutable.Map(kv)
      })
      return Immutable.List(keys)
    }
  }
  var original_window_set = Object.keys(window).reduce(function(obj, item) {
      obj[item] = true
      return obj
    }, {})
  window.dataViewerUtils = {
    original_window_set: original_window_set,
    map_obj_to_kv: map_obj_to_kv,
  }
}())
