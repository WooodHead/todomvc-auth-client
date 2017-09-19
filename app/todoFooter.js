// Based on: https://github.com/tastejs/todomvc/blob/gh-pages/examples/react/js/footer.jsx

import React, { Component } from 'react';
import classNames from 'classnames';

import  { ToggleButton } from '@appbaseio/reactivesearch';
import Utils from './utils';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

class TodoFooter extends Component {
  render () {
    let activeTodoWord = Utils.pluralize(this.props.count, 'item');
    let clearButton = null;

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}>
          Clear completed
        </button>
      )
    }

    let nowShowing = this.props.nowShowing;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          <ToggleButton
            componentId="Filters"
            dataField="title"
            defaultSelected={["All"]}
            multiSelect={false}
            customQuery={
              function(data) {
                let val;
                if (Array.isArray(data)) {
                  val = data[0].value;
                }
                const completed = (val === 'completed') ? 'true' : (val === 'active') ? 'false' : 'all';
                console.log(`val: ${val}  completed: ${completed}`);

                if (completed === 'all') {
                  return {
              			query: {
              				match_all: {}
              			}
              		}
                }

                return {
                  query: {
                    bool: {
                      must: [
                        {
                          match: {
                            completed: completed
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
            data={
              [
                {"label": "All",        "value": "all"},
                {"label": "Active",     "value": "active"},
                {"label": "Completed",  "value": "completed"}
              ]
            }
          />
        </ul>
        {clearButton}
      </footer>
    )
  }
}

export default TodoFooter;
