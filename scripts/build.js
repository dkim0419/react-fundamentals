const fs = require('fs')
const path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

function createMarkup(mainBundle) {
  return ReactDOMServer.renderToStaticMarkup(
    React.DOM.html({},
      React.DOM.head({},
        React.DOM.link({ rel: 'stylesheet', href: '/shared.css' })
      ),
      React.DOM.body({},
        React.DOM.div({ id: 'app' }),
        React.DOM.script({ src: '/__build__/shared.js' }),
        React.DOM.script({ src: '/__build__/' + mainBundle + '.js' })
      )
    )
  )
}

const RootDir = path.resolve(__dirname, '..')
const SubjectsDir = path.join(RootDir, 'subjects')

const Subjects = {
  '01-WhyReact': 'Why React?',
  '02-Rendering': 'Rendering',
  '03-Components': 'Components',
  '04-PropsVsState': 'Props vs. State',
  // Forms: 'Forms',
  // CompoundComponents: 'Compound Components',
  // HigherOrderComponents: 'Higher Order Components',
  '05-ImperativeToDeclarative': 'Imperative to Declarative',
  '06-Flux': 'Flux',
  '07-Redux': 'Redux',
  '08-Routing': 'Routing',
  '09-ChatApp': 'Chat App',
  // ServerRendering: 'Server Rendering',
}

const excludeExcercises = [
  '01-WhyReact',
  '05-ImperativeToDeclarative',
  '06-Flux',
]

const SubjectDirNames = Object.keys(Subjects)

const markup = ReactDOMServer.renderToStaticMarkup(
  React.DOM.html({},
    React.DOM.head({},
      React.DOM.link({ rel: 'stylesheet', href: '/shared.css' })
    ),
    React.DOM.body({ id: 'index' },
      React.DOM.table({ cellSpacing: 0, cellPadding: 0 },
        React.DOM.tbody({},
          SubjectDirNames.map(function (dir, index) {
            return React.DOM.tr({ key: dir, className: (index % 2) ? 'odd' : 'even' },
              React.DOM.td({ className: 'lecture-link' },
                React.DOM.a({ href: '/' + dir + '/lecture.html' }, Subjects[dir])
              ),
              React.DOM.td({ className: 'exercise-link' },
                !excludeExcercises.includes(dir)
                  ? React.DOM.a({ href: '/' + dir + '/exercise.html' }, 'exercise')
                  : null
              ),
              React.DOM.td({ className: 'solution-link' },
              !excludeExcercises.includes(dir)
                ? React.DOM.a({ href: '/' + dir + '/solution.html' }, 'solution')
                : null
              )
              // React.DOM.td({ className: 'notes-link' },
              //   React.DOM.a({ href: '/' + dir + '/notes.html' }, 'notes')
              // )
            )
          })
        )
      )
    )
  )
)

fs.writeFileSync(path.join(SubjectsDir, 'index.html'), markup)

SubjectDirNames.forEach(function (dir) {
  fs.writeFileSync(path.join(SubjectsDir, dir, 'lecture.html'), createMarkup(dir + '-lecture'))
  fs.writeFileSync(path.join(SubjectsDir, dir, 'exercise.html'), createMarkup(dir + '-exercise'))
  fs.writeFileSync(path.join(SubjectsDir, dir, 'solution.html'), createMarkup(dir + '-solution'))
})
