////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Modify the Tabs component to do the following:
// - Render a tab for each country with its name in the tab
// - Make it so that you can click on a tab and it will appear active
//   while the others appear inactive
// - Make it so the panel renders the correct content for the selected tab
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'

const styles = {}

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
}

styles.panel = {
  padding: 10
}

class Tabs extends React.Component {
  state = {
    activeTabIndex: 1
  }

  selectTabIndex(activeTabIndex) {
    this.setState({ activeTabIndex })
  }

  render() {
    const { activeTabIndex } = this.state
    const items = this.props.data
      .map(((item, index) => {
        if (item.id === activeTabIndex) {
          return (
            <div className="Tab" style={styles.activeTab}>
              {item.name}
            <p>
              {item.description}
            </p>
            </div>
          )
        } else {
          return (
            <div className="Tab" style={styles.tab} onClick={() => this.selectTabIndex(index + 1)}>
              {item.name}
            </div>
            )
          }
      }))

    return (
      <div className="Tabs">
        {items}
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries}/>
      </div>
    )
  }
}

const DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' }
]

ReactDOM.render(<App countries={DATA}/>, document.getElementById('app'), function () {
  require('./tests').run(this)
})
