<data-table>
  <table>
    <tr each={opts.items}>
      <td onclick={toggle} style="cursor: {is_array ? 'pointer' : 'default'}"}>
        {k}
      </td>
      <td if={is_array}>
        <data-table items={show}></data-table>
      </td>
      <td if={!is_array}>
        {v ? v : JSON.stringify(v)}
      </td>
    </tr>
  </table>

  <style scoped>
    table {
      border-collapse: collapse;
    }
    td {
      background: rgba(200, 200, 100, .1);
      border-bottom: 1px solid #ccb;
    }
  </style>

  <script>
    toggle(e) {
      if (e.item.is_array) {
        if (!e.item.show.length) {
          e.item.show = e.item.v
        } else {
          e.item.show = []
        }
        $('html,body').css({cursor: "wait !important"})
        this.update()
      }
    }
  </script>
</data-table>
