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
      return keys.map(function (k) {
        var kv = {
          k: k,
          v: map_obj_to_kv(obj[k]),
          show: [],
          is_array: false,
        }
        if (obj instanceof Array) {
          kv.show = kv.v
        }
        if (kv.v instanceof Array) {
          kv.is_array = true
        }
        return kv
      })
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
