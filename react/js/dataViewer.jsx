var DataViewer = React.createClass({
  render: function() {
    return (
      <div>
        <h2>List of global variables, excluding defaults:</h2>
        <DataTable items={this.props.items} />
      </div>
    )
  },
})

var DataTable = React.createClass({
  render: function() {
    return (
      <table style={{borderCollapse: "collapse"}}>
        {this.props.items.map(function(item) {
          return (<DataRow key={item.get('k')} item={item} />)
        })}
      </table>
    )
  },
})

var DataRow = React.createClass({
  getInitialState: function() {
    return {
      item: this.props.item,
    }
  },
  tdStyle: {
    borderBottom: "1px solid #ccb",
    background: "rgba(200, 200, 100, .1)",
  },
  toggle: function() {
    this.setState({item: this.state.item.set("show", !this.state.item.get("show"))})
    console.log(this.state.item.toObject())
  },
  render: function() {
    var k = this.state.item.get("k"),
        v = this.state.item.get("v"),
        show = this.state.item.get("show"),
        is_array = this.state.item.get("is_array")
    return (
      <tr style={{cursor: (is_array ? "pointer" : "default")}}>
        <td style={this.tdStyle}  onClick={this.toggle}>
          {k}
        </td>
        <td style={this.tdStyle}>
          {is_array ?
            (show ? <DataTable items={v} /> : <div onClick={this.toggle}>...</div>) :
            (v ? v.toString() : JSON.stringify(v))
          }
        </td>
      </tr>
    )
  }
})

// init
React.render(
  <DataViewer items={
    dataViewerUtils.map_obj_to_kv(
      window,
      dataViewerUtils.original_window_set)} />,
  document.getElementById("dataViewer")
)
