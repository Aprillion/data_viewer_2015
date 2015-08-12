riot.tag('data-table', '<table> <tr each="{opts.items}"> <td onclick="{toggle}" riot-style="cursor: {is_array ? \'pointer\' : \'default\'}"}> {k} </td> <td if="{is_array}"> <data-table items="{show}"></data-table> </td> <td if="{!is_array}"> {v ? v : JSON.stringify(v)} </td> </tr> </table>', 'data-table table, [riot-tag="data-table"] table{ border-collapse: collapse; } data-table td, [riot-tag="data-table"] td{ background: rgba(200, 200, 100, .1); border-bottom: 1px solid #ccb; }', function(opts) {
    this.toggle = function(e) {
      if (e.item.is_array) {
        if (!e.item.show.length) {
          e.item.show = e.item.v
        } else {
          e.item.show = []
        }
        $('html,body').css({cursor: "wait !important"})
        this.update()
      }
    }.bind(this);
  
});

riot.tag('data-viewer', '<h2>List of global variables, excluding defaults:</h2> <data-table items="{globals}"></data-table>', function(opts) {
    this.globals = dataViewerUtils.map_obj_to_kv(window, dataViewerUtils.original_window_set)
  
});
