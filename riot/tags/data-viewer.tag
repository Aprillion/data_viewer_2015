<data-viewer>
  <h2>List of global variables, excluding defaults:</h2>

  <data-table items={globals}></data-table>

  <script>
    this.globals = dataViewerUtils.map_obj_to_kv(window, dataViewerUtils.original_window_set)
  </script>
</data-viewer>
